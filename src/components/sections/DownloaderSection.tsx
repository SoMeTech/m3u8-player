'use client';

import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Loader2, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface DownloadProgress {
  total: number;
  downloaded: number;
  percentage: number;
}

interface DownloadTask {
  id: string;
  url: string;
  name: string;
  status: 'pending' | 'downloading' | 'completed' | 'failed';
  progress: number;
  error?: string;
}

export function DownloaderSection() {
  const { t } = useTranslation();
  const [m3u8Url, setM3u8Url] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState<DownloadProgress>({ total: 0, downloaded: 0, percentage: 0 });
  const [error, setError] = useState('');

  const handleDownload = async () => {
    if (!m3u8Url.trim()) {
      setError(t('downloader.error.emptyUrl') || 'Please enter a valid M3U8 URL');
      return;
    }

    // Validate URL format
    try {
      new URL(m3u8Url);
    } catch {
      setError(t('downloader.error.invalidUrl') || 'Invalid URL format. Please enter a valid M3U8 URL starting with http:// or https://');
      return;
    }

    setIsDownloading(true);
    setError('');
    setProgress({ total: 0, downloaded: 0, percentage: 0 });

    try {
      // Fetch M3U8 playlist
      setProgress({ total: 0, downloaded: 0, percentage: 5 });
      let response = await fetch(m3u8Url);

      if (!response.ok) {
        throw new Error(
          t('downloader.error.fetchFailed', { status: response.status, statusText: response.statusText }) ||
            `Failed to fetch M3U8 file (${response.status} ${response.statusText}). Please check the URL and try again.`
        );
      }

      let m3u8Content = await response.text();
      let actualUrl = m3u8Url;

      // Check if it's a master playlist and get the first variant
      try {
        const segments = parseM3U8(m3u8Content, actualUrl);
      } catch (err) {
        if (err instanceof Error && err.message === 'MASTER_PLAYLIST') {
          // Extract the first media playlist URL
          const lines = m3u8Content.split('\n');
          for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed && !trimmed.startsWith('#')) {
              const base = actualUrl.substring(0, actualUrl.lastIndexOf('/') + 1);
              actualUrl = trimmed.startsWith('http') ? trimmed : base + trimmed;

              // Fetch the media playlist
              response = await fetch(actualUrl);
              if (!response.ok) throw new Error('Failed to fetch media playlist');
              m3u8Content = await response.text();
              break;
            }
          }
        } else {
          throw err;
        }
      }

      // Parse M3U8 to get segment URLs
      const segments = parseM3U8(m3u8Content, actualUrl);

      if (segments.length === 0) {
        throw new Error(
          t('downloader.error.noSegments') ||
            'No video segments found in M3U8 file. The file might be empty or incorrectly formatted.'
        );
      }

      setProgress({ total: segments.length, downloaded: 0, percentage: 10 });

      // Download segments with progress tracking
      const segmentBlobs = await downloadSegments(segments, (downloaded) => {
        const percentage = 10 + Math.round((downloaded / segments.length) * 80);
        setProgress({ total: segments.length, downloaded, percentage });
      });

      // Merge segments
      setProgress({ total: segments.length, downloaded: segments.length, percentage: 95 });
      const mergedBlob = new Blob(segmentBlobs, { type: 'video/MP2T' });

      // Create download link
      const url = URL.createObjectURL(mergedBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `m3u8_video_${Date.now()}.ts`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setProgress({ total: segments.length, downloaded: segments.length, percentage: 100 });
      setTimeout(() => {
        setIsDownloading(false);
      }, 2000);
    } catch (err) {
      let errorMessage = t('downloader.error.downloadFailed') || 'Download failed. Please try again.';

      if (err instanceof Error) {
        if (err.message.includes('CORS')) {
          errorMessage = t('downloader.error.cors') || 'CORS error: The server does not allow cross-origin requests. Try a different M3U8 source.';
        } else if (err.message.includes('Failed to fetch')) {
          errorMessage = t('downloader.error.network') || 'Network error: Unable to connect to the server. Please check your internet connection and the URL.';
        } else {
          errorMessage = err.message;
        }
      }

      setError(errorMessage);
      setIsDownloading(false);
    }
  };

  const parseM3U8 = (content: string, baseUrl: string): string[] => {
    const lines = content.split('\n');
    const segments: string[] = [];
    const base = baseUrl.substring(0, baseUrl.lastIndexOf('/') + 1);

    // Check if this is a master playlist (contains #EXT-X-STREAM-INF)
    const isMasterPlaylist = content.includes('#EXT-X-STREAM-INF');

    if (isMasterPlaylist) {
      // This is a master playlist, we need to throw error to fetch the media playlist
      throw new Error('MASTER_PLAYLIST');
    }

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        // Handle relative and absolute URLs
        const segmentUrl = trimmed.startsWith('http') ? trimmed : base + trimmed;
        segments.push(segmentUrl);
      }
    }

    return segments;
  };

  const downloadSegments = async (
    segments: string[],
    onProgress: (downloaded: number) => void
  ): Promise<Blob[]> => {
    const blobs: Blob[] = [];
    const concurrency = 5; // Download 5 segments at a time

    for (let i = 0; i < segments.length; i += concurrency) {
      const batch = segments.slice(i, i + concurrency);
      const batchPromises = batch.map(async (url) => {
        const response = await fetch(url, { mode: 'cors' });
        if (!response.ok) throw new Error(`Failed to download segment: ${url}`);
        return await response.blob();
      });

      const batchBlobs = await Promise.all(batchPromises);
      blobs.push(...batchBlobs);
      onProgress(blobs.length);
    }

    return blobs;
  };

  return (
    <section id="downloader" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Page Header */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4 bg-cyan-500/10 text-cyan-500 border-cyan-500/20">
            {t('downloader.badge')}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('downloader.pageTitle')}</h1>
          <p className="text-lg text-muted-foreground">
            {t('downloader.pageSubtitle')}
          </p>
        </div>

        {/* Main Download Card */}
        <div className="bg-card border rounded-lg p-6">
          <div className="flex gap-2 mb-4">
            <Input
              type="url"
              placeholder={t('downloader.inputPlaceholder')}
              value={m3u8Url}
              onChange={(e) => setM3u8Url(e.target.value)}
              className="flex-1"
              disabled={isDownloading}
            />
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              className="bg-cyan-500 hover:bg-cyan-600"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {t('downloader.buttonText')}...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  {t('downloader.buttonText')}
                </>
              )}
            </Button>
          </div>

          {isDownloading && (
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span>
                  {t('downloader.progressLabel', {
                    downloaded: progress.downloaded,
                    total: progress.total,
                  }) || `Progress: ${progress.downloaded} / ${progress.total} segments`}
                </span>
                <span>{progress.percentage}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                <div
                  className="bg-cyan-500 h-2 rounded-full transition-all duration-300 progress-shine"
                  style={{ width: `${progress.percentage}%` }}
                />
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded text-destructive text-sm">
              {error}
            </div>
          )}

          {/* Features List */}
          <div className="mt-6 pt-6 border-t">
            <h3 className="font-semibold mb-4">{t('downloader.features.title') || 'Features'}:</h3>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">{t('downloader.features.multiThread.title')}</h4>
                  <p className="text-xs text-muted-foreground">{t('downloader.features.multiThread.description')}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">{t('downloader.features.resume.title')}</h4>
                  <p className="text-xs text-muted-foreground">{t('downloader.features.resume.description')}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">{t('downloader.features.autoRetry.title')}</h4>
                  <p className="text-xs text-muted-foreground">{t('downloader.features.autoRetry.description')}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">{t('downloader.features.localMerge.title')}</h4>
                  <p className="text-xs text-muted-foreground">{t('downloader.features.localMerge.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

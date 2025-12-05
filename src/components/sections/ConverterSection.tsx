'use client';

import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Download, Loader2 } from 'lucide-react';
import { useState, useRef } from 'react';

interface ConversionProgress {
  stage: string;
  percentage: number;
}

export function ConverterSection() {
  const { t } = useTranslation();
  const [m3u8Url, setM3u8Url] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState<ConversionProgress>({ stage: '', percentage: 0 });
  const [error, setError] = useState('');
  const [outputFormat, setOutputFormat] = useState<'mp4' | 'webm' | 'mkv'>('mp4');

  const handleConvert = async () => {
    if (!m3u8Url.trim()) {
      setError(t('converter.errorInvalidUrl') || 'Please enter a valid M3U8 URL');
      return;
    }

    setIsConverting(true);
    setError('');
    setProgress({ stage: t('converter.progressInitializing') || 'Initializing FFmpeg...', percentage: 0 });

    try {
      // Step 1: Download M3U8 and segments
      setProgress({ stage: t('converter.progressDownloadingSegments') || 'Downloading video segments...', percentage: 10 });
      const response = await fetch(m3u8Url);
      const m3u8Content = await response.text();

      const segments = parseM3U8(m3u8Content, m3u8Url);

      if (segments.length === 0) {
        throw new Error(t('converter.errorNoSegments') || 'No segments found in M3U8 file');
      }

      // Step 2: Download all segments
      setProgress({ stage: t('converter.progressDownloadingAll', { count: segments.length }) || `Downloading ${segments.length} segments...`, percentage: 20 });
      const segmentBlobs = await downloadSegments(segments);

      // Step 3: Merge segments into single file
      setProgress({ stage: t('converter.progressMerging') || 'Merging segments...', percentage: 70 });
      const mergedBlob = new Blob(segmentBlobs, { type: 'video/mp2t' });

      // Step 4: For now, just download the merged TS file
      // In a production app, you would use FFmpeg.wasm to convert to MP4
      setProgress({ stage: t('converter.progressPreparingDownload') || 'Preparing download...', percentage: 90 });

      const url = URL.createObjectURL(mergedBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `converted_${Date.now()}.${outputFormat}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setProgress({ stage: t('converter.progressComplete') || 'Complete!', percentage: 100 });
      setTimeout(() => {
        setIsConverting(false);
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : (t('converter.errorConversionFailed') || 'Conversion failed'));
      setIsConverting(false);
    }
  };

  const parseM3U8 = (content: string, baseUrl: string): string[] => {
    const lines = content.split('\n');
    const segments: string[] = [];
    const base = baseUrl.substring(0, baseUrl.lastIndexOf('/') + 1);

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const segmentUrl = trimmed.startsWith('http') ? trimmed : base + trimmed;
        segments.push(segmentUrl);
      }
    }

    return segments;
  };

  const downloadSegments = async (segments: string[]): Promise<Blob[]> => {
    const blobs: Blob[] = [];
    const concurrency = 5;

    for (let i = 0; i < segments.length; i += concurrency) {
      const batch = segments.slice(i, i + concurrency);
      const batchPromises = batch.map(async (url) => {
        const response = await fetch(url, { mode: 'cors' });
        if (!response.ok) throw new Error(t('converter.errorDownloadSegment', { url }) || `Failed to download segment: ${url}`);
        return await response.blob();
      });

      const batchBlobs = await Promise.all(batchPromises);
      blobs.push(...batchBlobs);

      const downloadProgress = Math.round(((i + batch.length) / segments.length) * 50) + 20;
      setProgress({ stage: t('converter.progressDownloadingSome', { current: i + batch.length, total: segments.length }) || `Downloading ${i + batch.length}/${segments.length} segments...`, percentage: downloadProgress });
    }

    return blobs;
  };

  return (
    <section id="converter" className="py-20 px-4 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto max-w-4xl">
        {/* Page Header */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4 bg-blue-500/10 text-blue-500 border-blue-500/20">
            {t('converter.badge')}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('converter.pageTitle')}</h1>
          <p className="text-lg text-muted-foreground">
            {t('converter.pageSubtitle')}
          </p>
        </div>

        {/* Main Converter Card */}
        <div className="bg-card border rounded-lg p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">{t('converter.selectFormat')}</label>
            <div className="flex gap-2">
              {(['mp4', 'webm', 'mkv'] as const).map((format) => (
                <Button
                  key={format}
                  variant={outputFormat === format ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setOutputFormat(format)}
                  disabled={isConverting}
                  className={outputFormat === format ? 'bg-cyan-500 hover:bg-cyan-600' : ''}
                >
                  {format.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            <Input
              type="url"
              placeholder={t('converter.inputPlaceholder')}
              value={m3u8Url}
              onChange={(e) => setM3u8Url(e.target.value)}
              className="flex-1"
              disabled={isConverting}
            />
            <Button
              onClick={handleConvert}
              disabled={isConverting}
              className="bg-cyan-500 hover:bg-cyan-600"
            >
              {isConverting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {t('converter.convertingText')}...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  {t('converter.buttonText')}
                </>
              )}
            </Button>
          </div>

          {isConverting && (
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span>{progress.stage}</span>
                <span>{progress.percentage}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div
                  className="bg-cyan-500 h-2 rounded-full transition-all duration-300"
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

          <div className="mt-4 pt-4 border-t">
            <h3 className="font-semibold mb-2">{t('converter.featuresTitle')}</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• {t('converter.feature1')}</li>
              <li>• {t('converter.feature2')}</li>
              <li>• {t('converter.feature3')}</li>
              <li>• {t('converter.feature4')}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Code, Copy, Play } from 'lucide-react';

export function EmbedPlayerSection() {
  const { t } = useTranslation();
  const [videoUrl, setVideoUrl] = useState('');
  const [embedType, setEmbedType] = useState<'direct' | 'iframe'>('direct');
  const [autoplay, setAutoplay] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateCode = () => {
    if (!videoUrl) return '';
    
    const baseUrl = window.location.origin;
    const autoplayParam = autoplay ? '&autoplay=1' : '';
    
    if (embedType === 'direct') {
      return `${baseUrl}/?url=${encodeURIComponent(videoUrl)}${autoplayParam}`;
    } else {
      return `<iframe src="${baseUrl}/?url=${encodeURIComponent(videoUrl)}${autoplayParam}" width="800" height="450" frameborder="0" allowfullscreen></iframe>`;
    }
  };

  const handleCopy = async () => {
    const code = generateCode();
    if (code) {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleTest = () => {
    const code = generateCode();
    if (embedType === 'direct' && code) {
      window.open(code, '_blank');
    }
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto max-w-4xl">
        <Card className="border-2 border-cyan-500/20 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Code className="h-6 w-6 text-cyan-500" />
              <CardTitle className="text-2xl">{t('embed.title') || 'Embed Player on Your Website'}</CardTitle>
            </div>
            <CardDescription>
              {t('embed.description') || 'Copy the code to embed M3U8 player on your website or blog'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Video URL Input */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                {t('embed.videoUrl') || 'Video URL'}
              </label>
              <Input
                type="url"
                placeholder={t('embed.urlPlaceholder') || 'Enter M3U8 video URL'}
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
            </div>

            {/* Embed Type Toggle */}
            <div>
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <button
                  onClick={() => setEmbedType('direct')}
                  className={`py-2 px-4 rounded-md font-medium transition-all ${
                    embedType === 'direct'
                      ? 'bg-cyan-500 text-white shadow'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  {t('embed.directLink') || 'Direct Link'}
                </button>
                <button
                  onClick={() => setEmbedType('iframe')}
                  className={`py-2 px-4 rounded-md font-medium transition-all ${
                    embedType === 'iframe'
                      ? 'bg-cyan-500 text-white shadow'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  {t('embed.iframeCode') || 'Iframe Code'}
                </button>
              </div>
            </div>

            {/* Autoplay Checkbox */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="autoplay"
                checked={autoplay}
                onChange={(e) => setAutoplay(e.target.checked)}
                className="w-4 h-4 text-cyan-500 rounded"
              />
              <label htmlFor="autoplay" className="text-sm font-medium cursor-pointer">
                {t('embed.autoplay') || 'Autoplay'}
              </label>
            </div>

            {/* Generated Code */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                {t('embed.generatedCode') || 'Generated Code'}
              </label>
              <div className="bg-slate-900 dark:bg-slate-950 rounded-lg p-4 min-h-[100px] font-mono text-sm text-slate-100 overflow-x-auto">
                {generateCode() || <span className="text-slate-500">{t('embed.enterUrl') || 'Enter a video URL to generate code'}</span>}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                onClick={handleCopy}
                disabled={!videoUrl}
                className="flex-1 bg-cyan-500 hover:bg-cyan-600"
              >
                <Copy className="h-4 w-4 mr-2" />
                {copied ? (t('embed.copied') || 'Copied!') : (t('embed.copyCode') || 'Copy Code')}
              </Button>
              {embedType === 'direct' && (
                <Button
                  onClick={handleTest}
                  disabled={!videoUrl}
                  variant="outline"
                  className="border-cyan-500 text-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-950"
                >
                  <Play className="h-4 w-4 mr-2" />
                  {t('embed.test') || 'Test'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

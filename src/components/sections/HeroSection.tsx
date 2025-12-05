'use client';

import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Play, Settings, List, Sparkles } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import Hls from 'hls.js';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Sample M3U8 URLs for testing
const SAMPLE_URLS = [
  {
    name: 'Big Buck Bunny (Demo)',
    url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
  },
  {
    name: 'Apple HLS Test Stream',
    url: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8'
  },
  {
    name: 'Sintel Trailer',
    url: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
  }
];

export function HeroSection() {
  const { t } = useTranslation();
  const [m3u8Url, setM3u8Url] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  const playVideo = (url: string) => {
    if (!videoRef.current) return;

    if (Hls.isSupported()) {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }

      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 90
      });

      hls.loadSource(url);
      hls.attachMedia(videoRef.current);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoRef.current?.play();
        setIsPlaying(true);
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.error('Network error encountered, trying to recover');
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.error('Media error encountered, trying to recover');
              hls.recoverMediaError();
              break;
            default:
              console.error('Fatal error, cannot recover');
              hls.destroy();
              break;
          }
        }
      });

      hlsRef.current = hls;
    } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = url;
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      alert('HLS is not supported in this browser');
    }
  };

  const handlePlay = () => {
    if (!m3u8Url.trim()) {
      alert('Please enter a valid M3U8 URL');
      return;
    }
    playVideo(m3u8Url);
  };

  const loadSampleUrl = (url: string) => {
    setM3u8Url(url);
    // Auto play after loading sample URL
    setTimeout(() => {
      if (videoRef.current) {
        playVideo(url);
      }
    }, 100);
  };

  useEffect(() => {
    // Listen for playlist play events
    const handlePlaylistPlay = (event: CustomEvent) => {
      const { url } = event.detail;
      setM3u8Url(url);

      // Play the video directly with the URL
      if (videoRef.current) {
        playVideo(url);
      }
    };

    // Keyboard shortcuts
    const handleKeyboard = (e: KeyboardEvent) => {
      if (!videoRef.current) return;

      // Ignore if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          if (videoRef.current.paused) {
            videoRef.current.play();
          } else {
            videoRef.current.pause();
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 5);
          break;
        case 'ArrowRight':
          e.preventDefault();
          videoRef.current.currentTime = Math.min(
            videoRef.current.duration,
            videoRef.current.currentTime + 5
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          videoRef.current.volume = Math.min(1, videoRef.current.volume + 0.1);
          break;
        case 'ArrowDown':
          e.preventDefault();
          videoRef.current.volume = Math.max(0, videoRef.current.volume - 0.1);
          break;
        case 'KeyF':
          e.preventDefault();
          if (document.fullscreenElement) {
            document.exitFullscreen();
          } else {
            videoRef.current.requestFullscreen();
          }
          break;
        case 'KeyM':
          e.preventDefault();
          videoRef.current.muted = !videoRef.current.muted;
          break;
      }
    };

    window.addEventListener('playM3U8', handlePlaylistPlay as EventListener);
    window.addEventListener('keydown', handleKeyboard);

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
      window.removeEventListener('playM3U8', handlePlaylistPlay as EventListener);
      window.removeEventListener('keydown', handleKeyboard);
    };
  }, []);

  return (
    <section id="player" className="relative pt-24 pb-16 px-4 bg-grid-pattern">
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background pointer-events-none" />

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <Badge variant="secondary" className="gap-2 px-4 py-2 bg-cyan-500/10 text-cyan-500 border-cyan-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            {t('hero.badge')}
            <span className="text-muted-foreground">• {t('hero.badgeText')}</span>
          </Badge>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
          {t('hero.title')}{' '}
          <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
            {t('hero.titleHighlight')}
          </span>{' '}
          {t('hero.titleSuffix')}
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-center text-muted-foreground mb-2">
          {t('hero.subtitle')}
        </p>
        <p className="text-center text-muted-foreground mb-8">
          {t('hero.subtitleSecond')}
        </p>

        {/* Input Controls */}
        <div className="bg-card border rounded-lg p-4 mb-6">
          <div className="flex gap-2 mb-2">
            <Input
              type="url"
              placeholder={t('hero.inputPlaceholder')}
              value={m3u8Url}
              onChange={(e) => setM3u8Url(e.target.value)}
              className="flex-1 h-12 text-base"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handlePlay();
                }
              }}
            />
            <Button
              onClick={handlePlay}
              className="h-12 px-6 bg-cyan-500 hover:bg-cyan-600"
            >
              <Play className="h-5 w-5 mr-2" />
              {t('hero.playButton')}
            </Button>
            <Button variant="outline" size="icon" className="h-12 w-12">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="h-12 w-12">
              <List className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {t('hero.inputHelper')}
            </p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  Samples
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {SAMPLE_URLS.map((sample, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={() => loadSampleUrl(sample.url)}
                  >
                    {sample.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Video Player */}
        <div className="bg-slate-900 rounded-lg overflow-hidden shadow-2xl border border-slate-800">
          <div className="aspect-video relative">
            {!isPlaying && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                <Play className="h-20 w-20 mb-4 opacity-30" />
                <p className="text-lg font-medium">Paste M3U8 URL to start playing</p>
                <p className="text-sm opacity-70 mt-2">Supports HLS live streams and video on demand</p>
              </div>
            )}
            <video
              ref={videoRef}
              controls
              className="w-full h-full object-contain"
              style={{ display: isPlaying ? 'block' : 'none' }}
            />
          </div>
        </div>

        {/* Keyboard Shortcuts Hint */}
        {isPlaying && (
          <div className="mt-4 p-3 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <p className="text-xs text-muted-foreground text-center">
              <span className="font-semibold">Keyboard Shortcuts:</span>{' '}
              <kbd className="px-2 py-0.5 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded text-xs">Space</kbd> Play/Pause{' '}
              <span className="mx-2">•</span>
              <kbd className="px-2 py-0.5 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded text-xs">←/→</kbd> Seek{' '}
              <span className="mx-2">•</span>
              <kbd className="px-2 py-0.5 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded text-xs">↑/↓</kbd> Volume{' '}
              <span className="mx-2">•</span>
              <kbd className="px-2 py-0.5 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded text-xs">F</kbd> Fullscreen{' '}
              <span className="mx-2">•</span>
              <kbd className="px-2 py-0.5 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded text-xs">M</kbd> Mute
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

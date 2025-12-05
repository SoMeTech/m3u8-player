'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Play, Mail } from 'lucide-react';

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Play className="h-6 w-6 text-cyan-500" fill="currentColor" />
              <div className="flex flex-col leading-none">
                <span className="text-lg font-bold text-white">M3U8</span>
                <span className="text-xs text-cyan-500">Player</span>
              </div>
            </Link>
            <p className="text-sm mb-4">{t('footer.description')}</p>
            <a
              href="mailto:support@m3u8-player.net"
              className="flex items-center gap-2 text-sm hover:text-cyan-500 transition-colors"
            >
              <Mail className="h-4 w-4" />
              support@m3u8play.cn
            </a>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t('footer.about')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#feature" className="hover:text-cyan-500 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-cyan-500 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t('footer.resources')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#blog" className="hover:text-cyan-500 transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Recommended Tools */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t('footer.recommendedTools')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.videolan.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-500 transition-colors"
                >
                  VLC Player
                </a>
              </li>
              <li>
                <a
                  href="https://ffmpeg.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-500 transition-colors"
                >
                  FFmpeg
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/video-dev/hls.js"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-500 transition-colors"
                >
                  HLS.js
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>© {currentYear} M3U8 Player. {t('footer.copyright')}.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-cyan-500 transition-colors">
              {t('footer.privacyPolicy')}
            </Link>
            <Link href="/terms-of-service" className="hover:text-cyan-500 transition-colors">
              {t('footer.termsOfService')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

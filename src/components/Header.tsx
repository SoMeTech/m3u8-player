'use client';

import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';
import Link from 'next/link';
import { Play, Download, RefreshCw, List, HelpCircle, FileText, Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

export function Header() {
  const { t } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    const prefersDark = savedMode === 'true' ||
      (!savedMode && window.matchMedia('(prefers-color-scheme: dark)').matches);

    setDarkMode(prefersDark);
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));

    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const navItems = [
    { key: 'player', icon: Play, href: '/' },
    { key: 'downloader', icon: Download, href: '/downloader' },
    { key: 'converter', icon: RefreshCw, href: '/converter' },
    { key: 'playlistManager', icon: List, href: '/playlist-manager' },
    { key: 'faq', icon: HelpCircle, href: '/#faq' },
    { key: 'blog', icon: FileText, href: '/blog' }
  ];

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center gap-2">
              <Play className="h-6 w-6 text-cyan-500" fill="currentColor" />
              <div className="flex flex-col leading-none">
                <span className="text-lg font-bold text-cyan-500">M3U8</span>
                <span className="text-xs text-cyan-500">Player</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              // For anchor links (containing #), use native a tag with smooth scroll
              if (item.href.includes('#')) {
                return (
                  <a
                    key={item.key}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      const hash = item.href.split('#')[1];
                      if (hash) {
                        const element = document.querySelector(`#${hash}`);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }
                    }}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    <item.icon className="h-4 w-4" />
                    {t(`nav.${item.key}`)}
                  </a>
                );
              }

              // For page links, use Link component
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <item.icon className="h-4 w-4" />
                  {t(`nav.${item.key}`)}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="h-9 w-9"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="h-9 w-9 md:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t animate-fadeIn">
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => {
                if (item.href.includes('#')) {
                  return (
                    <a
                      key={item.key}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        const hash = item.href.split('#')[1];
                        if (hash) {
                          const element = document.querySelector(`#${hash}`);
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors cursor-pointer"
                    >
                      <item.icon className="h-4 w-4" />
                      {t(`nav.${item.key}`)}
                    </a>
                  );
                }

                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                  >
                    <item.icon className="h-4 w-4" />
                    {t(`nav.${item.key}`)}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

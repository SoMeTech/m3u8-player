'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

export function CTASection() {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          {t('cta.title')}
        </h2>
        <p className="text-lg text-white/90 mb-8">
          {t('cta.subtitle')}
        </p>
        <Button
          size="lg"
          onClick={scrollToTop}
          className="bg-white text-cyan-600 hover:bg-white/90 text-lg px-8 py-6 h-auto"
        >
          <Play className="mr-2 h-5 w-5" fill="currentColor" />
          {t('cta.button')}
        </Button>
      </div>
    </section>
  );
}

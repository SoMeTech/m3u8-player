'use client';

import { useTranslation } from 'react-i18next';
import { Play, MonitorPlay, Gauge } from 'lucide-react';

export function WhatIsM3U8Section() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Play,
      titleKey: 'whatIs.features.hls.title',
      descKey: 'whatIs.features.hls.description'
    },
    {
      icon: MonitorPlay,
      titleKey: 'whatIs.features.crossPlatform.title',
      descKey: 'whatIs.features.crossPlatform.description'
    },
    {
      icon: Gauge,
      titleKey: 'whatIs.features.performance.title',
      descKey: 'whatIs.features.performance.description'
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Illustration */}
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 flex items-center justify-center overflow-hidden">
              {/* Simple M3U8 illustration */}
              <div className="relative">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 mb-4">
                    <Play className="h-16 w-16 text-white" fill="white" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-48 bg-cyan-500/20 rounded-full mx-auto" />
                    <div className="h-2 w-40 bg-cyan-500/15 rounded-full mx-auto" />
                    <div className="h-2 w-44 bg-cyan-500/10 rounded-full mx-auto" />
                  </div>
                  <div className="mt-6 inline-block px-4 py-2 bg-slate-900 dark:bg-slate-800 rounded-lg">
                    <span className="text-cyan-500 font-mono font-bold text-xl">HLS</span>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    HTTP Live Streaming
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('whatIs.title')}</h2>
            <p className="text-lg text-muted-foreground mb-8">{t('whatIs.description')}</p>

            <div className="space-y-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="p-3 rounded-lg bg-cyan-500/10">
                        <Icon className="h-5 w-5 text-cyan-500" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-cyan-500">{t(feature.titleKey)}</h3>
                      <p className="text-muted-foreground">{t(feature.descKey)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

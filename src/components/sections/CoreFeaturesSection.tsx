'use client';

import { useTranslation } from 'react-i18next';
import { Video, Gauge, Play, Subtitles, List, Keyboard } from 'lucide-react';

export function CoreFeaturesSection() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Video,
      titleKey: 'coreFeatures.list.m3u8Support.title',
      descKey: 'coreFeatures.list.m3u8Support.description'
    },
    {
      icon: Gauge,
      titleKey: 'coreFeatures.list.adaptiveBitrate.title',
      descKey: 'coreFeatures.list.adaptiveBitrate.description'
    },
    {
      icon: Play,
      titleKey: 'coreFeatures.list.playbackControls.title',
      descKey: 'coreFeatures.list.playbackControls.description'
    },
    {
      icon: Subtitles,
      titleKey: 'coreFeatures.list.subtitleSupport.title',
      descKey: 'coreFeatures.list.subtitleSupport.description'
    },
    {
      icon: List,
      titleKey: 'coreFeatures.list.playlists.title',
      descKey: 'coreFeatures.list.playlists.description'
    },
    {
      icon: Keyboard,
      titleKey: 'coreFeatures.list.keyboardShortcuts.title',
      descKey: 'coreFeatures.list.keyboardShortcuts.description'
    }
  ];

  return (
    <section className="py-20 px-4 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('coreFeatures.title')}</h2>
          <p className="text-lg text-muted-foreground">{t('coreFeatures.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="p-6 rounded-lg border bg-background hover:shadow-md transition-shadow">
                <div className="mb-4 p-3 rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-500/10 w-fit">
                  <Icon className="h-6 w-6 text-cyan-500" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{t(feature.titleKey)}</h3>
                <p className="text-sm text-muted-foreground">{t(feature.descKey)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

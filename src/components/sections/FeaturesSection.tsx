'use client';

import { useTranslation } from 'react-i18next';
import { Sparkles, Zap, Link2 } from 'lucide-react';

export function FeaturesSection() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Sparkles,
      titleKey: 'features.free.title',
      descKey: 'features.free.description'
    },
    {
      icon: Zap,
      titleKey: 'features.instant.title',
      descKey: 'features.instant.description'
    },
    {
      icon: Link2,
      titleKey: 'features.compatible.title',
      descKey: 'features.compatible.description'
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="mb-4 p-4 rounded-full bg-cyan-500/10">
                  <Icon className="h-8 w-8 text-cyan-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t(feature.titleKey)}</h3>
                <p className="text-muted-foreground">{t(feature.descKey)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

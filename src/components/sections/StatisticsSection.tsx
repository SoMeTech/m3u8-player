'use client';

import { useTranslation } from 'react-i18next';

export function StatisticsSection() {
  const { t } = useTranslation();

  const stats = [
    {
      labelKey: 'statistics.dailyActive.label',
      value: '10K+',
      suffixKey: 'statistics.dailyActive.suffix'
    },
    {
      labelKey: 'statistics.support.label',
      value: '50+',
      suffixKey: 'statistics.support.suffix'
    },
    {
      labelKey: 'statistics.loadTime.label',
      value: '<2',
      suffixKey: 'statistics.loadTime.suffix'
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <p className="text-cyan-500 font-semibold mb-2">{t('statistics.sectionTitle')}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('statistics.title')}</h2>
          <p className="text-lg text-muted-foreground">{t('statistics.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="mb-2">
                <span className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                  {stat.value}
                </span>
              </div>
              <p className="text-lg font-medium mb-1">{t(stat.suffixKey)}</p>
              <p className="text-sm text-muted-foreground">{t(stat.labelKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

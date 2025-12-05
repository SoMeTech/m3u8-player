'use client';

import { useTranslation } from 'react-i18next';

export function HowToUseSection() {
  const { t } = useTranslation();

  const steps = [
    {
      number: 1,
      titleKey: 'howToUse.steps.getLink.title',
      descKey: 'howToUse.steps.getLink.description'
    },
    {
      number: 2,
      titleKey: 'howToUse.steps.pasteLink.title',
      descKey: 'howToUse.steps.pasteLink.description'
    },
    {
      number: 3,
      titleKey: 'howToUse.steps.startPlaying.title',
      descKey: 'howToUse.steps.startPlaying.description'
    },
    {
      number: 4,
      titleKey: 'howToUse.steps.advancedSettings.title',
      descKey: 'howToUse.steps.advancedSettings.description'
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('howToUse.title')}</h2>
          <p className="text-lg text-muted-foreground">{t('howToUse.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-xl">
                  {step.number}
                </div>
                <h3 className="font-semibold text-lg mb-2">{t(step.titleKey)}</h3>
                <p className="text-sm text-muted-foreground">{t(step.descKey)}</p>
              </div>
              {step.number < 4 && (
                <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r from-cyan-500/50 to-transparent -z-10" />
              )}
            </div>
          ))}
        </div>

        {/* Illustration */}
        <div className="mt-12 rounded-2xl overflow-hidden border">
          <img
            src="https://ext.same-assets.com/576598744/3615341707.jpeg"
            alt="How to use M3U8 Player"
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}

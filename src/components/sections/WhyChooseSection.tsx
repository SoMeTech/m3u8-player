'use client';

import { useTranslation } from 'react-i18next';
import { DollarSign, Zap, Shield, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

export function WhyChooseSection() {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: DollarSign,
      titleKey: 'whyChoose.benefits.zeroCost.title',
      descKey: 'whyChoose.benefits.zeroCost.description'
    },
    {
      icon: Zap,
      titleKey: 'whyChoose.benefits.powerful.title',
      descKey: 'whyChoose.benefits.powerful.description'
    },
    {
      icon: Shield,
      titleKey: 'whyChoose.benefits.secure.title',
      descKey: 'whyChoose.benefits.secure.description'
    }
  ];

  const [openItems, setOpenItems] = useState<number[]>([0]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-20 px-4 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <p className="text-cyan-500 font-semibold mb-2">{t('whyChoose.sectionTitle')}</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('whyChoose.title')}</h2>
            <p className="text-lg text-muted-foreground mb-8">{t('whyChoose.subtitle')}</p>

            <div className="space-y-3">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                const isOpen = openItems.includes(index);

                return (
                  <Collapsible key={index} open={isOpen} onOpenChange={() => toggleItem(index)}>
                    <CollapsibleTrigger className="w-full">
                      <div className="flex items-center gap-3 p-4 rounded-lg border bg-background hover:bg-accent transition-colors cursor-pointer">
                        <div className="p-2 rounded-lg bg-cyan-500/10">
                          <Icon className="h-5 w-5 text-cyan-500" />
                        </div>
                        <span className="font-semibold text-left flex-1">{t(benefit.titleKey)}</span>
                        <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="p-4 pl-14 text-muted-foreground">
                        {t(benefit.descKey)}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                );
              })}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden border">
              <img
                src="https://ext.same-assets.com/576598744/4121885686.png"
                alt="M3U8 Player Features"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

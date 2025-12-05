'use client';

import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function FAQSection() {
  const { t } = useTranslation();

  const faqs = [
    'whatIsM3U8',
    'supportedFormats',
    'whyNotPlay',
    'needSoftware',
    'isFree',
    'howToEmbed'
  ];

  return (
    <section id="faq" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-cyan-500/10 text-cyan-500 border-cyan-500/20">
            {t('faq.badge')}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('faq.title')}</h2>
          <p className="text-lg text-muted-foreground">{t('faq.subtitle')}</p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq}
              value={faq}
              className="border rounded-lg px-6 bg-background"
            >
              <AccordionTrigger className="text-left hover:no-underline">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/10 text-cyan-500 flex items-center justify-center text-sm font-semibold mt-0.5">
                    {index + 1}
                  </span>
                  <span className="font-semibold">{t(`faq.questions.${faq}.question`)}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-9 text-muted-foreground">
                {t(`faq.questions.${faq}.answer`)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

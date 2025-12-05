'use client';

import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

export function UserReviewsSection() {
  const { t } = useTranslation();

  const reviews = [
    { key: 'user1', image: 'https://ext.same-assets.com/576598744/1947109976.png' },
    { key: 'user2', image: 'https://ext.same-assets.com/576598744/3907704586.png' },
    { key: 'user3', image: 'https://ext.same-assets.com/576598744/3094051414.png' },
    { key: 'user4', image: 'https://ext.same-assets.com/576598744/1670182064.png' },
    { key: 'user5', image: 'https://ext.same-assets.com/576598744/4058013344.png' },
    { key: 'user6', image: 'https://ext.same-assets.com/576598744/1579234410.png' }
  ];

  return (
    <section className="py-20 px-4 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <p className="text-cyan-500 font-semibold mb-2">{t('reviews.sectionTitle')}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('reviews.title')}</h2>
          <p className="text-lg text-muted-foreground">{t('reviews.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <Card key={review.key} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={review.image}
                    alt={t(`reviews.list.${review.key}.name`)}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{t(`reviews.list.${review.key}.name`)}</p>
                    <p className="text-sm text-muted-foreground">{t(`reviews.list.${review.key}.role`)}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(`reviews.list.${review.key}.content`)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

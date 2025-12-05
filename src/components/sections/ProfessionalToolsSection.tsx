'use client';

import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw, ArrowRight } from 'lucide-react';

export function ProfessionalToolsSection() {
  const { t } = useTranslation();

  const tools = [
    {
      icon: Download,
      badgeKey: 'tools.downloader.badge',
      badgeColor: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
      titleKey: 'tools.downloader.title',
      descKey: 'tools.downloader.description',
      actionKey: 'tools.downloader.action',
      href: '#downloader'
    },
    {
      icon: RefreshCw,
      badgeKey: 'tools.converter.badge',
      badgeColor: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      titleKey: 'tools.converter.title',
      descKey: 'tools.converter.description',
      actionKey: 'tools.converter.action',
      href: '#converter'
    }
  ];

  return (
    <section className="py-20 px-4 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('tools.title')}</h2>
          <p className="text-lg text-muted-foreground">{t('tools.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Badge variant="secondary" className={`w-fit mb-4 ${tool.badgeColor}`}>
                    {t(tool.badgeKey)}
                  </Badge>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
                      <Icon className="h-6 w-6 text-cyan-500" />
                    </div>
                    <h3 className="text-2xl font-bold">{t(tool.titleKey)}</h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">{t(tool.descKey)}</p>
                  <Button
                    className="group-hover:translate-x-1 transition-transform bg-cyan-500 hover:bg-cyan-600"
                    onClick={() => {
                      document.querySelector(tool.href)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {t(tool.actionKey)}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

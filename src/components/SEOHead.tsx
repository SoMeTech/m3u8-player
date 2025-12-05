'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getSEOConfig } from '@/lib/seo';

export function SEOHead() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'zh-CN';
  const seo = getSEOConfig(currentLang);

  useEffect(() => {
    // 更新meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', seo.description);

    // 更新或创建meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', seo.keywords);

    // 更新页面标题
    document.title = seo.title;

    // 更新html lang属性
    document.documentElement.lang = currentLang;
  }, [currentLang, seo]);

  return null;
}

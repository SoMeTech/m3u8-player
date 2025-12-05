'use client';

import Script from 'next/script';

export function StructuredData() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'M3U8 Player',
    url: 'https://m3u8play.cn',
    description: '专业M3U8/HLS在线播放器，支持M3U8下载、M3U8转MP4、直播点播、自适应码率、字幕播放列表。免安装即时使用，完全免费。',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'M3U8/HLS播放',
      'M3U8下载',
      'M3U8转MP4',
      '直播播放',
      '点播播放',
      '自适应码率',
      '字幕支持',
      '播放列表管理',
      '多语言支持',
    ],
    screenshot: 'https://m3u8play.cn/og-image.png',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250',
    },
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'M3U8 Player',
    url: 'https://m3u8play.cn',
    logo: 'https://m3u8play.cn/logo.png',
    sameAs: [
      // 添加社交媒体链接
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://m3u8play.cn',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'M3U8 Downloader',
        item: 'https://m3u8play.cn/downloader',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'M3U8 Converter',
        item: 'https://m3u8play.cn/converter',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Playlist Manager',
        item: 'https://m3u8play.cn/playlist-manager',
      },
    ],
  };

  return (
    <>
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

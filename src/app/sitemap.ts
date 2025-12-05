export const dynamic = 'force-static'
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://m3u8play.cn';
  const currentDate = new Date();

  // 定义所有页面路由
  const routes = [
    '',
    '/downloader',
    '/converter',
    '/playlist-manager',
    '/blog',
    '/privacy-policy',
    '/terms-of-service',
  ];

  // 为每个路由创建sitemap条目
  const sitemap: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  return sitemap;
}

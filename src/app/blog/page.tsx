'use client';

import { useTranslation } from 'react-i18next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'What is M3U8 Format and How Does it Work?',
    excerpt: 'Learn everything about M3U8 format, HLS protocol, and how streaming works in modern web applications.',
    category: 'Tutorial',
    date: '2025-12-01',
    readTime: '5 min read',
    image: 'https://ext.same-assets.com/576598744/4121885686.png'
  },
  {
    id: '2',
    title: 'How to Download M3U8 Videos: Complete Guide',
    excerpt: 'Step-by-step guide to downloading M3U8 videos using our downloader tool. Learn about multi-threading and CORS solutions.',
    category: 'Guide',
    date: '2025-11-28',
    readTime: '8 min read',
    image: 'https://ext.same-assets.com/576598744/3615341707.jpeg'
  },
  {
    id: '3',
    title: 'Converting M3U8 to MP4: Best Practices',
    excerpt: 'Discover the best methods to convert M3U8 streams to MP4 format using FFmpeg.wasm in the browser.',
    category: 'Tutorial',
    date: '2025-11-25',
    readTime: '6 min read',
    image: 'https://ext.same-assets.com/576598744/4255426708.jpeg'
  },
  {
    id: '4',
    title: 'Understanding HLS Live Streaming Protocol',
    excerpt: 'Deep dive into HTTP Live Streaming (HLS) protocol, adaptive bitrate streaming, and how it powers modern video delivery.',
    category: 'Technical',
    date: '2025-11-20',
    readTime: '10 min read',
    image: 'https://ext.same-assets.com/576598744/2095154809.jpeg'
  },
  {
    id: '5',
    title: 'Solving CORS Issues with M3U8 Streams',
    excerpt: 'Learn how to handle Cross-Origin Resource Sharing (CORS) issues when working with M3U8 video streams.',
    category: 'Technical',
    date: '2025-11-15',
    readTime: '7 min read',
    image: 'https://ext.same-assets.com/576598744/4121885686.png'
  },
  {
    id: '6',
    title: 'Creating Playlists for M3U8 Videos',
    excerpt: 'How to organize and manage your M3U8 video collection with our playlist manager feature.',
    category: 'Guide',
    date: '2025-11-10',
    readTime: '4 min read',
    image: 'https://ext.same-assets.com/576598744/3615341707.jpeg'
  }
];

export default function BlogPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-24 pb-12 px-4 bg-gradient-to-b from-slate-50 to-background dark:from-slate-900">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-8">
              <Badge variant="secondary" className="mb-4 bg-cyan-500/10 text-cyan-500 border-cyan-500/20">
                {t('blog.badge')}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {t('blog.pageTitle')}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('blog.pageSubtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {post.category}
                      </Badge>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                    <CardTitle className="text-xl group-hover:text-cyan-500 transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blog/${post.id}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-cyan-500 hover:text-cyan-600 transition-colors group"
                    >
                      {t('blog.featured.readMore')}
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-12 px-4 bg-slate-50 dark:bg-slate-900">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold mb-6">{t('blog.browseByCategory') || 'Browse by Category'}</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {['Tutorial', 'Guide', 'Technical'].map((category) => {
                const count = blogPosts.filter(p => p.category === category).length;
                return (
                  <Card key={category} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-1">{category}</h3>
                      <p className="text-sm text-muted-foreground">{count} {t('blog.articlesCount') || 'articles'}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <Card className="bg-gradient-to-r from-cyan-500 to-blue-500 border-0">
              <CardContent className="p-8 text-center text-white">
                <h2 className="text-3xl font-bold mb-4">{t('blog.newsletter.title') || 'Stay Updated'}</h2>
                <p className="text-lg mb-6 opacity-90">
                  {t('blog.newsletter.description') || 'Get the latest articles about M3U8, HLS streaming, and video tools delivered to your inbox.'}
                </p>
                <div className="flex gap-2 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder={t('blog.newsletter.placeholder') || 'Enter your email...'}
                    className="flex-1 px-4 py-2 rounded-lg text-gray-900"
                  />
                  <button className="px-6 py-2 bg-white text-cyan-600 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                    {t('blog.newsletter.button') || 'Subscribe'}
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

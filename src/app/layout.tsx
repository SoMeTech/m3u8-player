import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ClientBody from "./ClientBody";
import { defaultSEO } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "M3U8 Player - Free Online M3U8/HLS Player, Downloader & Converter",
  description: "专业M3U8/HLS在线播放器，支持M3U8下载、M3U8转MP4、直播点播、自适应码率、字幕播放列表。免安装即时使用，完全免费。",
  keywords: [
    "M3U8播放器",
    "M3U8下载",
    "M3U8转MP4",
    "HLS播放器",
    "在线M3U8播放器",
    "M3U8线上播放",
    "线上HLS播放",
    "直播播放器",
    "串流播放器",
    "网页视频播放器",
    "自适应码率",
    "字幕",
    "播放列表",
    "免费播放器",
    "M3U8 player",
    "M3U8 downloader",
    "M3U8 to MP4",
    "HLS player",
    "online M3U8 player",
    "live streaming player",
    "video player",
    "adaptive bitrate",
    "playlist manager",
    "free player"
  ],
  authors: [{ name: "M3U8 Player Team" }],
  creator: "M3U8 Player",
  publisher: "M3U8 Player",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://m3u8play.cn'),
  alternates: {
    canonical: '/',
    languages: {
      'zh-CN': '/zh-CN',
      'en': '/en',
      'zh-TW': '/zh-TW',
      'ja': '/ja',
      'de': '/de',
    },
  },
  openGraph: {
    title: "M3U8 Player - Free Online M3U8/HLS Player, Downloader & Converter",
    description: "专业M3U8/HLS在线播放器，支持M3U8下载、M3U8转MP4、直播点播、自适应码率、字幕播放列表。免安装即时使用，完全免费。",
    url: 'https://m3u8play.cn',
    siteName: 'M3U8 Player',
    locale: 'zh_CN',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'M3U8 Player - Professional Online Player',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "M3U8 Player - Free Online M3U8/HLS Player",
    description: "专业M3U8/HLS在线播放器，支持M3U8下载、M3U8转MP4、直播点播。免费使用。",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ClientBody className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        {/* 2. 添加 51.la 统计代码 */}
        {/* SDK 引入 */}
        <Script
          id="LA_COLLECT"
          src="//sdk.51.la/js-sdk-pro.min.js"
          strategy="afterInteractive"
        />
        
        {/* 初始化代码 */}
        <Script id="LA_INIT" strategy="afterInteractive">
          {`LA.init({id:"3NYp61Pd76HDSjDQ",ck:"3NYp61Pd76HDSjDQ"})`}
        </Script>
      </ClientBody>
    </html>
  );
}

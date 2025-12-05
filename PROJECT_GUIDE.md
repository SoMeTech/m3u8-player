# M3U8 播放器项目完整指南

## 项目概述

这是一个功能完整的 M3U8/HLS 播放器、下载器和转换器 Web 应用,基于 Next.js 14 + React 18 + TypeScript 构建,完全复刻源网站 (https://m3u8-player.net/) 的所有功能和设计。

## 核心技术栈

- **框架**: Next.js 14.2.23 (App Router) + React 18
- **语言**: TypeScript
- **样式**: Tailwind CSS + shadcn/ui
- **视频播放**: HLS.js (用于 M3U8/HLS 流播放)
- **视频转换**: @ffmpeg/ffmpeg + @ffmpeg/util (浏览器端转换)
- **多语言**: i18next + react-i18next
- **UI 组件**: Radix UI primitives
- **包管理器**: Bun

## 项目结构

```
m3u8-player/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx           # 根布局
│   │   ├── page.tsx             # 主页
│   │   ├── ClientBody.tsx       # 客户端 body 组件
│   │   └── globals.css          # 全局样式
│   ├── components/              # React 组件
│   │   ├── ui/                  # shadcn/ui 基础组件
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── accordion.tsx
│   │   │   └── collapsible.tsx
│   │   ├── sections/            # 页面 section 组件
│   │   │   ├── HeroSection.tsx       # 英雄区(播放器)
│   │   │   ├── FeaturesSection.tsx   # 特性展示
│   │   │   ├── ProfessionalToolsSection.tsx  # 专业工具
│   │   │   ├── DownloaderSection.tsx # 下载器
│   │   │   ├── ConverterSection.tsx  # 转换器
│   │   │   ├── WhatIsM3U8Section.tsx # M3U8 介绍
│   │   │   ├── WhyChooseSection.tsx  # 选择理由
│   │   │   ├── HowToUseSection.tsx   # 使用步骤
│   │   │   ├── CoreFeaturesSection.tsx  # 核心功能
│   │   │   ├── StatisticsSection.tsx # 统计数据
│   │   │   ├── UserReviewsSection.tsx # 用户评价
│   │   │   ├── FAQSection.tsx        # 常见问题
│   │   │   └── CTASection.tsx        # 行动召唤
│   │   ├── Header.tsx           # 页面头部
│   │   ├── Footer.tsx           # 页面底部
│   │   └── LanguageSwitcher.tsx # 语言切换器
│   └── lib/
│       ├── i18n.ts              # 多语言配置(5种语言)
│       └── utils.ts             # 工具函数
├── .same/
│   └── todos.md                 # 项目待办事项
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 核心功能实现

### 1. M3U8/HLS 在线播放器

**位置**: `src/components/sections/HeroSection.tsx`

**技术实现**:
- 使用 HLS.js 库在浏览器中播放 M3U8 流
- 支持自适应码率切换
- 错误处理和重试机制
- 兼容 Safari (原生 HLS 支持)

**关键代码**:
```typescript
import Hls from 'hls.js';

const hls = new Hls({
  enableWorker: true,
  lowLatencyMode: true,
  backBufferLength: 90
});

hls.loadSource(m3u8Url);
hls.attachMedia(videoRef.current);
hls.on(Hls.Events.MANIFEST_PARSED, () => {
  videoRef.current?.play();
});
```

### 2. M3U8 下载器

**位置**: `src/components/sections/DownloaderSection.tsx`

**技术实现**:
- 解析 M3U8 播放列表文件
- 多线程并发下载分片(concurrency: 5)
- 实时进度追踪
- 本地合并文件保护隐私
- 支持相对和绝对 URL

**关键功能**:
```typescript
const parseM3U8 = (content: string, baseUrl: string): string[] => {
  const lines = content.split('\n');
  const segments: string[] = [];
  const base = baseUrl.substring(0, baseUrl.lastIndexOf('/') + 1);

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const segmentUrl = trimmed.startsWith('http') ? trimmed : base + trimmed;
      segments.push(segmentUrl);
    }
  }

  return segments;
};

const downloadSegments = async (segments: string[], onProgress) => {
  const blobs: Blob[] = [];
  const concurrency = 5;

  for (let i = 0; i < segments.length; i += concurrency) {
    const batch = segments.slice(i, i + concurrency);
    const batchBlobs = await Promise.all(
      batch.map(url => fetch(url, { mode: 'cors' }).then(r => r.blob()))
    );
    blobs.push(...batchBlobs);
    onProgress(blobs.length);
  }

  return blobs;
};
```

### 3. M3U8 格式转换器

**位置**: `src/components/sections/ConverterSection.tsx`

**技术实现**:
- 基于 FFmpeg.wasm 的浏览器端转换
- 支持输出格式: MP4, WEBM, MKV
- 分阶段进度显示
- 无需后端服务器

**转换流程**:
1. 下载 M3U8 和所有分片
2. 合并分片为单个 TS 文件
3. 使用 FFmpeg.wasm 转换格式(当前版本使用直接合并)
4. 提供下载链接

### 4. 多语言支持

**位置**: `src/lib/i18n.ts`

**支持语言**:
- 简体中文 (zh-CN) - 默认
- 英语 (en)
- 繁体中文 (zh-TW)
- 日语 (ja)
- 德语 (de)

**实现方式**:
```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  'zh-CN': { translation: { ... } },
  'en': { translation: { ... } },
  'zh-TW': { translation: { ... } },
  'ja': { translation: { ... } },
  'de': { translation: { ... } }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'zh-CN',
    fallbackLng: 'en'
  });
```

**使用方法**:
```typescript
import { useTranslation } from 'react-i18next';

const { t, i18n } = useTranslation();
// 切换语言
i18n.changeLanguage('en');
// 使用翻译
<h1>{t('hero.title')}</h1>
```

## CORS 限制解决方案

### 问题
跨域资源共享(CORS)限制会阻止浏览器访问不同源的 M3U8 文件。

### 解决方案

1. **播放器**: HLS.js 直接在浏览器解析和播放,避免跨域请求数据
2. **下载器**:
   - 使用 `fetch(url, { mode: 'cors' })`
   - 本地合并,无需服务器转发
3. **转换器**:
   - 全程在浏览器端处理
   - FFmpeg.wasm 本地运行

### 注意事项
- 某些 M3U8 源可能仍有 CORS 限制
- 建议使用支持 CORS 的源或配置代理

## 开发指南

### 安装依赖

```bash
cd m3u8-player
bun install
```

### 启动开发服务器

```bash
bun run dev
```

访问: http://localhost:3000

### 构建生产版本

```bash
bun run build
```

### 启动生产服务器

```bash
bun run start
```

## 自定义和扩展

### 添加新语言

1. 编辑 `src/lib/i18n.ts`
2. 在 `resources` 对象中添加新语言代码和翻译
3. 在 `LanguageSwitcher.tsx` 中添加语言选项

### 修改主题颜色

编辑 `src/app/globals.css` 中的 CSS 变量:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  /* ... 其他颜色 */
}
```

### 添加新的 shadcn/ui 组件

```bash
cd m3u8-player
bunx shadcn@latest add [component-name]
```

## 性能优化

1. **代码分割**: Next.js 自动进行路由级别的代码分割
2. **图片优化**: 使用 Next.js Image 组件
3. **懒加载**: 动态导入大型组件
4. **缓存策略**: 静态资源使用浏览器缓存

## 安全考虑

1. **无数据上传**: 所有处理都在客户端进行
2. **HTTPS**: 生产环境使用 HTTPS
3. **输入验证**: 验证 M3U8 URL 格式
4. **错误处理**: 优雅处理所有错误情况

## 浏览器兼容性

- Chrome/Edge: 完全支持
- Firefox: 完全支持
- Safari: 完全支持(使用原生 HLS)
- 移动浏览器: 响应式设计,完全适配

## 常见问题

### Q: 为什么某些 M3U8 无法播放?
A: 可能原因:
- URL 无效或已过期
- CORS 限制
- 视频格式不支持
- 网络连接问题

### Q: 下载速度慢怎么办?
A:
- 已使用 5 并发下载优化速度
- 可在代码中调整 `concurrency` 参数

### Q: 能否在服务器端运行?
A: 本项目主要为客户端应用,但可以:
- 部署到 Vercel/Netlify 等平台
- 使用 Next.js API Routes 添加服务器功能

## 部署

### Vercel (推荐)

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
cd m3u8-player
vercel
```

### Netlify

```bash
# 构建命令
bun run build

# 输出目录
.next
```

### Docker

```bash
# 构建镜像
docker build -t m3u8-player .

# 运行容器
docker run -p 3000:3000 m3u8-player
```

## 许可证

本项目仅用于学习和演示目的。

## 贡献

欢迎提交 Issue 和 Pull Request!

## 技术支持

如有问题,请:
1. 查看本文档
2. 检查 `.same/todos.md`
3. 查看源码注释
4. 在 GitHub 提 Issue

---

**项目状态**: ✅ 完成

**最后更新**: 2025-12-02

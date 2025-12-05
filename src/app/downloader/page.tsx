'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { DownloaderSection } from '@/components/sections/DownloaderSection';

export default function DownloaderPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <DownloaderSection />
      </main>
      <Footer />
    </div>
  );
}

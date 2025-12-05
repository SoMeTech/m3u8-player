'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PlaylistManagerSection } from '@/components/sections/PlaylistManagerSection';

export default function PlaylistManagerPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <PlaylistManagerSection />
      </main>
      <Footer />
    </div>
  );
}

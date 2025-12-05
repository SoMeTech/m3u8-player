'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ConverterSection } from '@/components/sections/ConverterSection';

export default function ConverterPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <ConverterSection />
      </main>
      <Footer />
    </div>
  );
}

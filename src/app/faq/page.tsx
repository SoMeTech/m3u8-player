'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FAQSection } from '@/components/sections/FAQSection';

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
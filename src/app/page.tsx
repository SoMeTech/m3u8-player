'use client';

import { Header } from '@/components/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { ProfessionalToolsSection } from '@/components/sections/ProfessionalToolsSection';
import { WhatIsM3U8Section } from '@/components/sections/WhatIsM3U8Section';
import { WhyChooseSection } from '@/components/sections/WhyChooseSection';
import { HowToUseSection } from '@/components/sections/HowToUseSection';
import { CoreFeaturesSection } from '@/components/sections/CoreFeaturesSection';
import { StatisticsSection } from '@/components/sections/StatisticsSection';
import { UserReviewsSection } from '@/components/sections/UserReviewsSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { CTASection } from '@/components/sections/CTASection';
import { Footer } from '@/components/Footer';
import { DownloaderSection } from '@/components/sections/DownloaderSection';
import { ConverterSection } from '@/components/sections/ConverterSection';
import { EmbedPlayerSection } from '@/components/sections/EmbedPlayerSection';
 import { PlaylistManagerSection } from '@/components/sections/PlaylistManagerSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ProfessionalToolsSection />
        <DownloaderSection />
        <ConverterSection />
        <PlaylistManagerSection />
        <WhatIsM3U8Section />
        <WhyChooseSection />
        <HowToUseSection />
        <CoreFeaturesSection />
        <StatisticsSection />
        <EmbedPlayerSection />
        <UserReviewsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

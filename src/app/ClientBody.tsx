'use client';

import { useEffect } from 'react';
import '@/lib/i18n';
import { SEOHead } from '@/components/SEOHead';

export default function ClientBody({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  useEffect(() => {
    // Client-side only code
  }, []);

  return (
    <body className={`${className} antialiased`} suppressHydrationWarning>
      <SEOHead />
      {children}
    </body>
  );
}

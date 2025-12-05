'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: December 2, 2025</p>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using M3U8 Player, you agree to be bound by these Terms of Service.
                If you disagree with any part of these terms, you may not use our service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                M3U8 Player provides:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Online M3U8/HLS video playback</li>
                <li>M3U8 video downloading capabilities</li>
                <li>Video format conversion tools</li>
                <li>Playlist management features</li>
                <li>All features operate locally in your browser</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Acceptable Use</h2>
              <h3 className="text-xl font-medium mb-2">3.1 You Agree To:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Use the service only for lawful purposes</li>
                <li>Respect copyright and intellectual property rights</li>
                <li>Only access M3U8 content you have rights to use</li>
                <li>Not use the service to infringe on others' rights</li>
              </ul>

              <h3 className="text-xl font-medium mb-2">3.2 You Agree NOT To:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Download or distribute copyrighted content without permission</li>
                <li>Use the service for any illegal activities</li>
                <li>Attempt to circumvent any security measures</li>
                <li>Reverse engineer or modify the service</li>
                <li>Use the service to harm others or violate their privacy</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Copyright and Content</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong>Important Notice:</strong>
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>You are responsible for ensuring you have the right to access any M3U8 content</li>
                <li>We do not host, store, or distribute any video content</li>
                <li>Our service is a tool - you are responsible for how you use it</li>
                <li>Downloading copyrighted content without permission is illegal</li>
                <li>We are not liable for any copyright infringement by users</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Disclaimer of Warranties</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                THE SERVICE IS PROVIDED "AS IS" WITHOUT ANY WARRANTIES:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>We don't guarantee uninterrupted or error-free service</li>
                <li>We don't guarantee all M3U8 streams will work</li>
                <li>We don't guarantee the quality of downloaded or converted videos</li>
                <li>We are not responsible for content accessed through our service</li>
                <li>We don't guarantee compatibility with all devices or browsers</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                To the maximum extent permitted by law, M3U8 Player shall not be liable for:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Any indirect, incidental, or consequential damages</li>
                <li>Loss of data or content</li>
                <li>Copyright infringement by users</li>
                <li>Issues with third-party M3U8 sources</li>
                <li>Any damages arising from use of the service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. User Responsibility</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You are solely responsible for:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>The M3U8 URLs you input and access</li>
                <li>Compliance with copyright laws</li>
                <li>Your use of downloaded or converted content</li>
                <li>Securing your device and browser</li>
                <li>Any consequences of using the service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Third-Party Links and Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our service may contain links to third-party websites or services. We are not responsible for:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Content on external M3U8 sources</li>
                <li>Privacy practices of third-party sites</li>
                <li>Availability of external services</li>
                <li>Any damages from using third-party services</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Service Availability</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Modify or discontinue the service at any time</li>
                <li>Update features and functionality</li>
                <li>Perform maintenance without notice</li>
                <li>Restrict access if terms are violated</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your use of the service is also governed by our Privacy Policy.
                Please review our Privacy Policy to understand our practices.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">11. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may modify these terms at any time. Continued use of the service after changes
                constitutes acceptance of the new terms. We will update the "Last updated" date when changes are made.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">12. Termination</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may terminate or suspend your access to the service immediately, without prior notice,
                if you breach these Terms of Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">13. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms shall be governed by and construed in accordance with applicable laws,
                without regard to conflict of law provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">14. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-2">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <p className="text-cyan-500">support@m3u8-player.net</p>
            </section>

            <section className="mb-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h3 className="text-lg font-semibold mb-2 text-yellow-800 dark:text-yellow-200">
                ⚠️ Important Legal Notice
              </h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 leading-relaxed">
                This service is a tool for accessing M3U8 streams. Users are solely responsible for ensuring
                they have legal rights to access any content. Downloading copyrighted material without
                permission is illegal in most jurisdictions. Always respect copyright laws and content creators' rights.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

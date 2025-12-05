'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: December 2, 2025</p>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Welcome to M3U8 Player. We respect your privacy and are committed to protecting your personal data.
                This privacy policy explains how we handle your information when you use our service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
              <h3 className="text-xl font-medium mb-2">2.1 Information You Provide</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                M3U8 Player operates entirely in your browser. We do not collect, store, or transmit any personal information to our servers. This includes:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>M3U8 URLs you enter</li>
                <li>Videos you play or download</li>
                <li>Playlists you create</li>
                <li>Any other data you input into the application</li>
              </ul>

              <h3 className="text-xl font-medium mb-2">2.2 Automatically Collected Information</h3>
              <p className="text-muted-foreground leading-relaxed">
                We may collect basic analytics data such as page views and general usage patterns through third-party services.
                This data is anonymized and does not identify individual users.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Since all processing happens locally in your browser:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Your M3U8 URLs and videos remain on your device</li>
                <li>Playlists are stored in your browser's local storage</li>
                <li>Downloaded and converted videos are saved directly to your device</li>
                <li>We have no access to any of your data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Local Storage</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use browser local storage to save your playlists and preferences. This data:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Stays on your device</li>
                <li>Can be cleared at any time through your browser settings</li>
                <li>Is not transmitted to any server</li>
                <li>Persists until you clear it or uninstall your browser</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our service may use third-party libraries and CDNs:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>HLS.js for video playback</li>
                <li>FFmpeg.wasm for video conversion</li>
                <li>These libraries run locally in your browser and do not transmit your data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use minimal cookies for:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Remembering your language preference</li>
                <li>Storing basic session information</li>
                <li>Analytics (if enabled)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                Since we don't collect or store your data on our servers, there's no risk of data breaches from our side.
                Your data security depends on your device and browser security. We recommend:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Using updated browsers</li>
                <li>Keeping your device secure</li>
                <li>Being cautious about the M3U8 sources you access</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed">
                You have complete control over your data:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Access: All your data is stored locally and accessible to you</li>
                <li>Delete: Clear your browser's local storage to remove all data</li>
                <li>Export: Use our playlist export feature to download your data</li>
                <li>Control: Manage cookies through your browser settings</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our service is not directed to children under 13. We do not knowingly collect information from children.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page
                and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="text-cyan-500 mt-2">support@m3u8-player.net</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

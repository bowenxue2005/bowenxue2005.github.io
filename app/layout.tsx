import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Header from './components/Header';
import { siteUrl } from './site';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

const description =
  'Bowen Xue (薛博文), fourth-year undergraduate at USTC and research intern at Stanford, working on visual generation.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Bowen Xue', template: '%s · Bowen Xue' },
  description,
  keywords: ['Bowen Xue', '薛博文', 'visual generation', 'video generation', 'diffusion models', 'USTC', 'Stanford'],
  authors: [{ name: 'Bowen Xue', url: siteUrl }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Bowen Xue',
    title: 'Bowen Xue (薛博文)',
    description,
    images: [{ url: '/avatar.jpg', width: 1024, height: 1024, alt: 'Bowen Xue' }],
  },
  twitter: { card: 'summary', title: 'Bowen Xue (薛博文)', description, images: ['/avatar.jpg'] },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#ffffff', colorScheme: 'light' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Browser extensions write their own attributes onto these two elements
    // before React hydrates; without this React reports them as a mismatch.
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Header />
        {children}
      </body>
    </html>
  );
}

import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Header from './components/Header';
import PageTransition from './components/PageTransition';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const siteUrl = 'https://bowenxue2005.github.io';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Bowen Xue',
    template: '%s · Bowen Xue',
  },
  description:
    'Bowen Xue (薛博文) — undergraduate at USTC, research intern at Stanford. Working on visual generation: image generation, video generation, world models, and efficient visual generation.',
  keywords: [
    'Bowen Xue',
    '薛博文',
    'visual generation',
    'video generation',
    'diffusion models',
    'world models',
    'USTC',
    'Stanford',
  ],
  authors: [{ name: 'Bowen Xue', url: siteUrl }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Bowen Xue',
    title: 'Bowen Xue (薛博文)',
    description:
      'Undergraduate at USTC, research intern at Stanford. Working on visual generation: image generation, video generation, world models, and efficient visual generation.',
    images: [{ url: '/avatar.jpg', width: 1024, height: 1024, alt: 'Bowen Xue' }],
  },
  twitter: {
    card: 'summary',
    title: 'Bowen Xue (薛博文)',
    description:
      'Undergraduate at USTC, research intern at Stanford. Working on visual generation.',
    images: ['/avatar.jpg'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f5f3ff',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="text-gray-800 font-sans">
        <div className="min-h-screen bg-gradient-to-tr from-purple-50 to-blue-50">
          <Header />
          <PageTransition>{children}</PageTransition>
        </div>
      </body>
    </html>
  );
}

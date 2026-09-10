import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { AuthProvider } from '@/components/AuthProvider';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ),
  title: {
    default: 'KhostiGPT | AI Chat Assistant',
    template: '%s | KhostiGPT',
  },
  description:
    'KhostiGPT is a fast AI chat assistant for writing, research, coding, and everyday questions.',
  applicationName: 'KhostiGPT',
  keywords: ['AI assistant', 'AI chat', 'coding assistant', 'writing assistant'],
  authors: [{ name: 'KhostiGPT' }],
  creator: 'KhostiGPT',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    siteName: 'KhostiGPT',
    title: 'KhostiGPT | AI Chat Assistant',
    description:
      'A fast AI chat assistant for writing, research, coding, and everyday questions.',
  },
  twitter: {
    card: 'summary',
    title: 'KhostiGPT | AI Chat Assistant',
    description:
      'A fast AI chat assistant for writing, research, coding, and everyday questions.',
  },
  icons: { icon: '/favicon.ico' },
};

export const viewport: Viewport = {
  themeColor: '#212121',
  colorScheme: 'dark light',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#212121] font-sans text-[#ececec]">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

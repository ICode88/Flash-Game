import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingChatButton from '@/components/layout/FloatingChatButton';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | FlashGames - TopUp Instan, Main Tanpa Batas!',
    default: 'FlashGames - TopUp Instan, Main Tanpa Batas!',
  },
  description: 'Layanan TopUp game online terpercaya dengan proses instan, aman, dan harga terbaik. Nikmati kemudahan top up untuk Mobile Legends, PUBG, Free Fire, dan game populer lainnya.',
  keywords: ['top up game', 'game online', 'diamond ML', 'UC PUBG', 'Free Fire diamonds', 'game voucher', 'top up murah'],
  authors: [{ name: 'FlashGames' }],
  creator: 'FlashGames',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://flashgames.com',
    siteName: 'FlashGames',
    title: 'FlashGames - TopUp Instan, Main Tanpa Batas!',
    description: 'Layanan TopUp game online terpercaya dengan proses instan, aman, dan harga terbaik',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FlashGames - TopUp Instan, Main Tanpa Batas!'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FlashGames - TopUp Instan, Main Tanpa Batas!',
    description: 'Layanan TopUp game online terpercaya dengan proses instan, aman, dan harga terbaik',
    images: ['/images/twitter-image.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://flashgames.com',
    languages: {
      'id-ID': 'https://flashgames.com/id',
      'en-US': 'https://flashgames.com/en',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <FloatingChatButton />
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
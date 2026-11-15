import { Noto_Serif_Bengali, Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import NavbarPage from '@/Components/NavbarPage';
import Footer from '@/Components/Footer';
import { Toaster } from 'react-hot-toast';

const notoSerifBengali = Noto_Serif_Bengali({
  variable: '--font-noto-bengali',
  subsets: ['bengali'],
  weight: ['400', '500', '600', '700'],
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'বাজার দর',
  description: 'বাংলাদেশের প্রতিদিনের বাজারদর',
  //
  icons: {
    icon: '/hero-icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="bn"
      data-theme="light"
      className={`${notoSerifBengali.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="font-[var(--font-noto-bengali)] min-h-full flex flex-col bg-[#f8f9fa] text-gray-900">
        <NavbarPage />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}

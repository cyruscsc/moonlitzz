import type { Metadata } from 'next';
import { Comfortaa } from 'next/font/google';
import './globals.css';
import { BottomNav, Navbar } from '@/components';
import { AuthProvider, ToasterProvider } from '@/context';

const comfortaa = Comfortaa({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sleep Buddy',
  description: 'Your personalized sleep companion.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${comfortaa.className} h-screen`}>
        <AuthProvider>
          <div className='max-w-5xl mx-auto p-1 md:py-0 h-screen'>
            <ToasterProvider />
            <Navbar />
            <div className='md:py-6'>{children}</div>
            <BottomNav />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

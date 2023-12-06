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
      <body className={comfortaa.className}>
        <AuthProvider>
          <div className='max-w-5xl mx-auto'>
            <ToasterProvider />
            <Navbar />
            {children}
            <BottomNav />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

import './globals.css';

import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';

import { ClerkProvider } from '@clerk/nextjs';

import Provider from './provider';

export const metadata: Metadata = {
  title: "UIUX Mockup generator App",
  description: "Generated High quality Free UIUX Mobile and Web MokCup designs",
};

const appFont = DM_Sans({
  subsets: ['latin']
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
      className={appFont.className}
      >
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
    </ClerkProvider>
  );
}

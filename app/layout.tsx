import './globals.css';

import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';

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
    <html lang="en">
      <body
      className={appFont.className}
      >
        {children}
      </body>
    </html>
  );
}

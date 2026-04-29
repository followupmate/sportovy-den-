import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Športový deň 2026 | Tribe Home Experience',
  description: 'Prehľad programu, športových aktivít a orientácie počas dvojdňového firemného eventu v x-bionic® sphere.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sk" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

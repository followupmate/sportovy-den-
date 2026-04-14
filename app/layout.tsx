import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Športový deň 2026 | Tribe Home Experience',
  description: 'Prehľad programu, športových aktivít a orientácie počas dvojdňového firemného eventu v x-bionic® sphere.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sk">
      <body>{children}</body>
    </html>
  );
}

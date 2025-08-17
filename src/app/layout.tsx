import type { Metadata } from 'next';
import { ThemeProvider } from '../context/ThemeContext';
import '../styles/globals.scss';

export const metadata: Metadata = {
  title: 'Pokémon Search App',
  description: 'Search Pokémon with Next.js SSR',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
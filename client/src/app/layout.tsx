import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import 'normalize.css';
import './.styles/globals.css';
import './.styles/variables.css';
import { AppStoreProvider } from './.store';

const lato = Lato({
  weight: ['100', '300', '400', '700', '900'],
  variable: '--font-lato',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Lodash pg',
  description: 'Lodash playground online',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <AppStoreProvider>{children}</AppStoreProvider>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';

// Load fonts with next/font for zero layout shift
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: 'MAHENDRARCH // THE REALITY COMPILER',
  description: 'Web Developer | Digital Architect | Compiling Logic into Reality',
  keywords: [
    'web developer',
    'frontend engineer',
    'React',
    'Next.js',
    'TypeScript',
    '3D web',
    'creative developer',
  ],
  authors: [{ name: 'Mahendrarch' }],
  creator: 'Mahendrarch',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'MAHENDRARCH',
    title: 'MAHENDRARCH // THE REALITY COMPILER',
    description: 'Web Developer | Digital Architect | Compiling Logic into Reality',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MAHENDRARCH // THE REALITY COMPILER',
    description: 'Web Developer | Digital Architect | Compiling Logic into Reality',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>" />
        <meta name="theme-color" content="#0a0a0f" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="antialiased min-h-screen bg-compiler-bg text-compiler-text">
        {/* Skip link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-compiler-primary focus:text-compiler-bg focus:rounded-md"
        >
          Skip to main content
        </a>
        
        {children}
      </body>
    </html>
  );
}

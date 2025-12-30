import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'latin-ext'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'POTRZEBNY.AI - Edukacja | Terapia | Badania',
  description: 'Kompleksowa platforma AI wspierająca edukację, terapię i badania naukowe. Dla uczniów, nauczycieli, terapeutów i badaczy.',
  keywords: ['AI', 'edukacja', 'terapia', 'badania naukowe', 'uczenie maszynowe', 'Polska'],
  authors: [{ name: 'POTRZEBNY.AI', url: 'https://potrzebny.ai' }],
  creator: 'Bartłomiej Potrzebowski',
  publisher: 'POTRZEBNY AI',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: 'https://potrzebny.ai',
    siteName: 'POTRZEBNY.AI',
    title: 'POTRZEBNY.AI - Edukacja | Terapia | Badania',
    description: 'Kompleksowa platforma AI wspierająca edukację, terapię i badania naukowe.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'POTRZEBNY.AI' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'POTRZEBNY.AI',
    description: 'Kompleksowa platforma AI wspierająca edukację, terapię i badania naukowe.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={inter.variable}>
      <body className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 antialiased">
        {children}
      </body>
    </html>
  )
}

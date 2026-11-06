import type { Metadata, Viewport } from 'next';
import './globals.css';
import { identity } from '@/data/portfolio';

const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
export const metadata: Metadata = {
  metadataBase: new URL(base),
  title: { default: 'Filipe Monteiro — Data Engineering & Software Development', template: '%s | Filipe Monteiro' },
  description: 'Filipe Monteiro: estudante de ADS e desenvolvedor de projetos em Engenharia de Dados, Python, PySpark, Databricks, AWS, React e FastAPI. Conheça projetos e estudos de caso.',
  applicationName: 'Filipe Monteiro | Portfolio',
  keywords: ['Filipe Monteiro', 'Engenharia de Dados', 'Python', 'PySpark', 'Databricks', 'AWS', 'Apache Airflow', 'ETL', 'React', 'TypeScript', 'FastAPI', 'Caruaru', 'Data Engineering', 'Software Development'],
  authors: [{ name: identity.professionalName, url: identity.github }],
  creator: identity.professionalName,
  robots: { index: true, follow: true },
  openGraph: { type: 'website', locale: 'pt_BR', siteName: 'Filipe Monteiro', title: 'Filipe Monteiro — Building what connects.', description: 'Dados, software e arquitetura. Conheça os projetos de Filipe Monteiro.', images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Filipe Monteiro — Data Engineering & Software Development' }] },
  twitter: { card: 'summary_large_image', title: 'Filipe Monteiro | Data Engineering & Software', images: ['/og-image.png'] },
  icons: { icon: '/favicon.svg' },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#08070b' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const person = {
    '@context': 'https://schema.org', '@type': 'Person', name: identity.fullName,
    alternateName: identity.professionalName, email: identity.email,
    url: base === 'https://example.com' ? undefined : base,
    sameAs: [identity.github, identity.linkedin],
    homeLocation: { '@type': 'Place', name: 'Caruaru, Pernambuco, Brasil' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Wyden UNIFAVIP' },
    knowsAbout: ['Data Engineering', 'Python', 'PySpark', 'SQL', 'AWS', 'Apache Airflow', 'React', 'FastAPI']
  };
  return <html lang="pt-BR"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, '\\u003c') }}/>{children}</body></html>;
}

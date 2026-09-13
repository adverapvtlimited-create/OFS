import '@/styles/globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SmoothScroller from '@/components/animations/SmoothScroller';
import CustomCursor from '@/components/animations/CustomCursor';
import PageTransition from '@/components/animations/PageTransition';
import NextTopLoader from 'nextjs-toploader';
import JsonLd from '@/components/SEO/JsonLd';
import siteConfig from '@/data/site-config.json';
import { DEFAULT_KEYWORDS, PAGE_SEO } from '@/config/seo.config';
import { buildPageMetadata } from '@/lib/seo';
import { buildOrganizationSchema, buildWebSiteSchema } from '@/lib/schema';

const homeSeo = PAGE_SEO.home;

export const metadata = {
  ...buildPageMetadata({
    title: homeSeo.title,
    description: homeSeo.description,
    path: homeSeo.path,
    keywords: [...DEFAULT_KEYWORDS, ...(homeSeo.keywords || [])],
  }),
  authors: [{ name: 'OFS Group India', url: 'https://ofsgroupindia.com' }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: '6fo7oPOILUbH5krDSVg-5jP9-Z3Rk2HUTTYY4FzHehc',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <JsonLd data={[buildOrganizationSchema(), buildWebSiteSchema()]} />
      </head>
      <body suppressHydrationWarning>
        <NextTopLoader
          color="var(--ofs-red-600)"
          height={3}
          showSpinner={false}
          speed={300}
          shadow="0 0 10px rgba(224, 42, 48, 0.5), 0 0 5px rgba(224, 42, 48, 0.3)"
        />
        <CustomCursor />
        <SmoothScroller>
          <Header />
          <main id="main-content">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </SmoothScroller>
      </body>
    </html>
  );
}


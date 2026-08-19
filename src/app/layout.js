import '@/styles/globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import siteConfig from '@/data/site-config.json';

export const metadata = {
  metadataBase: new URL('https://ofsgroupindia.com'),
  title: {
    default: 'OFS Group India — Marine, Offshore, Energy & EPC Support Services',
    template: '%s | OFS Group India'
  },
  description: siteConfig.longDesc,
  keywords: [
    'OFS Group India',
    'Oriented Facility Solution',
    'Procurement and Shipping',
    'Engineering and EPC Support',
    'Quality Control ISO 9001:2015',
    'Marine Offshore Services',
    'Industrial Maintenance AMC',
    'Solar EPC Support',
    'Renewable Energy Infrastructure',
    'Mumbai Offshore Basin Logistics'
  ],
  authors: [{ name: 'OFS Group India' }],
  creator: 'Oriented Facility Solution Pvt. Ltd.',
  publisher: 'Oriented Facility Solution Pvt. Ltd.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ofsgroupindia.com',
    siteName: 'OFS Group India',
    title: 'OFS Group India — Marine, Offshore, Energy & EPC Support Services',
    description: siteConfig.shortDesc,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'OFS Group India Corporate Overview'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OFS Group India — Marine, Offshore, Energy & EPC Support Services',
    description: siteConfig.shortDesc,
    images: ['https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80'],
    creator: '@ofsgroupindia'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '6fo7oPOILUbH5krDSVg-5jP9-Z3Rk2HUTTYY4FzHehc',
  }
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'OFS Group India',
    legalName: siteConfig.legalName,
    url: 'https://ofsgroupindia.com',
    logo: 'https://ofsgroupindia.com/logo.png',
    description: siteConfig.longDesc,
    foundingDate: '2018',
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${siteConfig.contact.addressIndia.line1}, ${siteConfig.contact.addressIndia.line2}`,
      addressLocality: siteConfig.contact.addressIndia.city,
      addressRegion: siteConfig.contact.addressIndia.state,
      postalCode: siteConfig.contact.addressIndia.pincode,
      addressCountry: 'IN'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.contact.phoneRaw,
      contactType: 'customer service',
      areaServed: ['IN', 'US', 'AE', 'SA', 'SG'],
      availableLanguage: ['English', 'Hindi']
    },
    sameAs: [
      siteConfig.socials.linkedin,
      siteConfig.socials.facebook,
      siteConfig.socials.youtube,
      siteConfig.socials.twitter
    ]
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://professorlab.co'),
  title: {
    default: "ProfessorLab | Engineering Intelligence - AI Solutions, Mobile & Web Apps",
    template: "%s | ProfessorLab"
  },
  description: "ProfessorLab is a leading Engineering Intelligence company focused on delivering AI Solutions, iOS Apps, Android Apps, Web Apps, and Enterprise AI products. We build top-class apps with the best user experience, serving both B2C and B2B markets.",
  keywords: [
    "ProfessorLab",
    "Professor Lab",
    "Engineering Intelligence",
    "AI Solutions",
    "LLM Agents",
    "AI Agent Development",
    "iOS App Development",
    "Android App Development",
    "Web App Development",
    "Enterprise AI",
    "Flutter Apps",
    "Machine Learning",
    "Software Engineering",
    "B2B Software",
    "B2C Apps",
    "AI Automation",
    "Custom Software Development"
  ],
  authors: [{ name: "ProfessorLab", url: "https://professorlab.co" }],
  creator: "ProfessorLab",
  publisher: "ProfessorLab",
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
  icons: {
    apple: [
      { url: "/logo/logo.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://professorlab.co",
    siteName: "ProfessorLab",
    title: "ProfessorLab | Engineering Intelligence - AI Solutions & Software Development",
    description: "ProfessorLab is a leading Engineering Intelligence company delivering AI Solutions, iOS, Android, Web Apps, and Enterprise AI. Transform your business with cutting-edge technology.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ProfessorLab - Engineering Intelligence",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ProfessorLab | Engineering Intelligence",
    description: "Leading Engineering Intelligence company building AI Solutions, Mobile & Web Apps for B2B and B2C markets.",
    images: ["/og-image.png"],
    creator: "@professorlab",
  },
  alternates: {
    canonical: "https://professorlab.co",
  },
  category: "Technology",
};

// JSON-LD Structured Data for Organization (helps Google show logo)
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ProfessorLab",
  alternateName: ["Professor Lab", "ProfessorLab Ltd"],
  url: "https://professorlab.co",
  logo: "https://professorlab.co/logo.svg",
  description: "ProfessorLab is a leading Engineering Intelligence company focused on delivering AI Solutions, iOS Apps, Android Apps, Web Apps, and Enterprise AI products.",
  sameAs: [
    "https://www.linkedin.com/company/professorlab/"
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "contact@professorlab.co",
    contactType: "customer service"
  },
  foundingDate: "2024",
  slogan: "Engineering Intelligence",
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "LLM Agents",
    "iOS Development",
    "Android Development",
    "Web Development",
    "Enterprise Software"
  ]
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ProfessorLab",
  alternateName: "Professor Lab",
  url: "https://professorlab.co",
  description: "Engineering Intelligence - AI Solutions, Mobile & Web App Development",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://professorlab.co/?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

// Image Structured Data for Logo (helps in Google Image Search)
const logoJsonLd = {
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "url": "https://professorlab.co/logo/logo.png",
  "name": "ProfessorLab Logo",
  "description": "ProfessorLab Official Logo - Engineering Intelligence",
  "caption": "ProfessorLab Logo",
  "representativeOfPage": "true",
  "uploadDate": "2024-12-19",
  "author": {
    "@type": "Organization",
    "name": "ProfessorLab"
  }
};

const logoSvgJsonLd = {
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "url": "https://professorlab.co/logo.svg",
  "name": "ProfessorLab Logo (SVG)",
  "description": "ProfessorLab Official Logo SVG format - Engineering Intelligence",
  "caption": "ProfessorLab Logo SVG",
  "representativeOfPage": "true",
  "uploadDate": "2024-12-19",
  "author": {
    "@type": "Organization",
    "name": "ProfessorLab"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(logoJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(logoSvgJsonLd) }}
        />
        <link rel="canonical" href="https://professorlab.co" />
        <meta name="theme-color" content="#002366" />
        <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

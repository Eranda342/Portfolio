import type { Metadata, Viewport } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "@/styles/globals.css";
import { personSchema, websiteSchema } from "@/lib/structured-data";

// ─── Font Loading ───────────────────────────────────────────────────────────

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

// ─── SEO Metadata ───────────────────────────────────────────────────────────

const BASE_URL = "https://yourdomain.dev";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Your Name — Software Engineer & CS Student",
    template: "%s | Your Name",
  },

  description:
    "Final-year Computer Science student and software engineer specializing in full-stack development, systems design, and production-grade engineering. Building scalable systems with Next.js, TypeScript, and Node.js.",

  keywords: [
    "software engineer",
    "computer science student",
    "full-stack developer",
    "Next.js developer",
    "TypeScript",
    "React developer",
    "portfolio",
    "systems engineering",
  ],

  authors: [{ name: "Your Name", url: BASE_URL }],
  creator: "Your Name",

  openGraph: {
    type: "website",
    url: BASE_URL,
    title: "Your Name — Software Engineer & CS Student",
    description:
      "Final-year CS student building production-grade software. Specializing in full-stack engineering with Next.js, TypeScript, and Node.js.",
    siteName: "Your Name — Portfolio",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Your Name — Software Engineer Portfolio",
      },
    ],
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Your Name — Software Engineer & CS Student",
    description:
      "Final-year CS student building production-grade software. View my projects and get in touch.",
    images: [`${BASE_URL}/og-image.png`],
    creator: "@yourusername",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: BASE_URL,
  },

  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B1120",
};

// ─── Root Layout ────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        {children}

        {/* JSON-LD Structured Data */}
        <Script
          id="person-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema()) }}
          strategy="afterInteractive"
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

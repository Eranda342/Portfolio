/**
 * structured-data.ts — JSON-LD Schema Generators
 * ─────────────────────────────────────────────────
 * Generates structured data for SEO and rich search results.
 * Used in app/layout.tsx as <script type="application/ld+json">.
 */

const BASE_URL = "https://yourdomain.dev";

/**
 * Person schema — tells search engines who you are.
 * Enables rich result panels in Google Search.
 */
export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Your Name",
    url: BASE_URL,
    email: "developer@yourdomain.dev",
    jobTitle: "Software Engineer",
    description:
      "Final-year Computer Science student building production-grade software. Specializing in full-stack engineering, systems design, and modern web development.",
    sameAs: [
      "https://github.com/yourusername",
      "https://linkedin.com/in/yourusername",
    ],
    knowsAbout: [
      "Next.js",
      "TypeScript",
      "React",
      "Node.js",
      "PostgreSQL",
      "Docker",
      "System Design",
    ],
    image: `${BASE_URL}/og-image.png`,
  };
}

/**
 * WebSite schema — enables Sitelinks Searchbox in Google.
 */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Your Name — Portfolio",
    url: BASE_URL,
    description:
      "Portfolio of a final-year CS student and software engineer specializing in full-stack development and systems engineering.",
    author: {
      "@type": "Person",
      name: "Your Name",
    },
    inLanguage: "en-US",
  };
}

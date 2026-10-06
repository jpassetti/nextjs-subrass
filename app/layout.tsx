import "../styles/global.scss";

import type { Metadata } from "next";
import Script from "next/script";
import Analytics from "./analytics";
import Providers from "./providers";
import * as gtag from "../lib/gtag";

export const metadata: Metadata = {
 title: {
  default: "Syracuse University Brass Ensemble",
  template: "%s | Syracuse University Brass Ensemble",
 },
 description: "Syracuse University Brass Ensemble official website.",
 metadataBase: new URL("https://subrass.syr.edu"),
 alternates: {
  canonical: "/",
 },
 icons: {
  icon: [
   { url: "/favicon.ico" },
   { url: "/images/favicons/favicon-16.png", sizes: "16x16", type: "image/png" },
   { url: "/images/favicons/favicon-32.png", sizes: "32x32", type: "image/png" },
   { url: "/images/favicons/favicon-96.png", sizes: "96x96", type: "image/png" },
   { url: "/images/favicons/favicon-144.png", sizes: "144x144", type: "image/png" },
   { url: "/images/favicons/favicon-192.png", sizes: "192x192", type: "image/png" },
  ],
  apple: [{ url: "/images/favicons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
 },
 openGraph: {
  type: "website",
  locale: "en_US",
  url: "https://subrass.syr.edu",
  siteName: "Syracuse University Brass Ensemble",
  title: "Syracuse University Brass Ensemble",
  description: "Syracuse University Brass Ensemble official website.",
  images: [
   {
    url: "/photos/1200x630/syracuse-university-brass-ensemble-1200x630px.jpg",
    width: 1200,
    height: 630,
    alt: "Syracuse University Brass Ensemble",
   },
  ],
 },
 twitter: {
  card: "summary_large_image",
  title: "Syracuse University Brass Ensemble",
  description: "Syracuse University Brass Ensemble official website.",
  images: ["/photos/1200x630/syracuse-university-brass-ensemble-1200x630px.jpg"],
 },
};

export default function RootLayout({ children }) {
 return (
  <html lang="en" data-scroll-behavior="smooth">
   <head>
    <link rel="stylesheet" href="https://use.typekit.net/nnm0mtl.css" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
     href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap"
     rel="stylesheet"
    />
    <meta
     name="google-site-verification"
     content="l26PfsrOTavwnJHFn2NCyqFYO7CMdnIPQs3SVPkiJ3o"
    />
   </head>
   <body>
    <Script
     strategy="afterInteractive"
     src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
    />
    <Script
      id="ga-inline-config-app"
     strategy="afterInteractive"
     dangerouslySetInnerHTML={{
      __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gtag.GA_TRACKING_ID}', {
          page_path: window.location.pathname,
        });
      `,
     }}
    />
    <Analytics />
    <Providers>{children}</Providers>
   </body>
  </html>
 );
}

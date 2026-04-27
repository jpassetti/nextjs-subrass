import "../styles/global.scss";

import Script from "next/script";
import Analytics from "./analytics";
import Providers from "./providers";
import * as gtag from "../lib/gtag";

export const metadata = {
 title: "Syracuse University Brass Ensemble",
 description: "Syracuse University Brass Ensemble official website.",
};

export default function RootLayout({ children }) {
 return (
  <html lang="en">
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

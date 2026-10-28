import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
 return {
  rules: {
   userAgent: "*",
   allow: "/",
   disallow: ["/api/", "/master-class/admin/"],
  },
  sitemap: "https://subrass.syr.edu/sitemap.xml",
  host: "https://subrass.syr.edu",
 };
}

import type { Metadata } from "next";

import Breadcrumbs from "../../../../components/breadcrumbs";
import Layout from "../../../../components/layout";
import { getEnsembleBySlug, getMusicianBySlug } from "../../../../lib/api";
import ProgramExperience from "./program-experience";
import styles from "./program.module.scss";

const CANONICAL_URL = "https://subrass.syr.edu/concerts/america250/program";

export const metadata: Metadata = {
 title: "America 250 Concert Program",
 description: "Explore the full program for the America 250 concert featuring the Syracuse University Brass Ensemble and 10th Mountain Division Band at Hendricks Chapel.",
 alternates: { canonical: CANONICAL_URL },
 robots: { index: true, follow: true },
 openGraph: {
  type: "website",
  url: CANONICAL_URL,
  title: "America 250 Concert Program",
  description: "The digital event program for the America 250 concert at Hendricks Chapel on Nov. 13, 2026.",
  images: [{ url: "/america250/seo/america250-concert-16x9.webp", width: 1920, height: 1080, alt: "America 250 concert artwork" }],
 },
};

const leadershipRoles = [
 { slug: "james-t-spencer", name: "Dr. James T. Spencer", role: "Co-Director" },
 { slug: "craig-elwood", name: "Craig R. Elwood", role: "Co-Director" },
 { slug: "corey-riley", name: "Corey Riley", role: "Assistant Director" },
];

export const revalidate = 86400;

export default async function America250ProgramPage() {
 const [leadershipData, ensemble] = await Promise.all([
  Promise.all(leadershipRoles.map(async (leader) => ({ leader, musician: await getMusicianBySlug(leader.slug) }))),
  getEnsembleBySlug("2026-27"),
 ]);
 const leadership = leadershipData.map(({ leader, musician }) => {
  const image = musician?.featuredImage?.node;
  return {
   ...leader,
   image: image?.sourceUrl ? {
    src: image.sourceUrl,
    alt: image.altText || `Portrait of ${leader.name}`,
    width: image.mediaDetails?.width || 400,
    height: image.mediaDetails?.height || 400,
   } : null,
  };
 });

 const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
   { "@type": "ListItem", position: 1, name: "Home", item: "https://subrass.syr.edu/" },
   { "@type": "ListItem", position: 2, name: "Concerts", item: "https://subrass.syr.edu/concerts" },
   { "@type": "ListItem", position: 3, name: "America 250", item: "https://subrass.syr.edu/concerts/america250" },
   { "@type": "ListItem", position: 4, name: "Program", item: CANONICAL_URL },
  ],
 };

 return (
  <Layout>
   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
   <div className={styles.breadcrumbBar}>
    <Breadcrumbs
     items={[
      { label: "Home", href: "/" },
      { label: "Concerts", href: "/concerts" },
      { label: "America 250", href: "/concerts/america250" },
      { label: "Program" },
     ]}
     theme="dark"
    />
   </div>
   <ProgramExperience leadership={leadership} ensemble={ensemble} />
  </Layout>
 );
}

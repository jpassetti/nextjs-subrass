import ConcertInteractive from "../../components/concertInteractive";
import Breadcrumbs from "../../components/breadcrumbs";
import type { Metadata } from "next";
import Image from "next/image";
import Layout from "../../components/layout";
import Paragraph from "../../components/paragraph";
import Section from "../../components/section";
import { getAllConcerts } from "../../lib/api";
import { getConcertDate, getConcertPagePath } from "../../lib/utilities";
import styles from "./concerts.module.scss";
import { ensembleImage16x9 } from "../../lib/site-images";

export const metadata: Metadata = {
 title: "Upcoming Concerts - Syracuse University Brass Ensemble Live Performances",
 description:
  "Experience the power of live brass music! See the Syracuse University Brass Ensemble perform in concerts across New York and beyond.",
 alternates: {
  canonical: "/concerts",
 },
 openGraph: {
  type: "website",
  url: "https://subrass.syr.edu/concerts",
  title: "Upcoming Concerts - Syracuse University Brass Ensemble Live Performances",
  description:
   "Experience the power of live brass music! See the Syracuse University Brass Ensemble perform in concerts across New York and beyond.",
  images: [
   {
    url: ensembleImage16x9,
    width: 1920,
    height: 1080,
    alt: "Syracuse University Brass Ensemble",
   },
  ],
 },
 twitter: {
  card: "summary_large_image",
  title: "Upcoming Concerts - Syracuse University Brass Ensemble Live Performances",
  description:
   "Experience the power of live brass music! See the Syracuse University Brass Ensemble perform in concerts across New York and beyond.",
  images: [ensembleImage16x9],
 },
};

function getCurrentAcademicYear() {
 const now = new Date();
 const year = now.getFullYear();
 const month = now.getMonth();
 const startYear = month >= 6 ? year : year - 1;
 const endYear = String(startYear + 1).slice(-2);
 return `${startYear}-${endYear}`;
}

export default async function ConcertsPage() {
 const concertsData = await getAllConcerts();
 const currentAcademicYear = getCurrentAcademicYear();
 const now = new Date();

 const concertsByAcademicYear =
  concertsData?.reduce((accumulator, concert) => {
   const yearNode = concert.node.academicYears?.edges?.[0]?.node;
   if (!yearNode?.name) {
    return accumulator;
   }

   if (!accumulator[yearNode.name]) {
    accumulator[yearNode.name] = [];
   }

   accumulator[yearNode.name].push(concert);
   return accumulator;
  }, {}) || {};

 const currentYearConcerts = concertsByAcademicYear[currentAcademicYear] || [];
 const currentYearUpcomingConcerts = currentYearConcerts.filter(({ node }) => {
  return new Date(node.concertInformation.date) >= now;
 });

 const currentYearPastConcerts = currentYearConcerts
  .filter(({ node }) => {
   return new Date(node.concertInformation.date) < now;
  })
  .sort((a, b) => {
   return (
    new Date(b.node.concertInformation.date).getTime() -
    new Date(a.node.concertInformation.date).getTime()
   );
  });

 const previousAcademicYears = Object.keys(concertsByAcademicYear)
  .filter((yearLabel) => yearLabel !== currentAcademicYear)
  .sort((a, b) => {
   const startYearA = parseInt(a.split("-")[0], 10);
   const startYearB = parseInt(b.split("-")[0], 10);
   return startYearB - startYearA;
  });

 // Overview pages link to the canonical event pages without declaring partial events.
 const upcomingEventList = currentYearUpcomingConcerts.slice(0, 20).map(({ node }, index) => ({
  "@type": "ListItem",
  position: index + 1,
  name: node?.title,
  url: `https://subrass.syr.edu${getConcertPagePath(node)}`,
 }));

 return (
  <Layout>
   <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
     __html: JSON.stringify({
      "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Syracuse University Brass Ensemble Upcoming Concerts",
    description:
     "Experience the Syracuse University Brass Ensemble live. Explore upcoming concert dates, venues, and details.",
    url: "https://subrass.syr.edu/concerts",
    numberOfItems: upcomingEventList.length,
    itemListElement: upcomingEventList,
     }),
    }}
   />
   <Section>
    <div className={styles.hero}>
     <div className={styles.heroVisual}>
      <Breadcrumbs
       theme="dark"
       overlay
       items={[{ label: "Home", href: "/" }, { label: "Concerts" }]}
      />
      <Image
       src="/horns-and-harmonies-2025/HH_DSC0513.webp"
       alt="The Syracuse University Brass Ensemble performing in Hendricks Chapel"
       fill
       sizes="(min-width: 1200px) 72rem, 100vw"
       className={styles.heroImage}
       priority
      />
      <div className={styles.heroShade} aria-hidden="true"></div>
     </div>
     <div className={styles.heroContent}>
      <h1>Upcoming Concerts</h1>
      <p>
       Experience live brass music performed by the Syracuse University Brass
       Ensemble. Explore upcoming concerts featuring repertoire ranging from
       classical works to contemporary music, and join us for an inspiring live
       performance.
      </p>
     </div>
    </div>

    <ConcertInteractive
     concerts={currentYearUpcomingConcerts}
     sectionTitle="Upcoming Concerts"
     label={currentAcademicYear}
    />
    {currentYearUpcomingConcerts.length ? (
     null
    ) : (
     <Paragraph diminish>No upcoming concerts are currently scheduled.</Paragraph>
    )}

    {currentYearPastConcerts.length ? (
     <ConcertInteractive
      concerts={currentYearPastConcerts}
      sectionTitle="Past Concerts"
      label={currentAcademicYear}
      listOnly
     />
    ) : null}

    {previousAcademicYears.map((yearLabel) => {
     return (
      <div className={styles.archiveYear} key={yearLabel}>
       <ConcertInteractive
        concerts={[...concertsByAcademicYear[yearLabel]].sort((a, b) => {
         return new Date(getConcertDate(b.node)).getTime() - new Date(getConcertDate(a.node)).getTime();
        })}
        sectionTitle="Past Concerts"
        label={yearLabel}
        listOnly
       />
      </div>
     );
    })}
   </Section>
  </Layout>
 );
}

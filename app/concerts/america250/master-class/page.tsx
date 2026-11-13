import type { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

import EventTools from "../../../../components/event-tools";
import Heading from "../../../../components/heading";
import Layout from "../../../../components/layout";
import Section from "../../../../components/section";
import styles from "./master-class.module.scss";
import { ensembleReference } from "../../../../lib/site-identity";

const CANONICAL_URL = "https://subrass.syr.edu/concerts/america250/master-class";

const TITLE = "Musician Masterclass | America 250";
const DESCRIPTION = "Musician master class for high school, college, and community musicians with the 10th Mountain Division Band, Nov. 13, 2026, 4–5 p.m. EST at Hendricks Chapel.";
const SHARE_IMAGE = "/america250/kit/social-media/facebook/america250-fb-1200x630px.jpg";

export const revalidate = 3600;

export const metadata: Metadata = {
 title: TITLE,
 description: DESCRIPTION,
 alternates: { canonical: CANONICAL_URL },
 robots: {
  index: true, follow: true,
  googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
 },
 openGraph: {
  type: "website", locale: "en_US", siteName: "Syracuse University Brass Ensemble",
  url: CANONICAL_URL, title: TITLE, description: DESCRIPTION,
  images: [{ url: SHARE_IMAGE, width: 1200, height: 630, alt: "America 250 concert and musician master class at Hendricks Chapel" }],
 },
 twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [SHARE_IMAGE] },
};

const eventSchema = {
 "@context": "https://schema.org",
 "@type": "EducationEvent",
 "@id": `${CANONICAL_URL}#event`,
 name: "America 250: Explore a Life in Music — Musician Master Class",
 url: CANONICAL_URL,
 mainEntityOfPage: CANONICAL_URL,
 description: DESCRIPTION,
 startDate: "2026-11-13T16:00:00-05:00",
 endDate: "2026-11-13T17:00:00-05:00",
 eventStatus: "https://schema.org/EventScheduled",
 eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
 image: [`https://subrass.syr.edu${SHARE_IMAGE}`],
 inLanguage: "en-US",
 audience: [
  { "@type": "EducationalAudience", educationalRole: "student", audienceType: "High school and college musicians" },
  { "@type": "Audience", audienceType: "Adult and community musicians" },
 ],
 location: {
  "@type": "Place", "@id": "https://subrass.syr.edu/concerts/venues/hendricks-chapel",
  name: "Hendricks Chapel", sameAs: "https://chapel.syracuse.edu/",
  address: { "@type": "PostalAddress", streetAddress: "121 Crouse Drive", addressLocality: "Syracuse", addressRegion: "NY", postalCode: "13244", addressCountry: "US" },
 },
 performer: { "@type": "MusicGroup", name: "10th Mountain Division Band", url: "https://home.army.mil/drum/units-tenants/10th-mountain-division-band" },
 organizer: ensembleReference,
 isAccessibleForFree: true,
};

const breadcrumbSchema = {
 "@context": "https://schema.org", "@type": "BreadcrumbList",
 itemListElement: [
  { "@type": "ListItem", position: 1, name: "Home", item: "https://subrass.syr.edu/" },
  { "@type": "ListItem", position: 2, name: "Concerts", item: "https://subrass.syr.edu/concerts" },
  { "@type": "ListItem", position: 3, name: "America 250", item: "https://subrass.syr.edu/concerts/america250" },
  { "@type": "ListItem", position: 4, name: "Masterclass", item: CANONICAL_URL },
 ],
};

export default function America250MasterClassPage() {
 return (
  <Layout>
   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema).replace(/</g, "\\u003c") }} />
   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }} />
   <Section>
    <main className={styles.page}>
     <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <ol>
       <li><Link className={styles.breadcrumbHome} href="/" aria-label="Home"><FontAwesomeIcon icon={faHouse} aria-hidden="true" /></Link></li>
       <li><Link href="/concerts">Concerts</Link></li>
       <li><Link href="/concerts/america250">America 250</Link></li>
       <li><span aria-current="page">Masterclass</span></li>
      </ol>
     </nav>

     <header className={styles.hero}>
      <p className={styles.eyebrow}>Free master class for high school, college, and community musicians</p>
      <Heading level={1} marginTop="0" marginBottom="3">Explore a Life in Music</Heading>
      <p className={styles.lede}>Meet members of the 10th Mountain Division Band and discover how preparation, performance, education, and service can shape a professional life in music.</p>
      <div className={styles.heroActions}>
       <Link className={styles.button} href="/concerts/america250">View the event schedule</Link>
       <Link className={styles.button} href="/concerts/america250/master-class/resources">Masterclass resources</Link>
      </div>
     </header>


     <div className={styles.detailsGrid}>
      <div><span>Date</span><strong>Friday, Nov. 13, 2026</strong></div>
      <div><span>Time</span><strong>4–5 p.m.</strong></div>
      <div><span>Location</span><strong><Link href="/concerts/venues/hendricks-chapel">Hendricks Chapel</Link></strong></div>
      <div><span>Eligibility</span><strong>High school, college, and community musicians</strong></div>
     </div>

     <section className={styles.section}>
      <Heading level={2} marginTop="0" marginBottom="2">Learn from Soldier-Musicians</Heading>
      <p>Members of the 10th Mountain Division Band will share their musical journeys and offer practical guidance for musicians considering their next steps in music. The hour is designed to be conversational, useful, and encouraging, whether a participant plans to study music, pursue performance, serve through music, or simply become a stronger and more confident musician.</p>
      <p>Participants will have an opportunity to ask questions and learn directly from professional musicians whose work brings together artistry, leadership, community engagement, and military service.</p>
     </section>

     <section className={styles.expectSection}>
      <Heading level={2} marginTop="0" marginBottom="2">What Musicians Can Expect</Heading>
      <div className={styles.topicGrid}>
       <article><h3>Preparation</h3><p>Strategies for effective practice, audition preparation, and developing confidence under pressure.</p></article>
       <article><h3>Performance</h3><p>Professional insight, demonstrations, and techniques participants can carry into rehearsals and performances.</p></article>
       <article><h3>Music Careers</h3><p>An open conversation about education, military music, professional opportunities, and building a sustainable musical life.</p></article>
      </div>
     </section>

     <section className={styles.rsvpCallout}>
      <div>
       <p className={styles.eyebrow}>High school, college, and community musicians are welcome</p>
       <Heading level={2} color="white" marginTop="0" marginBottom="2">Registration Is Closed</Heading>
       <p>Online registration is now closed. Registered participants should arrive around 3:45 p.m. Family and friends are welcome to observe the masterclass, and the evening America 250 concert is open to the public. Parking is free.</p>
      </div>
      <a className={styles.button} href="mailto:subrass@syr.edu">Questions about participating?</a>
     </section>
     <EventTools title="America 250: Explore a Life in Music — Musician Master Class"
      start={eventSchema.startDate} end={eventSchema.endDate}
      location="Hendricks Chapel, 121 Crouse Drive, Syracuse, NY 13244" url={CANONICAL_URL}
      admission="Registration is closed. Family and friends may attend as audience members."
      parkingText="Free public parking is available at Irving Garage."
      parkingUrl="https://www.google.com/maps/dir/?api=1&destination=Irving+Garage+Syracuse+NY" />
    </main>
   </Section>
  </Layout>
 );
}

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import Layout from "../../../components/layout";
import Section from "../../../components/section";
import { getConcertBySlug } from "../../../lib/api";
import { getVenuePagePath } from "../../../lib/utilities";
import styles from "./america250.module.scss";

const CONCERT_SLUG = "celebrate-americas-250th-anniversary-concert";
const CANONICAL_URL = "https://subrass.syr.edu/concerts/america250";
const EVENT_TITLE = "America 250: A Celebration of Service, Education, and Musical Excellence";
const CONCERT_START = "2026-11-13T18:30:00-05:00";
const CONCERT_END = "2026-11-13T20:00:00-05:00";
const FEATURED_IMAGE = "/america250/america250--featured-image.jpg";
const SHOWCASE_IMAGE = "/america250/america250--left.jpg";

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
 const title = EVENT_TITLE;
 const description = "A free America 250 concert featuring the Syracuse University Brass Ensemble and the 10th Mountain Division Band, plus a student masterclass for high school musicians.";

 return {
  title,
  description,
  alternates: { canonical: CANONICAL_URL },
  openGraph: { type: "website", url: CANONICAL_URL, title, description, images: [{ url: FEATURED_IMAGE, width: 2000, height: 1294, alt: title }] },
  twitter: { card: "summary_large_image", title, description, images: [FEATURED_IMAGE] },
 };
}

export default async function America250Page() {
 const concert = await getConcertBySlug(CONCERT_SLUG);
 if (!concert) notFound();

 const { concertInformation } = concert;
 const { venue } = concertInformation;
 const { venueInformation } = venue;
 const venuePath = getVenuePagePath(venue.title);

 const eventSchema = {
  "@context": "https://schema.org",
  "@type": "MusicEvent",
  name: EVENT_TITLE,
  url: CANONICAL_URL,
  description: "A free joint concert by the Syracuse University Brass Ensemble and the 10th Mountain Division Band commemorating America’s 250th anniversary.",
  startDate: CONCERT_START,
  endDate: CONCERT_END,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  image: `https://subrass.syr.edu${FEATURED_IMAGE}`,
  location: {
   "@type": "Place",
   name: venue.title,
   address: {
    "@type": "PostalAddress",
    streetAddress: venueInformation.street,
    addressLocality: venueInformation.city,
    addressRegion: venueInformation.state.toUpperCase(),
    postalCode: String(venueInformation.zipCode),
    addressCountry: "US",
   },
  },
  performer: [
   { "@type": "MusicGroup", name: "Syracuse University Brass Ensemble", url: "https://subrass.syr.edu" },
   { "@type": "MusicGroup", name: "10th Mountain Division Band" },
  ],
  organizer: { "@type": "Organization", name: "Syracuse University Brass Ensemble", url: "https://subrass.syr.edu" },
  isAccessibleForFree: true,
  offers: { "@type": "Offer", url: CANONICAL_URL, price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
 };

 return (
  <Layout>
   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }} />
   <Section>
    <main className={styles.page}>
     <Link className={styles.backLink} href="/concerts">&larr; All concerts</Link>

     <div className={styles.hero}>
      <div className={styles.heroArtwork}>
       <Image
        src={SHOWCASE_IMAGE}
        alt="America 250 concert artwork"
        width={1000}
        height={1271}
        sizes="(min-width: 980px) 36vw, 100vw"
        className={styles.heroImage}
        priority
       />
      </div>
      <div className={styles.heroContent}>
       <p className={styles.eyebrow}>Friday, Nov. 13, 2026 · Hendricks Chapel</p>
       <h1 className={styles.title}>A Celebration of Service, Education, and Musical Excellence</h1>
       <p className={styles.lede}>Featuring the Syracuse University Brass Ensemble and the 10th Mountain Division Band.</p>
       <p className={styles.heroMeta}>Student masterclass 4–5 p.m.<br />Concert 6:30–8 p.m.<br />Free and open to the public.</p>
      </div>
     </div>

     <nav className={styles.quickNav} aria-label="On this page">
      <a href="#details">Concert details</a>
      <a href="#masterclass">Student masterclass</a>
      <a href="#program">Concert program</a>
      <a href="#parking">Parking and access</a>
     </nav>

     <div className={styles.detailsGrid} id="details">
      <div className={styles.detailCard}><h2>Date</h2><p>Friday, Nov. 13, 2026</p></div>
      <div className={styles.detailCard}><h2>Student masterclass</h2><p>4–5 p.m.</p></div>
      <div className={styles.detailCard}><h2>Concert</h2><p>6:30–8 p.m.</p></div>
      <div className={styles.detailCard}>
       <h2>Location</h2>
       <p><Link href={venuePath}>{venue.title}</Link><br />{venueInformation.street}<br />{venueInformation.city}, {venueInformation.state.toUpperCase()} {venueInformation.zipCode}</p>
      </div>
     </div>

     <section className={styles.section}>
      <p className={styles.sectionLead}>Free and open to the public</p>
      <h2>Two ensembles. One landmark celebration.</h2>
      <p>On Friday, Nov. 13, Hendricks Chapel will welcome the Syracuse University Brass Ensemble and the 10th Mountain Division Band for a distinguished musical collaboration commemorating America’s 250th anniversary.</p>
      <p>The program brings together accomplished civilian and military musicians in a shared celebration of service, education, community, and artistic excellence. Each ensemble will present its own performance before joining forces for a powerful finale honoring the nation’s history and those who serve.</p>
      <p>Presented in one of Syracuse University’s most iconic spaces, this special event places music at the heart of the semiquincentennial—connecting generations, institutions, and communities through the enduring traditions of the American concert band.</p>
      <div className={styles.quoteGrid}>
       <blockquote>
        <p>“[Placeholder: A quote about the significance of America’s 250th anniversary, the partnership with the 10th Mountain Division Band, and music’s ability to bring communities together.]”</p>
        <footer><strong>Dr. James T. Spencer</strong><br />Syracuse University Brass Ensemble</footer>
       </blockquote>
       <blockquote>
        <p>“[Placeholder: A quote about military music, service, community engagement, and the opportunity to encourage the next generation of musicians.]”</p>
        <footer><strong>MSG Smicker</strong><br />10th Mountain Division Band</footer>
       </blockquote>
      </div>
     </section>

     <section className={`${styles.section} ${styles.masterclass}`} id="masterclass">
      <p className={styles.sectionLabel}>Student masterclass · 4–5 p.m.</p>
      <h2>Explore a life in music</h2>
      <p>High school musicians are invited to join members of the 10th Mountain Division Band for a conversation about music careers, audition preparation, performance confidence, effective practice methods, and life as a professional military musician.</p>
      <p>Band members will share their musical journeys, offer practical guidance, demonstrate techniques, and answer questions about performance, education, military service, and other music-related career opportunities.</p>
      <Link className={styles.button} href="/concerts/america250/master-class">High school students: learn more and RSVP</Link>
     </section>

     <section className={styles.programSection} id="program">
      <p className={styles.sectionLabel}>Concert · 6:30 p.m.</p>
      <h2>Concert program</h2>
      <div className={styles.programGrid}>
       <article>
        <div className={styles.programNumber} aria-hidden="true">1</div>
        <div>
         <h3>Syracuse University Brass Ensemble</h3>
         <p>SUBE brings together professional-level brass and percussion musicians from Syracuse University, SUNY Upstate Medical University, and communities across Central New York. The ensemble pairs ambitious repertoire with a longstanding commitment to public performance, education, and regional collaboration.</p>
        </div>
       </article>
       <article>
        <div className={styles.programNumber} aria-hidden="true">2</div>
        <div>
         <h3>10th Mountain Division Band</h3>
         <p>Based at Fort Drum, the 10th Mountain Division Band is an ensemble of Soldier-musicians serving the 10th Mountain Division and surrounding communities. Through ceremonial, concert, and educational performances, the band stewards military tradition, builds community, and represents the professionalism of the U.S. Army.</p>
         <a className={styles.cardLink} href="https://home.army.mil/drum/units-tenants/10th-mountain-division-band" target="_blank" rel="noopener noreferrer">
          <span className={styles.cardLinkText}>Visit the 10th Mountain Division Band website</span>
          <span className={styles.cardLinkArrow} aria-hidden="true">&rarr;</span>
         </a>
        </div>
       </article>
      </div>
      <div className={styles.finale}>
       <div className={styles.programNumber} aria-hidden="true">3</div>
       <div>
        <p className={styles.sectionLabel}>Joint finale</p>
        <h3>“Armed Services Salute” and “The Stars and Stripes Forever”</h3>
        <p>The ensembles unite for a stirring conclusion celebrating those who serve and the enduring power of music to bring people together.</p>
       </div>
      </div>
     </section>

     <section className={styles.section} id="parking">
      <h2>Admission, parking, and accommodations</h2>
      <p><strong>The concert is free and open to the public.</strong> No concert registration is required. Registration is requested only for high school musicians attending the student masterclass.</p>
      <p>Public parking is available at the Irving Avenue Garage. Please allow additional time for parking and walking to Hendricks Chapel.</p>
      <p>Questions or accommodation requests? Please contact <a href="mailto:subrass@syr.edu">subrass@syr.edu</a>.</p>
     </section>
    </main>
   </Section>
  </Layout>
 );
}

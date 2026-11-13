import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faCircleInfo, faGraduationCap, faHouse, faLandmark } from "@fortawesome/free-solid-svg-icons";

import EventTools from "../../../components/event-tools";
import America250DayLabel from "../../../components/america250-day-label";
import Layout from "../../../components/layout";
import Section from "../../../components/section";
import { getConcertBySlug } from "../../../lib/api";
import { getVenuePagePath } from "../../../lib/utilities";
import { ensembleReference } from "../../../lib/site-identity";
import styles from "./america250.module.scss";

const CONCERT_SLUG = "celebrate-americas-250th-anniversary-concert";
const CANONICAL_URL = "https://subrass.syr.edu/concerts/america250";
const EVENT_TITLE = "America 250: A Celebration of Service, Education, and Musical Excellence";
const CONCERT_START = "2026-11-13T18:30:00-05:00";
const CONCERT_END = "2026-11-13T20:00:00-05:00";
const SHOWCASE_IMAGE = "/america250/america250--left.jpg";
const EVENT_IMAGES = [
 "https://subrass.syr.edu/america250/seo/america250-concert-16x9.webp",
 "https://subrass.syr.edu/america250/seo/america250-concert-4x3.webp",
 "https://subrass.syr.edu/america250/seo/america250-concert-1x1.webp",
];

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
 const title = "America 250 Concert";
 const socialTitle = "America 250 Concert at Hendricks Chapel";
 const description = "Join the Syracuse University Brass Ensemble and 10th Mountain Division Band for a free America 250 concert Nov. 13, 2026, at Hendricks Chapel.";

 return {
  title,
  description,
  keywords: [
   "America 250 concert",
   "Syracuse University Brass Ensemble",
   "10th Mountain Division Band",
   "Hendricks Chapel concert",
   "Syracuse concerts",
   "free concert Syracuse",
   "America 250 Syracuse",
  ],
  category: "Music",
  alternates: { canonical: CANONICAL_URL },
  robots: {
   index: true,
   follow: true,
   googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
   type: "website",
   locale: "en_US",
   siteName: "Syracuse University Brass Ensemble",
   url: CANONICAL_URL,
   title: socialTitle,
   description,
   images: [{ url: "/america250/seo/america250-concert-16x9.webp", width: 1920, height: 1080, alt: `${EVENT_TITLE} concert artwork` }],
  },
  twitter: { card: "summary_large_image", title: socialTitle, description, images: ["/america250/seo/america250-concert-16x9.webp"] },
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
  "@id": `${CANONICAL_URL}#event`,
  name: EVENT_TITLE,
  url: CANONICAL_URL,
  mainEntityOfPage: CANONICAL_URL,
  description: "A free joint concert by the Syracuse University Brass Ensemble and the 10th Mountain Division Band commemorating America’s 250th anniversary.",
  startDate: CONCERT_START,
  endDate: CONCERT_END,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  image: EVENT_IMAGES,
  inLanguage: "en-US",
  keywords: "America 250, brass ensemble, military band, Syracuse, free concert",
  audience: { "@type": "Audience", audienceType: "General public" },
  location: {
   "@type": "Place",
   "@id": "https://subrass.syr.edu/concerts/venues/hendricks-chapel",
   name: venue.title,
   sameAs: "https://chapel.syracuse.edu/",
   address: {
    "@type": "PostalAddress",
    streetAddress: "121 Crouse Drive",
    addressLocality: "Syracuse",
    addressRegion: "NY",
    postalCode: "13244",
    addressCountry: "US",
   },
  },
  performer: [
   ensembleReference,
   { "@type": "MusicGroup", name: "10th Mountain Division Band", url: "https://home.army.mil/drum/units-tenants/10th-mountain-division-band" },
  ],
  organizer: ensembleReference,
  isAccessibleForFree: true,
  offers: { "@type": "Offer", url: CANONICAL_URL, price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
 };

 const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
   { "@type": "ListItem", position: 1, name: "Home", item: "https://subrass.syr.edu/" },
   { "@type": "ListItem", position: 2, name: "Concerts", item: "https://subrass.syr.edu/concerts" },
   { "@type": "ListItem", position: 3, name: "America 250", item: CANONICAL_URL },
  ],
 };

 return (
  <Layout>
   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }} />
   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
   <Section>
    <main className={styles.page}>
     <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <ol>
       <li>
        <Link className={styles.breadcrumbHome} href="/" aria-label="Home">
         <FontAwesomeIcon icon={faHouse} aria-hidden="true" />
        </Link>
       </li>
       <li><Link href="/concerts">Concerts</Link></li>
       <li><span aria-current="page">America 250</span></li>
      </ol>
     </nav>

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
       <p className={styles.eyebrow}><America250DayLabel /> · Friday, Nov. 13, 2026 · Hendricks Chapel</p>
       <h1 className={styles.title}>A Celebration of Service, Education, and Musical Excellence</h1>
       <p className={styles.lede}>Featuring the Syracuse University Brass Ensemble and the 10th Mountain Division Band.</p>
       <p className={styles.heroMeta}>Musician masterclass <span className={styles.noWrap}>4–5 p.m.</span><br />Concert <span className={styles.noWrap}>6:30–8 p.m.</span><br />Free parking and admission.</p>
       <div className={styles.heroActions}>
        <Link className={styles.button} href="/concerts/america250/parking">Plan your arrival</Link>
        <a className={`${styles.button} ${styles.buttonSecondary}`} href="#details">View the schedule</a>
        <Link className={`${styles.button} ${styles.buttonSecondary}`} href="/concerts/america250/program">View digital program</Link>
       </div>
      </div>
     </div>

     <nav className={styles.quickNav} aria-label="On this page">
      <a href="#details">Event schedule</a>
      <a href="#parking">Parking and arrival</a>
      <a href="#masterclass">Masterclass information</a>
      <a href="#program">Concert program</a>
      <Link href="/concerts/america250/promotions">Share the event</Link>
     </nav>

     <section className={styles.tomorrowGuide} aria-labelledby="tomorrow-heading">
      <div>
       <p className={styles.sectionLabel}><America250DayLabel /> at Hendricks Chapel</p>
       <h2 id="tomorrow-heading">Know before you go</h2>
       <p>Give yourself plenty of time to drive, park in Irving Garage, cross the pedestrian bridge, and walk to Hendricks Chapel. Masterclass participants should arrive around <strong>3:45 p.m.</strong> Concert guests are encouraged to be seated by <strong>6:20 p.m.</strong></p>
       <div className={styles.ensembleNotice}>
        <h3>Syracuse University Brass Ensemble members</h3>
        <p>Ensemble members who are not participating in the masterclass should arrive around <strong>4:50 p.m.</strong> Please bring your instrument, music, and your own music stand. The masterclass will still be in session, so enter Hendricks Chapel quietly and sit in the general audience area. The joint rehearsal with the 10th Mountain Division Band and masterclass participants is scheduled for <strong>5–5:15 p.m.</strong></p>
       </div>
      </div>
      <div className={styles.tomorrowActions}>
       <Link className={styles.button} href="/concerts/america250/parking">Parking and walking directions</Link>
       <a className={styles.textLink} href="https://www.google.com/maps/search/?api=1&amp;query=Irving+Garage%2C+Stadium+Place%2C+Syracuse%2C+NY+13210" target="_blank" rel="noopener noreferrer">Open Irving Garage in maps <span aria-hidden="true">&rarr;</span></a>
      </div>
     </section>


     <section className={styles.scheduleSection} id="details" aria-labelledby="schedule-heading">
      <div className={styles.scheduleHeader}>
       <div>
        <p className={styles.sectionLabel}>Friday, Nov. 13, 2026</p>
        <h2 id="schedule-heading">Event-day schedule</h2>
       </div>
       <p><strong><Link href={venuePath}>{venue.title}</Link></strong><br />{venueInformation.street}<br />{venueInformation.city}, {venueInformation.state.toUpperCase()} {venueInformation.zipCode}</p>
      </div>
      <div className={styles.primarySchedule} aria-label="Main events">
       <article className={styles.primaryEvent}>
        <p className={styles.primaryEventLabel}>Main event</p>
        <h3>Musician Masterclass</h3>
        <p className={styles.primaryEventTime}>4–5 p.m.</p>
        <p>Registered participants should arrive around <strong>3:45 p.m.</strong> Family and friends are welcome to observe from the general audience area.</p>
       </article>
       <article className={styles.primaryEvent}>
        <p className={styles.primaryEventLabel}>Main event</p>
        <h3>America 250 Concert</h3>
        <p className={styles.primaryEventTime}>6:30–8 p.m.</p>
        <p>Concert guests are encouraged to be seated by <strong>6:20 p.m.</strong> The concert is free and open to the public.</p>
       </article>
      </div>
      <div className={styles.secondaryScheduleHeader}>
       <p className={styles.sectionLabel}>For participants and ensemble members</p>
       <h3>Arrival, rehearsal, and preparation</h3>
      </div>
      <div className={styles.scheduleTimeline}>
       <article><time dateTime="2026-11-13T16:50:00-05:00">4:50 p.m.</time><div><h3>Syracuse University Brass Ensemble arrival</h3><p>Members should bring their instruments, music, and their own music stands. Those not participating in the masterclass should enter quietly and sit in the general audience area while the session concludes.</p></div></article>
       <article><time dateTime="2026-11-13T17:00:00-05:00">5 p.m.</time><div><h3>Transition and concert setup</h3><p>After the masterclass, ensemble members will arrange the chairs into concert formation on the main stage and floor stage.</p></div></article>
       <article><time dateTime="2026-11-13T17:00:00-05:00">5–5:15 p.m.</time><div><h3>Joint rehearsal</h3><p>The Syracuse University Brass Ensemble, 10th Mountain Division Band, and masterclass participants will rehearse the two joint finale selections.</p></div></article>
       <article><time dateTime="2026-11-13T17:15:00-05:00">5:15 p.m.</time><div><h3>Dinner break</h3><p>Participants may bring food or join an escorted group walking to the Schine Student Center food court. Those purchasing dinner should plan to bring approximately $15–$30.</p></div></article>
       <article><time dateTime="2026-11-13T18:15:00-05:00">6:15 p.m.</time><div><h3>Return and final concert preparation</h3><p>Musicians should be back in Hendricks Chapel and ready to take their places.</p></div></article>
       <article><time dateTime="2026-11-13T18:20:00-05:00">6:20 p.m.</time><div><h3>Everyone seated and ready</h3><p>Concert guests are encouraged to be seated. Masterclass participants may sit with family and friends until they are called forward for the joint finale.</p></div></article>
      </div>
     </section>

     <div className={styles.introGrid}>
      <section className={styles.section}>
      <p className={styles.sectionLead}>Free and open to the public</p>
      <h2 className={styles.sectionHeading}><FontAwesomeIcon className={styles.sectionHeadingIcon} icon={faLandmark} aria-hidden="true" />Two ensembles. One landmark celebration.</h2>
      <p>On Friday, Nov. 13, Hendricks Chapel will welcome the Syracuse University Brass Ensemble and the 10th Mountain Division Band for a distinguished musical collaboration commemorating America’s 250th anniversary. The event is presented in partnership with Syracuse University’s <a href="https://veterans.syracuse.edu/" target="_blank" rel="noopener noreferrer">Office of Veteran and Military Affairs (OVMA)</a> and <a href="https://chapel.syracuse.edu/" target="_blank" rel="noopener noreferrer">Hendricks Chapel</a>.</p>
      <p>The program brings together accomplished civilian and military musicians in a shared celebration of service, education, community, and artistic excellence. Each ensemble will present its own performance before joining forces for a powerful finale honoring the nation’s history and those who serve.</p>
      <p>Presented in one of Syracuse University’s most iconic spaces, this special event places music at the heart of the semiquincentennial—connecting generations, institutions, and communities through the enduring traditions of the American concert band.</p>
      <div className={styles.quoteGrid}>
       <blockquote>
        <p>“America’s 250th anniversary invites us to reflect not only on the history we have inherited, but also on the communities we continue to build together. By bringing the Syracuse University Brass Ensemble and the 10th Mountain Division Band together in Hendricks Chapel, this concert honors service, education, and music’s enduring power to unite us.”</p>
        <footer><strong>Dr. James T. Spencer</strong><br />Syracuse University Brass Ensemble</footer>
       </blockquote>
      </div>
      </section>

      <section className={styles.partners} aria-labelledby="partners-heading">
       <h2 id="partners-heading">Presented in partnership with</h2>
       <Image
        src="/america250/syracuse-university-ovma-hendricks-chapel.svg"
        alt="Syracuse University Office of Veteran and Military Affairs and Hendricks Chapel"
        width={898}
        height={831}
        sizes="(min-width: 900px) 14rem, 18rem"
        className={styles.partnerLockup}
       />
      </section>
     </div>

     <section className={`${styles.section} ${styles.masterclass}`} id="masterclass">
      <p className={styles.sectionLabel}>Musician masterclass · <span className={styles.noWrap}>4–5 p.m.</span></p>
      <h2 className={styles.sectionHeading}><FontAwesomeIcon className={styles.sectionHeadingIcon} icon={faGraduationCap} aria-hidden="true" />Information for masterclass participants</h2>
      <p>Registered participants should arrive around <strong>3:45 p.m.</strong> Please bring your instrument and any necessary accessories. Sheet music and music stands will be provided, along with a secure area for instrument cases.</p>
      <p>Family and friends are welcome to attend the masterclass and sit in the general audience area. After the masterclass, participants will rehearse the two joint finale selections with the Syracuse University Brass Ensemble and the 10th Mountain Division Band.</p>
      <p>A dinner break will follow the rehearsal. Participants may bring food or join an escorted group walking to the Schine Student Center food court. Those purchasing dinner should plan to bring approximately $15–$30.</p>
      <Link className={styles.textLink} href="/concerts/america250/master-class">View complete masterclass information <span aria-hidden="true">&rarr;</span></Link>
     </section>

     <section className={styles.programSection} id="program">
      <p className={styles.sectionLabel}>Concert · 6:30 p.m.</p>
      <h2 className={styles.sectionHeading}><FontAwesomeIcon className={styles.sectionHeadingIcon} icon={faBookOpen} aria-hidden="true" />Concert program</h2>
      <p className={styles.programIntro}>Explore the complete digital program, including repertoire, leadership, musicians, event acknowledgments, and the joint finale.</p>
      <Link className={styles.button} href="/concerts/america250/program">View the digital concert program</Link>
      <div className={styles.programGrid}>
       <article>
        <Image className={styles.programImage} src="/syracuse-university-brass-ensemble-2025.webp" alt="Members of the Syracuse University Brass Ensemble" width={2400} height={1567} sizes="(min-width: 700px) 36vw, 100vw" />
        <div className={styles.programCardBody}>
         <div className={styles.programNumber} aria-hidden="true">1</div>
         <div>
          <h3>Syracuse University Brass Ensemble</h3>
          <p>SUBE brings together professional-level brass and percussion musicians from Syracuse University, SUNY Upstate Medical University, and communities across Central New York. The ensemble pairs ambitious repertoire with a longstanding commitment to public performance, education, and regional collaboration.</p>
         </div>
        </div>
       </article>
       <article>
        <Image className={styles.programImage} src="/america250/10th-mountain-division-band.jpg" alt="Members of the 10th Mountain Division Band performing" width={2048} height={1640} sizes="(min-width: 700px) 36vw, 100vw" />
        <div className={styles.programCardBody}>
         <div className={styles.programNumber} aria-hidden="true">2</div>
         <div>
          <h3>10th Mountain Division Band</h3>
          <p>Based at Fort Drum, the 10th Mountain Division Band is an ensemble of Soldier-musicians serving the 10th Mountain Division and surrounding communities. Through ceremonial, concert, and educational performances, the band stewards military tradition, builds community, and represents the professionalism of the U.S. Army.</p>
          <a className={styles.cardLink} href="https://home.army.mil/drum/units-tenants/10th-mountain-division-band" target="_blank" rel="noopener noreferrer">
           <span className={styles.cardLinkText}>Visit the 10th Mountain Division Band website</span>
           <span className={styles.cardLinkArrow} aria-hidden="true">&rarr;</span>
          </a>
         </div>
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

     <section className={`${styles.section} ${styles.accessSection}`} id="parking">
      <h2 className={styles.sectionHeading}><FontAwesomeIcon className={styles.sectionHeadingIcon} icon={faCircleInfo} aria-hidden="true" />Parking, arrival, and accommodations</h2>
      <div className={styles.accessGrid}>
       <article className={styles.accessCard}>
        <h3>Concert arrival</h3>
        <p><strong>The concert is free and open to the public.</strong> Doors will be open before the 6:30 p.m. performance. Please plan to be seated by approximately 6:20 p.m.</p>
       </article>
       <article className={styles.accessCard}>
        <h3>Parking</h3>
        <p><strong>Parking is free.</strong> Public parking is available at Irving Garage. Please allow additional time for parking and walking to Hendricks Chapel.</p>
        <Link className={styles.parkingGuideLink} href="/concerts/america250/parking">View parking, accessibility, and drop-off instructions <span aria-hidden="true">&rarr;</span></Link>
        <a className={styles.mapLink} href="https://www.google.com/maps/search/?api=1&amp;query=Irving+Garage%2C+Stadium+Place%2C+Syracuse%2C+NY+13210" target="_blank" rel="noopener noreferrer">
         <strong>Irving Garage</strong>
         <span>Stadium Pl<br />Syracuse, NY 13210</span>
         <span className={styles.mapLinkCta}>Open in maps <span aria-hidden="true">&rarr;</span></span>
        </a>
       </article>
       <article className={styles.accessCard}>
        <h3>Accommodations</h3>
        <p>For accessibility accommodations or questions about attending the event, please contact <a href="mailto:subrass@syr.edu">subrass@syr.edu</a>.</p>
       </article>
      </div>
     </section>
     <EventTools title={EVENT_TITLE} start={CONCERT_START} end={CONCERT_END}
      location="Hendricks Chapel, 121 Crouse Drive, Syracuse, NY 13244" url={CANONICAL_URL}
      admission="Free and open to the public. No concert registration is required."
      parkingText="Free public parking is available at Irving Garage."
      parkingUrl="https://www.google.com/maps/dir/?api=1&destination=Irving+Garage+Syracuse+NY" />
    </main>
   </Section>
  </Layout>
 );
}

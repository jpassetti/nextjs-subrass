import type { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faLocationDot, faMapLocationDot, faSquareParking, faWheelchair } from "@fortawesome/free-solid-svg-icons";

import Breadcrumbs from "../../../../components/breadcrumbs";
import Layout from "../../../../components/layout";
import Section from "../../../../components/section";
import styles from "./parking.module.scss";

const CANONICAL_URL = "https://subrass.syr.edu/concerts/america250/parking";
const PDF_URL = "/america250/pdf/america250--parking-map.pdf";
const GOOGLE_MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Irving+Garage%2C+Stadium+Place%2C+Syracuse%2C+NY+13210";
const APPLE_MAPS_URL = "https://maps.apple.com/?q=Irving%20Garage&address=Stadium%20Place%2C%20Syracuse%2C%20NY%2013210";

export const metadata: Metadata = {
 title: "America 250 Parking and Arrival Guide",
 description: "Free parking, accessible parking, drop-off instructions, and a downloadable map for the America 250 masterclass and concert at Hendricks Chapel.",
 alternates: { canonical: CANONICAL_URL },
 openGraph: {
  type: "website",
  url: CANONICAL_URL,
  title: "America 250 Parking and Arrival Guide",
  description: "Plan your arrival for the free America 250 masterclass and concert at Hendricks Chapel on Nov. 13, 2026.",
  images: [{ url: "/america250/seo/america250-concert-16x9.webp", width: 1920, height: 1080, alt: "America 250 concert artwork" }],
 },
};

export default function America250ParkingPage() {
 const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
   { "@type": "ListItem", position: 1, name: "Home", item: "https://subrass.syr.edu/" },
   { "@type": "ListItem", position: 2, name: "Concerts", item: "https://subrass.syr.edu/concerts" },
   { "@type": "ListItem", position: 3, name: "America 250", item: "https://subrass.syr.edu/concerts/america250" },
   { "@type": "ListItem", position: 4, name: "Parking", item: CANONICAL_URL },
  ],
 };

 return (
  <Layout>
   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
   <Section>
    <main className={styles.page}>
     <Breadcrumbs
      items={[
       { label: "Home", href: "/" },
       { label: "Concerts", href: "/concerts" },
       { label: "America 250", href: "/concerts/america250" },
       { label: "Parking" },
      ]}
     />

     <header className={styles.header}>
      <p className={styles.eyebrow}>America 250 arrival guide</p>
      <h1>Parking for the Masterclass and Concert</h1>
      <p>Masterclass participants, ensemble members, and concert guests should park in <strong>Irving Garage</strong>. Parking is free for this event. Please refer to the accompanying map for the garage entrance and parking attendant locations.</p>
      <div className={styles.primaryActions}>
       <a className={styles.primaryButton} href={PDF_URL} target="_blank" rel="noopener noreferrer">View parking map and instructions (PDF)</a>
       <Link className={styles.secondaryButton} href="/concerts/america250">Return to event details</Link>
      </div>
     </header>

     <aside className={styles.arrivalNote} aria-label="Arrival recommendation">
      <strong>Please allow extra time.</strong>
      <span>Plan for parking, crossing the pedestrian bridge, and walking to Hendricks Chapel before the masterclass or concert begins.</span>
     </aside>

     <div className={styles.instructionsGrid}>
      <section className={styles.instructionCard} aria-labelledby="garage-heading">
       <span className={styles.cardIcon} aria-hidden="true"><FontAwesomeIcon icon={faSquareParking} /></span>
       <p className={styles.stepLabel}>General parking</p>
       <h2 id="garage-heading">Irving Garage</h2>
       <ol>
        <li><strong>Enter the garage</strong> from Stadium Place, a one-way street.</li>
        <li><strong>Follow the spiral ramp</strong> toward the upper levels. Parking near the top provides the easiest access to the pedestrian bridge to campus.</li>
        <li>If you park on a lower level, <strong>take the elevator or stairs to the top level</strong>.</li>
        <li><strong>Cross the pedestrian bridge</strong> to campus.</li>
        <li><strong>Take a left and walk up the stairs</strong> along the Falk College of Sport.</li>
        <li>At the top of the stairs, <strong>turn right</strong> and <strong>continue to Hendricks Chapel</strong>.</li>
       </ol>
       <div className={styles.addressRow}>
        <span className={styles.cardIcon} aria-hidden="true"><FontAwesomeIcon icon={faMapLocationDot} /></span>
        <div>
         <address>Irving Garage<br />Stadium Place<br />Syracuse, NY 13210</address>
         <div className={styles.mapActions}>
          <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer">Google Maps</a>
          <a href={APPLE_MAPS_URL} target="_blank" rel="noopener noreferrer">Apple Maps</a>
         </div>
        </div>
       </div>
      </section>

      <section className={styles.instructionCard} aria-labelledby="accessible-heading">
       <span className={styles.cardIcon} aria-hidden="true"><FontAwesomeIcon icon={faWheelchair} /></span>
       <p className={styles.stepLabel}>Accessible parking</p>
       <h2 id="accessible-heading">Parking Near Hendricks Chapel</h2>
       <p>Accessible parking is available on main campus next to Hendricks Chapel. Drive up <strong>South Crouse Avenue</strong> toward the Chapel.</p>
       <p>At the parking attendant booths marked on the map, let the attendants know you are attending the <strong>America 250 masterclass and concert</strong> and need accessible parking.</p>
      </section>

      <section className={styles.instructionCard} aria-labelledby="dropoff-heading">
       <span className={styles.cardIcon} aria-hidden="true"><FontAwesomeIcon icon={faLocationDot} /></span>
       <p className={styles.stepLabel}>Passenger and equipment drop-off</p>
       <h2 id="dropoff-heading">Drop Off at Hendricks Chapel</h2>
       <p>Drive up <strong>South Crouse Avenue</strong> toward Hendricks Chapel. Tell the parking attendants that you are dropping off passengers or equipment and will then turn around and park in Irving Garage.</p>
      </section>
     </div>

     <section className={styles.help} aria-labelledby="help-heading">
      <div className={styles.helpIntro}>
       <span className={styles.cardIcon} aria-hidden="true"><FontAwesomeIcon icon={faCircleInfo} /></span>
       <div>
        <p className={styles.stepLabel}>Questions or accommodations</p>
        <h2 id="help-heading">Need Assistance?</h2>
        <p>For parking questions or accessibility accommodations, contact the Syracuse University Brass Ensemble before the event.</p>
       </div>
      </div>
      <a href="mailto:subrass@syr.edu">subrass@syr.edu</a>
     </section>
    </main>
   </Section>
  </Layout>
 );
}

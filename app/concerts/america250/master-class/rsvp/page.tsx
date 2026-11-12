import type { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

import Heading from "../../../../../components/heading";
import Layout from "../../../../../components/layout";
import Paragraph from "../../../../../components/paragraph";
import Section from "../../../../../components/section";
import styles from "../../../../master-class/master-class.module.scss";

export const metadata: Metadata = {
 title: "Registration Closed | America 250 Musician Master Class",
 description: "Online registration is closed for the America 250 musician master class with members of the 10th Mountain Division Band.",
 alternates: { canonical: "https://subrass.syr.edu/concerts/america250/master-class/rsvp" },
 robots: { index: false, follow: true },
};

export default function MasterClassRsvpPage() {
 return (
  <Layout>
   <Section>
    <div className={styles.content}>
     <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <ol>
       <li><Link className={styles.breadcrumbHome} href="/" aria-label="Home"><FontAwesomeIcon icon={faHouse} aria-hidden="true" /></Link></li>
       <li><Link href="/concerts">Concerts</Link></li>
       <li><Link href="/concerts/america250">America 250</Link></li>
       <li><Link href="/concerts/america250/master-class">Masterclass</Link></li>
       <li><span aria-current="page">RSVP</span></li>
      </ol>
     </nav>
     <Heading level={1} marginTop="4" marginBottom="4">Masterclass Registration Is Closed</Heading>
     <Paragraph type="intro" marginBottom="4">
      Thank you for your interest. Online registration for the musician masterclass is now closed.
     </Paragraph>
     <Paragraph marginBottom="3">If you have a question about participating, please email <a href="mailto:subrass@syr.edu">subrass@syr.edu</a>. Family and friends are welcome to attend the masterclass as audience members, and the 6:30 p.m. concert is open to the public.</Paragraph>
     <Paragraph><Link href="/concerts/america250">View the event schedule and arrival information</Link></Paragraph>
    </div>
   </Section>
  </Layout>
 );
}

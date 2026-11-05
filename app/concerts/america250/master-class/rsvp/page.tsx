import type { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

import Heading from "../../../../../components/heading";
import Layout from "../../../../../components/layout";
import Paragraph from "../../../../../components/paragraph";
import Section from "../../../../../components/section";
import RegistrationOptions from "../../../../master-class/registration-options";
import styles from "../../../../master-class/master-class.module.scss";

export const metadata: Metadata = {
 title: "RSVP | America 250 Musician Master Class",
 description: "High school, college, and community musicians can RSVP for the free America 250 master class with members of the 10th Mountain Division Band.",
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
     <Heading level={1} marginTop="4" marginBottom="4">Musician Master Class RSVP</Heading>
     <Paragraph type="intro" marginBottom="4">
      This free master class welcomes high school students, college musicians, and adult musicians from community ensembles and across the region. Students and parents may register one high school student, music educators may register multiple high school students, and college and community musicians age 18 and older may register themselves. The evening concert is free and open to the public, and parking is free.
     </Paragraph>
     <p className={styles.small}>Fields marked with an asterisk (*) are required.</p>
     <RegistrationOptions />
    </div>
   </Section>
  </Layout>
 );
}

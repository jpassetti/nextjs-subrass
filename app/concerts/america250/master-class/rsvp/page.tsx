import type { Metadata } from "next";
import Link from "next/link";

import Heading from "../../../../../components/heading";
import Layout from "../../../../../components/layout";
import Paragraph from "../../../../../components/paragraph";
import Section from "../../../../../components/section";
import RegistrationForm from "../../../../master-class/registration-form";
import styles from "../../../../master-class/master-class.module.scss";

export const metadata: Metadata = {
 title: "RSVP | America 250 High School Master Class",
 description: "Students in grades 9–12 can RSVP for the America 250 master class with members of the 10th Mountain Division Band.",
 alternates: { canonical: "https://subrass.syr.edu/concerts/america250/master-class/rsvp" },
};

export default function MasterClassRsvpPage() {
 return (
  <Layout>
   <Section>
    <div className={styles.content}>
     <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <ol>
       <li><Link href="/">Home</Link></li>
       <li><Link href="/concerts">Concerts</Link></li>
       <li><Link href="/concerts/america250">America 250</Link></li>
       <li><Link href="/concerts/america250/master-class">Masterclass</Link></li>
       <li><span aria-current="page">RSVP</span></li>
      </ol>
     </nav>
     <Heading level={1} marginTop="4" marginBottom="4">High School Master Class RSVP</Heading>
     <Paragraph type="intro" marginBottom="4">
      This free master class and RSVP are exclusively for students currently enrolled in grades 9–12. Complete the form below to reserve your place. The evening concert is free and open to the public, and parking is free.
     </Paragraph>
     <p className={styles.small}>Fields marked with an asterisk (*) are required.</p>
     <RegistrationForm />
    </div>
   </Section>
  </Layout>
 );
}

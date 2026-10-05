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
     <p className={styles.small}><Link href="/concerts/america250/master-class">&larr; Master class details</Link></p>
     <Heading level={1} marginTop="4" marginBottom="4">High School Master Class RSVP</Heading>
     <Paragraph type="intro" marginBottom="4">
      This master class and RSVP are exclusively for students currently enrolled in grades 9–12. Complete the form below to reserve your place.
     </Paragraph>
     <p className={styles.small}>Fields marked with an asterisk (*) are required.</p>
     <RegistrationForm />
    </div>
   </Section>
  </Layout>
 );
}

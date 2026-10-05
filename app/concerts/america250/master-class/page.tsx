import type { Metadata } from "next";
import Link from "next/link";

import Heading from "../../../../components/heading";
import Layout from "../../../../components/layout";
import Section from "../../../../components/section";
import styles from "./master-class.module.scss";

const CANONICAL_URL = "https://subrass.syr.edu/concerts/america250/master-class";

export const metadata: Metadata = {
 title: "High School Master Class | America 250",
 description: "High school musicians are invited to a free master class with members of the 10th Mountain Division Band at Hendricks Chapel.",
 alternates: { canonical: CANONICAL_URL },
};

export default function America250MasterClassPage() {
 return (
  <Layout>
   <Section>
    <main className={styles.page}>
     <Link className={styles.backLink} href="/concerts/america250">&larr; America 250 concert</Link>

     <header className={styles.hero}>
      <p className={styles.eyebrow}>Free high school student master class</p>
      <Heading level={1} marginTop="0" marginBottom="3">Explore a Life in Music</Heading>
      <p className={styles.lede}>Meet members of the 10th Mountain Division Band and discover how preparation, performance, education, and service can shape a professional life in music.</p>
      <Link className={styles.button} href="/concerts/america250/master-class/rsvp">RSVP for the master class</Link>
     </header>

     <div className={styles.detailsGrid}>
      <div><span>Date</span><strong>Friday, Nov. 13, 2026</strong></div>
      <div><span>Time</span><strong>4–5 p.m.</strong></div>
      <div><span>Location</span><strong><Link href="/concerts/venues/hendricks-chapel">Hendricks Chapel</Link></strong></div>
      <div><span>Eligibility</span><strong>Students in grades 9–12</strong></div>
     </div>

     <section className={styles.section}>
      <Heading level={2} marginTop="0" marginBottom="2">Learn from Soldier-Musicians</Heading>
      <p>Members of the 10th Mountain Division Band will share their musical journeys and offer practical guidance for students considering their next steps in music. The hour is designed to be conversational, useful, and encouraging—whether a student plans to study music, pursue performance, or simply become a stronger and more confident musician.</p>
      <p>Students will have an opportunity to ask questions and learn directly from professional musicians whose work brings together artistry, leadership, community engagement, and military service.</p>
     </section>

     <section className={styles.expectSection}>
      <Heading level={2} marginTop="0" marginBottom="2">What Students Can Expect</Heading>
      <div className={styles.topicGrid}>
       <article><h3>Preparation</h3><p>Strategies for effective practice, audition preparation, and developing confidence under pressure.</p></article>
       <article><h3>Performance</h3><p>Professional insight, demonstrations, and techniques students can carry into rehearsals and performances.</p></article>
       <article><h3>Music Careers</h3><p>An open conversation about education, military music, professional opportunities, and building a sustainable musical life.</p></article>
      </div>
     </section>

     <section className={styles.rsvpCallout}>
      <div>
       <p className={styles.eyebrow}>Space is intended for high school musicians</p>
       <Heading level={2} color="white" marginTop="0" marginBottom="2">Reserve Your Place</Heading>
       <p>The master class is free, but students in grades 9–12 should RSVP in advance. The evening America 250 concert is free and open to everyone; no concert registration is required.</p>
      </div>
      <Link className={styles.button} href="/concerts/america250/master-class/rsvp">Complete the student RSVP</Link>
     </section>
    </main>
   </Section>
  </Layout>
 );
}

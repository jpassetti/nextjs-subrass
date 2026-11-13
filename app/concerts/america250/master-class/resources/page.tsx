import type { Metadata } from "next";
import Link from "next/link";

import Breadcrumbs from "../../../../../components/breadcrumbs";
import Layout from "../../../../../components/layout";
import Section from "../../../../../components/section";
import ReflectionNotesForm from "./reflection-notes";
import styles from "./resources.module.scss";

const CANONICAL_URL = "https://subrass.syr.edu/concerts/america250/master-class/resources";

export const metadata: Metadata = {
 title: "America 250 Masterclass Resources",
 description: "Practice ideas, listening prompts, shared materials, and reflection notes from the America 250 musician masterclass at Hendricks Chapel.",
 alternates: { canonical: CANONICAL_URL },
 robots: { index: true, follow: true },
 openGraph: {
  type: "website",
  url: CANONICAL_URL,
  title: "Keep the Music Going | America 250 Masterclass Resources",
  description: "Revisit ideas from the America 250 musician masterclass and bring something new into your next practice session.",
  images: [{ url: "/america250/seo/america250-concert-16x9.webp", width: 1920, height: 1080, alt: "America 250 concert artwork" }],
 },
};

const practiceIdeas = [
 { title: "Start with a purpose.", text: "Decide what you want to improve before you begin." },
 { title: "Work in small sections.", text: "Give a difficult phrase focused attention." },
 { title: "Listen back.", text: "Record a short passage and identify one thing to work on." },
 { title: "Practice the performance.", text: "Play through a section without stopping, then reflect." },
 { title: "Write it down.", text: "Keep track of what helped and what you want to try next." },
];

export default function America250MasterclassResourcesPage() {
 const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
   { "@type": "ListItem", position: 1, name: "Home", item: "https://subrass.syr.edu/" },
   { "@type": "ListItem", position: 2, name: "Concerts", item: "https://subrass.syr.edu/concerts" },
   { "@type": "ListItem", position: 3, name: "America 250", item: "https://subrass.syr.edu/concerts/america250" },
   { "@type": "ListItem", position: 4, name: "Masterclass", item: "https://subrass.syr.edu/concerts/america250/master-class" },
   { "@type": "ListItem", position: 5, name: "Resources", item: CANONICAL_URL },
  ],
 };

 const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "America 250 Masterclass Resources",
  url: CANONICAL_URL,
  description: metadata.description,
  isPartOf: { "@id": "https://subrass.syr.edu/concerts/america250#event" },
 };

 return (
  <Layout>
   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }} />
   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema).replace(/</g, "\\u003c") }} />
   <Section>
    <main className={styles.page}>
     <Breadcrumbs items={[
      { label: "Home", href: "/" },
      { label: "Concerts", href: "/concerts" },
      { label: "America 250", href: "/concerts/america250" },
      { label: "Masterclass", href: "/concerts/america250/master-class" },
      { label: "Resources" },
     ]} />

     <header className={styles.hero}>
      <p className={styles.eyebrow}>America 250 Masterclass · November 13, 2026</p>
      <h1>Keep the Music Going</h1>
      <p className={styles.ensembles}>10th Mountain Division Band &amp; SU Brass Ensemble</p>
      <p className={styles.lede}>Today’s session is a starting point. Use this page to revisit ideas, explore recommendations, and bring something new into your practice.</p>
      <div className={styles.heroActions}>
       <a href="#resources">Explore resources</a>
       <a href="#reflection">Write down an idea</a>
      </div>
     </header>

     <nav className={styles.pageNav} aria-label="On this page">
      <a href="#resources">Resource collection</a>
      <a href="#practice">Practice ideas</a>
      <a href="#listening">Listening</a>
      <a href="#reflection">Notes to take home</a>
     </nav>

     <section className={styles.resourcesSection} id="resources" aria-labelledby="resources-heading">
      <p className={styles.sectionLabel}>Return and explore</p>
      <h2 id="resources-heading">Your Masterclass Resource Collection</h2>
      <p className={styles.sectionIntro}>Visit again after the masterclass for shared materials and recommendations as they become available.</p>
      <div className={styles.resourceGrid}>
       <article>
        <p className={styles.resourceStatus}>Materials will be added here</p>
        <h3>Exercises &amp; Handouts</h3>
        <p>Technique exercises, warmups, worksheets, and materials shared by participating musicians.</p>
       </article>
       <article>
        <p className={styles.resourceStatus}>Recommendations coming soon</p>
        <h3>Recordings &amp; Videos</h3>
        <p>Performances, demonstrations, interviews, and listening recommendations worth revisiting.</p>
       </article>
       <article>
        <p className={styles.resourceStatus}>Recommendations coming soon</p>
        <h3>Books &amp; Practice Advice</h3>
        <p>Suggested reading, practice strategies, audition guidance, and ideas for continued growth.</p>
       </article>
      </div>
     </section>

     <section className={styles.practiceSection} id="practice" aria-labelledby="practice-heading">
      <div className={styles.sectionHeadingGroup}>
       <p className={styles.sectionLabel}>Put learning into action</p>
       <h2 id="practice-heading">Bring One Idea Into Your Next Practice Session</h2>
       <p>Choose something you heard today and try it with a specific goal.</p>
      </div>
      <ol className={styles.practiceGrid}>
       {practiceIdeas.map((idea, index) => (
        <li key={idea.title}>
         <span aria-hidden="true">{index + 1}</span>
         <div><h3>{idea.title}</h3><p>{idea.text}</p></div>
        </li>
       ))}
      </ol>
     </section>

     <section className={styles.listeningSection} id="listening" aria-labelledby="listening-heading">
      <p className={styles.sectionLabel}>Explore beyond today</p>
      <h2 id="listening-heading">Listen With Curiosity</h2>
      <p>Choose a piece you enjoyed today. Find another performance and notice differences in tempo, phrasing, balance, and sound. Learn about the composer, then explore someone who influenced them.</p>
      <p>For future concerts and ensemble information, visit <Link href="/">subrass.syr.edu</Link>.</p>
     </section>

     <section className={styles.reflectionSection} id="reflection" aria-labelledby="reflection-heading">
      <div className={styles.sectionHeadingGroup}>
       <p className={styles.sectionLabel}>Personal reflection</p>
       <h2 id="reflection-heading">Notes to Take Home</h2>
       <p>Capture a few ideas while they are fresh. Your entries will stay on this device so you can return to them later.</p>
      </div>
      <ReflectionNotesForm />
     </section>

     <footer className={styles.pageFooter}>
      <p>Keep listening, keep practicing, and stay curious about where music can take you.</p>
      <div>
       <Link href="/concerts/america250">America 250 event details</Link>
       <Link href="/concerts/america250/program">Digital concert program</Link>
      </div>
     </footer>
    </main>
   </Section>
  </Layout>
 );
}

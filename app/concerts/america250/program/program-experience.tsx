"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { isGraduateOfSyracuseUniversity, truncateGraduationYear } from "../../../../lib/utilities";
import styles from "./program.module.scss";

type ProgramPiece = {
 title: string;
 composer?: string;
 credit?: string;
 note?: string;
 noteLink?: { label: string; href: string };
};

export type LeadershipProfile = {
 name: string;
 role: string;
 slug: string;
 image: {
  src: string;
  alt: string;
  width: number;
  height: number;
 } | null;
};

type RosterMusician = {
 slug?: string;
 featuredImage?: {
  node?: {
   sourceUrl?: string;
   altText?: string;
   mediaDetails?: { width?: number; height?: number };
  };
 };
 personInformation?: {
  prefix?: string;
  firstName?: string;
  middleInitial?: string;
  lastName?: string;
  suffix?: string;
  education?: Array<{
   university?: string;
   graduationYear?: string;
   degreeType?: string;
  }>;
  work?: Array<{
   companyName?: string;
   jobTitle?: string;
  }>;
 };
 [key: string]: unknown;
};

type ProgramEnsemble = {
 ensembleInformation?: {
  conductor?: RosterMusician[];
  instruments?: Array<{
   instrument?: { id?: string; name?: string };
   musicians?: RosterMusician[];
  }>;
 };
} | null;

const subePieces: ProgramPiece[] = [
 { title: "Fanfare for the Common Man", composer: "Aaron Copland" },
 { title: "Finale from Symphony No. 4", composer: "Pyotr Ilyich Tchaikovsky", credit: "Arranged by James T. Spencer" },
 { title: "Excerpts from Mass", composer: "Leonard Bernstein", credit: "Arranged by Craig R. Elwood" },
 { title: "Freedom", composer: "Michael W. Smith", credit: "Arranged by Craig R. Elwood" },
 {
  title: "Liberty Fanfare",
  composer: "John Williams",
  credit: "Arranged by Steven Sykes",
  note: "Narrated by WCNY’s ",
  noteLink: { label: "Bruce Paulsen.", href: "https://www.wcny.org/radio/meet-the-hosts/" },
 },
];

const combinedPieces: ProgramPiece[] = [
 { title: "Armed Services Salute", credit: "Adapted by Michael Brown, Owen Eddy, and John Skillman" },
 { title: "The Stars and Stripes Forever", composer: "John Philip Sousa" },
];

const programChapters = [
 { id: "overview", label: "Overview" },
 { id: "opening", label: "National Anthem" },
 { id: "sube-selections", label: "SU Brass" },
 { id: "tenth-mountain", label: "10th Mountain" },
 { id: "joint-finale", label: "Joint Finale" },
 { id: "sponsors", label: "Thank You" },
];

const sectionAnimation = {
 hidden: { opacity: 0, y: 36 },
 visible: { opacity: 1, y: 0 },
};

function rosterName(musician: RosterMusician) {
 const person = musician.personInformation;
 if (!person) return "Ensemble musician";
 const middleInitial = person.middleInitial ? `${person.middleInitial.replace(/\.$/, "")}.` : "";
 const name = [person.prefix, person.firstName, middleInitial, person.lastName].filter(Boolean).join(" ");
 const titledName = person.suffix ? `${name}, ${person.suffix}` : name;
 const graduationYears = (person.education ?? [])
  .filter((education) => education.university && isGraduateOfSyracuseUniversity(education.university) && education.graduationYear)
  .map((education) => truncateGraduationYear(education.graduationYear, education.degreeType))
  .join(", ");
 return graduationYears ? `${titledName} ${graduationYears}` : titledName;
}

function rosterJobTitles(musician: RosterMusician) {
 return [...new Set((musician.personInformation?.work ?? [])
  .filter((job) => job.companyName === "Syracuse University" && job.jobTitle)
  .map((job) => job.jobTitle as string))].join(", ");
}

function PieceList({ pieces }: { pieces: ProgramPiece[] }) {
 const reduceMotion = useReducedMotion();

 return (
  <motion.ol
   className={styles.pieceList}
   initial="hidden"
   whileInView="visible"
   viewport={{ once: true, amount: 0.15 }}
   variants={{
    hidden: {},
    visible: { transition: reduceMotion ? {} : { staggerChildren: 0.1, delayChildren: 0.12 } },
   }}
  >
   {pieces.map((piece) => (
    <motion.li
     className={styles.piece}
     key={piece.title}
     variants={reduceMotion ? undefined : sectionAnimation}
     transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
     <div>
      <h3>{piece.title}</h3>
      {piece.composer ? <p className={styles.composer}>{piece.composer}</p> : null}
      {piece.credit ? <p className={styles.credit}>{piece.credit}</p> : null}
      {piece.note ? (
       <p className={styles.note}>
        {piece.note}
        {piece.noteLink ? <a href={piece.noteLink.href} target="_blank" rel="noopener noreferrer">{piece.noteLink.label}</a> : null}
       </p>
      ) : null}
     </div>
    </motion.li>
   ))}
  </motion.ol>
 );
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
 const reduceMotion = useReducedMotion();

 return (
  <motion.div
   className={className}
   initial={reduceMotion ? false : "hidden"}
   whileInView="visible"
   viewport={{ once: true, amount: 0.2 }}
   variants={sectionAnimation}
   transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
  >
   {children}
  </motion.div>
 );
}

type ProgramTab = {
 id: string;
 label: string;
 content: React.ReactNode;
};

function ProgramTabs({ label, tabs }: { label: string; tabs: ProgramTab[] }) {
 const [activeTab, setActiveTab] = useState(tabs[0].id);
 const groupId = useId();
 const reduceMotion = useReducedMotion();
 const currentTab = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

 function selectAdjacentTab(direction: 1 | -1) {
  const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
  const nextIndex = (currentIndex + direction + tabs.length) % tabs.length;
  setActiveTab(tabs[nextIndex].id);
  document.getElementById(`${groupId}-tab-${tabs[nextIndex].id}`)?.focus();
 }

 return (
  <div className={styles.tabs}>
   <div className={styles.tabList} role="tablist" aria-label={label}>
    {tabs.map((tab) => {
     const selected = tab.id === activeTab;
     return (
      <button
       aria-controls={`${groupId}-panel-${tab.id}`}
       aria-selected={selected}
       className={selected ? styles.activeTab : undefined}
       id={`${groupId}-tab-${tab.id}`}
       key={tab.id}
       onClick={() => setActiveTab(tab.id)}
       onKeyDown={(event) => {
        if (event.key === "ArrowRight") selectAdjacentTab(1);
        if (event.key === "ArrowLeft") selectAdjacentTab(-1);
       }}
       role="tab"
       tabIndex={selected ? 0 : -1}
       type="button"
      >
       {tab.label}
      </button>
     );
    })}
   </div>
   <AnimatePresence mode="wait" initial={false}>
    <motion.div
     aria-labelledby={`${groupId}-tab-${currentTab.id}`}
     className={styles.tabPanel}
     id={`${groupId}-panel-${currentTab.id}`}
     key={currentTab.id}
     role="tabpanel"
     initial={reduceMotion ? false : { opacity: 0, y: 12 }}
     animate={{ opacity: 1, y: 0 }}
     exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
     transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
     {currentTab.content}
    </motion.div>
   </AnimatePresence>
  </div>
 );
}

export default function ProgramExperience({ leadership, ensemble }: { leadership: LeadershipProfile[]; ensemble: ProgramEnsemble }) {
 const [activeSection, setActiveSection] = useState("");
 const conductors = (ensemble?.ensembleInformation?.conductor ?? []).filter((musician) => musician?.personInformation);
 const rosterSections = ensemble?.ensembleInformation?.instruments ?? [];

 useEffect(() => {
  const sections = programChapters
   .map((chapter) => document.getElementById(chapter.id))
   .filter((section): section is HTMLElement => Boolean(section));
  const observer = new IntersectionObserver((entries) => {
   const visibleSection = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
   if (visibleSection) setActiveSection(visibleSection.target.id);
  }, { rootMargin: "-12% 0px -68% 0px", threshold: [0, .01, .1, .25] });

  sections.forEach((section) => observer.observe(section));
  return () => observer.disconnect();
 }, []);

 return (
  <main className={styles.program}>
   <nav className={styles.programNav} aria-label="Event program chapters">
    {programChapters.map((chapter) => (
     <a
      className={activeSection === chapter.id ? styles.activeChapter : undefined}
      href={`#${chapter.id}`}
      key={chapter.id}
      onClick={() => setActiveSection(chapter.id)}
      aria-current={activeSection === chapter.id ? "location" : undefined}
     >
      {chapter.label}
     </a>
    ))}
   </nav>
   <section className={`${styles.panel} ${styles.cover}`} id="program-top" aria-labelledby="program-title">
    <div className={styles.coverTexture} aria-hidden="true" />
    <Image
     className={styles.flagCap}
     src="/america250/branding/american-flag--bottom-cap-v2.svg"
     alt=""
     width={1008}
     height={262}
     sizes="100vw"
     priority
     aria-hidden="true"
    />
    <Reveal className={styles.coverContent}>
     <div className={styles.coverBrand}>
      <Image
       className={styles.coverSuLogo}
       src="/america250/branding/syracuse-university.svg"
       alt="Syracuse University"
       width={790}
       height={270}
       sizes="16rem"
       priority
      />
      <h1 id="program-title" className={styles.wordmarkTitle}>
       <Image
        className={styles.wordmark}
        src="/america250/branding/america250-concert-wordmark--white.svg"
        alt="America 250 Concert"
        width={466}
        height={579}
        priority
       />
      </h1>
     </div>
     <div className={styles.coverInfo}>
      <p className={styles.coverTheme}>A Celebration of Service,<br />Education and Musical Excellence</p>
      <div className={styles.coverRule} aria-hidden="true" />
      <p className={styles.coverFeaturing}>Featuring the <strong>Syracuse University Brass Ensemble</strong> and the <strong>10th Mountain Division Band</strong></p>
      <p className={styles.coverDetails}><strong>Friday, Nov. 13, 2026</strong><br /><strong>Hendricks Chapel</strong></p>
      <a className={styles.scrollCue} href="#overview">
       Explore the program <span aria-hidden="true">↓</span>
      </a>
     </div>
    </Reveal>
   </section>

   <section className={`${styles.panel} ${styles.overview}`} id="overview" aria-labelledby="overview-heading">
    <div className={styles.overviewGrid}>
     <Reveal className={styles.sectionIntro}>
      <p className={styles.sectionNumber}>01</p>
      <p className={styles.sectionLabel}>America 250 Concert</p>
      <h2 id="overview-heading">About the Concert</h2>
     </Reveal>
     <Reveal className={styles.overviewCopy}>
      <p>The Syracuse University Brass Ensemble and the 10th Mountain Division Band come together at Hendricks Chapel for a special concert commemorating the 250th anniversary of the United States.</p>
      <p>This collaboration celebrates service, education, community, and musical excellence while bringing civilian and military musicians together through a shared performance.</p>
      <dl className={styles.overviewDetails}>
       <div><dt>Date</dt><dd>Friday, Nov. 13, 2026</dd></div>
       <div><dt>Time</dt><dd>6:30 p.m.</dd></div>
       <div><dt>Location</dt><dd>Hendricks Chapel</dd></div>
      </dl>
     </Reveal>
    </div>
   </section>

   <section className={`${styles.panel} ${styles.opening}`} id="opening" aria-labelledby="opening-heading">
    <Reveal className={styles.sectionContent}>
     <p className={styles.sectionNumber}>02</p>
     <p className={styles.sectionLabel}>Opening</p>
     <h2 id="opening-heading">The National Anthem</h2>
     <div className={styles.featuredPiece}>
      <h3>“The Star-Spangled Banner”</h3>
      <p>Music by John Stafford Smith</p>
      <p>Arranged by Sean O’Loughlin</p>
     </div>
    </Reveal>
   </section>

   <section className={`${styles.panel} ${styles.sube}`} id="sube-selections" aria-labelledby="sube-heading">
    <div className={styles.sectionContentWide}>
     <Reveal className={styles.sectionIntro}>
      <p className={styles.sectionNumber}>03</p>
      <p className={styles.sectionLabel}>Featured ensemble</p>
      <h2 id="sube-heading" className={styles.ensembleHeading}>Syracuse University Brass Ensemble</h2>
     </Reveal>
     <ProgramTabs
      label="Syracuse University Brass Ensemble program information"
      tabs={[
       { id: "selections", label: "Selections", content: <PieceList pieces={subePieces} /> },
       {
        id: "leadership",
        label: "Leadership",
        content: (
         <div className={styles.leadershipPanel}>
          <p className={styles.tabEyebrow}>Ensemble leadership</p>
          <div className={styles.leadershipGrid}>
           {leadership.map((leader) => (
            <article className={styles.leaderCard} key={leader.slug}>
             <Link className={styles.leaderImageLink} href={`/about/musicians/${leader.slug}`}>
              {leader.image ? (
               <Image
                className={styles.leaderImage}
                src={leader.image.src}
                alt={leader.image.alt}
                width={leader.image.width}
                height={leader.image.height}
                sizes="(min-width: 900px) 12rem, (min-width: 560px) 30vw, 50vw"
               />
              ) : <span className={styles.imagePlaceholder} aria-hidden="true"><FontAwesomeIcon icon={faUser} /></span>}
             </Link>
             <div className={styles.leaderDetails}>
              <h3><Link href={`/about/musicians/${leader.slug}`}>{leader.name}</Link></h3>
              <p className={styles.personTitle}>{leader.role}</p>
             </div>
            </article>
           ))}
          </div>
         </div>
        ),
       },
       {
        id: "musicians",
        label: "Musicians",
        content: (
         <div className={styles.rosterPanel}>
          <div className={styles.rosterIntro}>
           <p className={styles.tabEyebrow}>2026–27 Ensemble</p>
           <Link href="/ensembles/2026-27">View the full ensemble page</Link>
          </div>
          {conductors.length > 0 ? (
           <section className={styles.rosterSection}>
            <h3>Conductors</h3>
            <div className={styles.rosterGrid}>
             {conductors.map((musician, musicianIndex) => (
              <article className={styles.leaderCard} key={musician.slug ?? `conductor-${musicianIndex}`}>
               <Link className={styles.leaderImageLink} href={`/about/musicians/${musician.slug}`}>
                {musician.featuredImage?.node?.sourceUrl ? (
                 <Image
                  className={styles.leaderImage}
                  src={musician.featuredImage.node.sourceUrl}
                  alt={musician.featuredImage.node.altText || `Portrait of ${rosterName(musician)}`}
                  width={musician.featuredImage.node.mediaDetails?.width || 400}
                  height={musician.featuredImage.node.mediaDetails?.height || 400}
                  sizes="(min-width: 900px) 6rem, 5rem"
                 />
                ) : <span className={styles.imagePlaceholder} aria-hidden="true"><FontAwesomeIcon icon={faUser} /></span>}
               </Link>
               <div className={styles.leaderDetails}>
                <h3><Link href={`/about/musicians/${musician.slug}`}>{rosterName(musician)}</Link></h3>
                {rosterJobTitles(musician) ? <p className={styles.personTitle}>{rosterJobTitles(musician)}</p> : null}
               </div>
              </article>
             ))}
            </div>
           </section>
          ) : null}
          {rosterSections.map((section, sectionIndex) => {
           const instrumentName = section.instrument?.name ?? "";
           const musicians = (section.musicians ?? []).filter((musician) => musician?.personInformation);
           if (!instrumentName || musicians.length === 0) return null;

           return (
            <section className={styles.rosterSection} key={section.instrument?.id ?? `${instrumentName}-${sectionIndex}`}>
             <h3>{instrumentName}{instrumentName !== "Percussion" ? "s" : ""}</h3>
             <div className={styles.rosterGrid}>
              {musicians.map((musician, musicianIndex) => (
               <article className={styles.leaderCard} key={musician.slug ?? `${instrumentName}-${musicianIndex}`}>
                <Link className={styles.leaderImageLink} href={`/about/musicians/${musician.slug}`}>
                 {musician.featuredImage?.node?.sourceUrl ? (
                  <Image
                   className={styles.leaderImage}
                   src={musician.featuredImage.node.sourceUrl}
                   alt={musician.featuredImage.node.altText || `Portrait of ${rosterName(musician)}`}
                   width={musician.featuredImage.node.mediaDetails?.width || 400}
                   height={musician.featuredImage.node.mediaDetails?.height || 400}
                   sizes="(min-width: 900px) 6rem, 5rem"
                  />
                 ) : <span className={styles.imagePlaceholder} aria-hidden="true"><FontAwesomeIcon icon={faUser} /></span>}
                </Link>
                <div className={styles.leaderDetails}>
                 <h3><Link href={`/about/musicians/${musician.slug}`}>{rosterName(musician)}</Link></h3>
                 {rosterJobTitles(musician) ? <p className={styles.personTitle}>{rosterJobTitles(musician)}</p> : null}
                </div>
               </article>
              ))}
             </div>
            </section>
           );
          })}
         </div>
        ),
       },
      ]}
     />
    </div>
   </section>

   <section className={`${styles.panel} ${styles.mountain}`} id="tenth-mountain" aria-labelledby="mountain-heading">
    <div className={styles.mountainGrid}>
     <Reveal className={styles.mountainVisual}>
      <Image
       className={styles.mountainPhoto}
       src="/america250/10th-mountain-division-band.jpg"
       alt="The 10th Mountain Division Band marching in formation"
       fill
       sizes="(min-width: 980px) 55vw, 100vw"
      />
      <Image
       className={styles.mountainPatch}
       src="/america250/branding/10th-mountain-patch--transparent.png"
       alt="10th Mountain Division shoulder sleeve insignia"
       width={1029}
       height={1528}
       sizes="8rem"
      />
     </Reveal>
     <Reveal className={styles.mountainContent}>
      <p className={styles.sectionNumber}>04</p>
      <p className={styles.sectionLabel}>Featured ensemble</p>
      <h2 id="mountain-heading" className={styles.ensembleHeading}>10th Mountain Division Band</h2>
      <p className={styles.awaiting}>Program selections will be announced.</p>
     </Reveal>
    </div>
   </section>

   <section className={`${styles.panel} ${styles.finale}`} id="joint-finale" aria-labelledby="finale-heading">
    <div className={styles.sectionContentWide}>
     <Reveal className={styles.sectionIntro}>
      <p className={styles.sectionNumber}>05</p>
      <p className={styles.sectionLabel}>Syracuse University Brass Ensemble, 10th Mountain Division Band, and masterclass participants</p>
      <h2 id="finale-heading">Joint Finale</h2>
     </Reveal>
     <PieceList pieces={combinedPieces} />
     <Reveal className={styles.finalMessage}>
      <p>Two ensembles united in a celebration of service, community, and the enduring power of music.</p>
     </Reveal>
    </div>
   </section>

   <section className={`${styles.panel} ${styles.sponsors}`} id="sponsors" aria-labelledby="sponsors-heading">
    <div className={styles.sponsorGrid}>
     <Reveal className={styles.sponsorHeading}>
      <p className={styles.sectionNumber}>06</p>
      <p className={styles.sectionLabel}>With gratitude</p>
      <h2 id="sponsors-heading">Thank You to Our Sponsors</h2>
      <div className={styles.partnerLockup} aria-label="Syracuse University, Office of Veteran and Military Affairs, and Hendricks Chapel">
       <Image
        className={styles.suLogo}
        src="/america250/branding/syracuse-university.svg"
        alt="Syracuse University"
        width={790}
        height={270}
        sizes="19rem"
       />
       <div className={styles.partnerNames}>
        <a href="https://veterans.syracuse.edu/" target="_blank" rel="noopener noreferrer">Office of Veteran<br />and Military Affairs</a>
        <a href="https://chapel.syracuse.edu/" target="_blank" rel="noopener noreferrer">Hendricks Chapel</a>
       </div>
      </div>
     </Reveal>
     <Reveal className={styles.sponsorCopy}>
      <p>The Syracuse University Brass Ensemble gratefully acknowledges <a href="https://veterans.syracuse.edu/" target="_blank" rel="noopener noreferrer">Syracuse University’s Office of Veteran and Military Affairs</a> and <a href="https://chapel.syracuse.edu/" target="_blank" rel="noopener noreferrer">Hendricks Chapel</a> for their support of today’s masterclass and America 250 concert.</p>
      <p>Special thanks to <a href="https://veterans.syracuse.edu/about-us/office-of-veteran-and-military-affairs/" target="_blank" rel="noopener noreferrer"><strong>Ron Novack</strong></a> and <a href="https://veterans.syracuse.edu/about-us/office-of-veteran-and-military-affairs/" target="_blank" rel="noopener noreferrer"><strong>Dwayne Murray</strong></a> of the Office of Veteran and Military Affairs, and to <a href="https://chapel.syracuse.edu/about/contact/staff/" target="_blank" rel="noopener noreferrer"><strong>the Rev. Corey S. MacPherson</strong></a>, <a href="https://chapel.syracuse.edu/about/contact/staff/" target="_blank" rel="noopener noreferrer"><strong>Dara Harper</strong></a>, and <a href="https://chapel.syracuse.edu/about/contact/staff/" target="_blank" rel="noopener noreferrer"><strong>Alex Snow</strong></a> of Hendricks Chapel for their coordination, hospitality, and help bringing these events to our community.</p>
      <p>We also thank WCNY’s <a href="https://www.wcny.org/radio/meet-the-hosts/" target="_blank" rel="noopener noreferrer"><strong>Bruce Paulsen</strong></a> for serving as emcee during the Syracuse University Brass Ensemble’s portion of today’s concert, introducing the ensemble’s selections and narrating <em>Liberty Fanfare</em>.</p>
      <Link className={styles.returnLink} href="/concerts/america250">Return to event details</Link>
     </Reveal>
    </div>
   </section>
  </main>
 );
}

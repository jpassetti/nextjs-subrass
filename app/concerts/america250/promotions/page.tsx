import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

import Layout from "../../../../components/layout";
import Section from "../../../../components/section";
import ShareActions from "./share-actions";
import styles from "./promotions.module.scss";

const CANONICAL_URL = "https://subrass.syr.edu/concerts/america250/promotions";
const KIT_ROOT = "/america250/kit";
const INSTAGRAM_ASSET_VERSION = "20261012-3";

const instagramSlides = Array.from({ length: 7 }, (_, index) => {
 const number = String(index + 1).padStart(2, "0");
 return {
  number: index + 1,
  src: `${KIT_ROOT}/social-media/instagram/${number}-ig-america250.jpg`,
 };
});

export const metadata: Metadata = {
 title: "America 250 Promotions",
 description: "Download and share official promotional materials for the free America 250 concert at Hendricks Chapel on Nov. 13, 2026.",
 alternates: { canonical: CANONICAL_URL },
 openGraph: {
  title: "America 250 Concert Promotions",
  description: "Download and share official concert graphics, flyers, and social media images.",
  url: CANONICAL_URL,
  type: "website",
  images: [{ url: `${KIT_ROOT}/featured-image/america250-facebook-1224x792px.jpg`, width: 1224, height: 792 }],
 },
};

export default function PromotionsPage() {
 const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
   { "@type": "ListItem", position: 1, name: "Home", item: "https://subrass.syr.edu/" },
   { "@type": "ListItem", position: 2, name: "Concerts", item: "https://subrass.syr.edu/concerts" },
   { "@type": "ListItem", position: 3, name: "America 250", item: "https://subrass.syr.edu/concerts/america250" },
   { "@type": "ListItem", position: 4, name: "Promotions", item: CANONICAL_URL },
  ],
 };

 return (
  <Layout>
   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
   <Section>
    <main className={styles.page}>
     <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <ol>
       <li><Link className={styles.breadcrumbHome} href="/" aria-label="Home"><FontAwesomeIcon icon={faHouse} aria-hidden="true" /></Link></li>
       <li><Link href="/concerts">Concerts</Link></li>
       <li><Link href="/concerts/america250">America 250</Link></li>
       <li><span aria-current="page">Promotions</span></li>
      </ol>
     </nav>

     <header className={styles.header}>
      <p className={styles.eyebrow}>America 250 concert</p>
      <h1>Promotions</h1>
      <p>Help spread the word. Download and share these official materials for the free America 250 concert at Hendricks Chapel on Friday, Nov. 13, 2026.</p>
      <div className={styles.headerActions}>
       <a className={styles.primaryButton} href={`${KIT_ROOT}/america250-promotions-kit.zip`} download>Download the complete promotions kit</a>
       <Link className={styles.secondaryButton} href="/concerts/america250">View concert details</Link>
      </div>
     </header>

     <section className={styles.sharePanel} aria-labelledby="share-heading">
      <div>
       <p className={styles.sectionLabel}>Share the event</p>
       <h2 id="share-heading">Invite your community</h2>
       <p>Use your device’s share menu, copy the concert link, or open a ready-to-use social sharing option.</p>
      </div>
      <ShareActions />
     </section>

     <section className={styles.assetSection} aria-labelledby="featured-heading">
      <div className={styles.sectionIntro}>
       <p className={styles.sectionLabel}>Web and email</p>
       <h2 id="featured-heading">Featured image</h2>
       <p>Use this landscape image on websites, event calendars, newsletters, and email announcements.</p>
      </div>
      <article className={styles.featuredCard}>
       <Image src={`${KIT_ROOT}/featured-image/america250-facebook-1224x792px.jpg`} alt="America 250 concert promotional graphic" width={1224} height={792} sizes="(min-width: 900px) 52rem, 100vw" />
       <div className={styles.cardFooter}>
        <div><h3>Featured image</h3><p>JPG · 1224 × 792 pixels</p></div>
        <a className={styles.downloadLink} href={`${KIT_ROOT}/featured-image/america250-facebook-1224x792px.jpg`} download>Download image</a>
       </div>
      </article>
     </section>

     <section className={styles.assetSection} aria-labelledby="press-release-heading">
      <div className={styles.sectionIntro}>
       <p className={styles.sectionLabel}>Media resource</p>
       <h2 id="press-release-heading">Press release</h2>
       <p>Download the editable press release for event listings, news coverage, and community announcements.</p>
      </div>
      <article className={styles.pressReleaseCard}>
       <div><span className={styles.fileType}>DOCX</span><h3>America 250 concert press release</h3><p>Microsoft Word document</p></div>
       <a className={styles.downloadLink} href={`${KIT_ROOT}/press-release/america250-press-release.docx`} download>Download press release</a>
      </article>
     </section>

     <section className={styles.assetSection} aria-labelledby="print-heading">
      <div className={styles.sectionIntro}>
       <p className={styles.sectionLabel}>Print</p>
       <h2 id="print-heading">Posters and flyers</h2>
       <p>Download print-ready PDF files for bulletin boards, community spaces, schools, and organizations.</p>
      </div>
      <div className={styles.printGrid}>
       <article className={styles.fileCard}>
        <Image className={styles.printPreview} src={`${KIT_ROOT}/print/america250--8x11--preview.jpg`} alt="Preview of the America 250 letter-size flyer" width={612} height={792} sizes="(min-width: 700px) 40vw, 100vw" />
        <div className={styles.fileCardBody}><div><span className={styles.fileType}>PDF</span><h3>Letter-size flyer</h3><p>8½ × 11 inches</p></div><a className={styles.downloadLink} href={`${KIT_ROOT}/print/america250--8x11.pdf`} download>Download PDF</a></div>
       </article>
       <article className={styles.fileCard}>
        <Image className={styles.printPreview} src={`${KIT_ROOT}/print/america250--11x17--preview.jpg`} alt="Preview of the America 250 tabloid-size poster" width={792} height={1224} sizes="(min-width: 700px) 40vw, 100vw" />
        <div className={styles.fileCardBody}><div><span className={styles.fileType}>PDF</span><h3>Tabloid-size poster</h3><p>11 × 17 inches</p></div><a className={styles.downloadLink} href={`${KIT_ROOT}/print/america250--11x17.pdf`} download>Download PDF</a></div>
       </article>
      </div>
     </section>

     <section className={styles.assetSection} aria-labelledby="facebook-heading">
      <div className={styles.sectionIntro}>
       <p className={styles.sectionLabel}>Social media</p>
       <h2 id="facebook-heading">Facebook image</h2>
       <p>Download this landscape graphic, add it to your post, and link to the concert page.</p>
      </div>
      <article className={styles.featuredCard}>
       <Image src={`${KIT_ROOT}/social-media/facebook/america250-fb-1200x630px.jpg`} alt="America 250 concert graphic formatted for Facebook" width={1200} height={630} sizes="(min-width: 900px) 52rem, 100vw" />
       <div className={styles.cardFooter}>
        <div><h3>Facebook image</h3><p>JPG · 1200 × 630 pixels</p></div>
        <a className={styles.downloadLink} href={`${KIT_ROOT}/social-media/facebook/america250-fb-1200x630px.jpg`} download>Download image</a>
       </div>
      </article>
     </section>

     <section className={styles.assetSection} aria-labelledby="instagram-heading">
      <div className={styles.instagramHeading}>
       <div className={styles.sectionIntro}>
        <p className={styles.sectionLabel}>Social media</p>
        <h2 id="instagram-heading">Instagram carousel</h2>
        <p>Download all seven square images and post them in numbered order as one carousel.</p>
       </div>
       <a className={styles.primaryButton} href={`${KIT_ROOT}/social-media/instagram/america250-instagram-carousel.zip`} download>Download all 7 slides</a>
      </div>
      <div className={styles.instagramGrid}>
       {instagramSlides.map((slide) => (
        <article className={styles.instagramCard} key={slide.number}>
         <Image src={`${slide.src}?v=${INSTAGRAM_ASSET_VERSION}`} alt={`America 250 Instagram carousel slide ${slide.number} of 7`} width={792} height={792} sizes="(min-width: 1000px) 22vw, (min-width: 600px) 45vw, 100vw" />
         <div className={styles.cardFooter}><h3>Slide {slide.number}</h3><a className={styles.downloadLink} href={slide.src} download>Download</a></div>
        </article>
       ))}
      </div>
     </section>
    </main>
   </Section>
  </Layout>
 );
}

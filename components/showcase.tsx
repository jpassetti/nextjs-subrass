import type { ReactNode } from "react";
import styles from "./showcase.module.scss";
import Image from "next/image";

const showcaseImages = [
 "/syracuse-university-brass-ensemble-2025.webp",
 "/horns-and-harmonies-2025/HH_DSC0098.webp",
 "/horns-and-harmonies-2025/HH_DSC0256.webp",
 "/horns-and-harmonies-2025/HH_DSC0385.webp",
 "/horns-and-harmonies-2025/HH_DSC0421.webp",
];

interface ShowcaseProps {
 children?: ReactNode;
}

const Showcase = ({ children }: ShowcaseProps) => {
 return (
  <div className={styles.showcase}>
   <div className={styles.visual}>
    <div className={styles.slideshow} aria-hidden="true">
     {showcaseImages.map((src, index) => (
      <div className={styles.slide} key={src}>
       <Image
        src={src}
        alt=""
        fill
        sizes="(min-width: 768px) 68vw, 100vw"
        priority={index === 0}
       />
      </div>
     ))}
    </div>
   </div>
   <div className={styles.content}>
    <div className={styles.line}></div>
    {children || <p>
     The Syracuse University Brass Ensemble (SUBE) is a group of 35
     professional-level brass and percussion musicians; members include Syracuse
     University faculty, staff, and students, the State University of New York
     Upstate Medical University faculty and staff, and accomplished musicians
     from Upstate New York communities.
    </p>}
   </div>
  </div>
 );
};

export default Showcase;

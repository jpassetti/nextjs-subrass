"use client";

import type { ReactNode } from "react";
import styles from "./showcase.module.scss";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

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
 const reduceMotion = useReducedMotion();
 const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : .4, ease: "easeOut" as const } },
 };

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
   <motion.div
    className={styles.content}
    initial={reduceMotion ? false : "hidden"}
    animate="visible"
    variants={{ visible: { transition: { staggerChildren: reduceMotion ? 0 : .12 } } }}
   >
    <motion.h1 variants={itemVariants}><span className={styles.noWrap}>Syracuse University</span>{" "}<span className={styles.noWrap}>Brass Ensemble</span></motion.h1>
    <motion.div
     className={styles.line}
     variants={{
      hidden: { opacity: 0, scaleX: 0 },
      visible: { opacity: 1, scaleX: 1, transition: { duration: reduceMotion ? 0 : .5, ease: "easeOut" } },
     }}
    ></motion.div>
    {children ? <motion.div variants={itemVariants}>{children}</motion.div> : <motion.p variants={itemVariants}>
     The Syracuse University Brass Ensemble (SUBE) brings live brass music to
     audiences across Central New York. Its 35 professional-level brass and
     percussion musicians include Syracuse University faculty, staff, and
     students; SUNY Upstate Medical University faculty and staff; and
     accomplished musicians from surrounding communities.
    </motion.p>}
   </motion.div>
  </div>
 );
};

export default Showcase;

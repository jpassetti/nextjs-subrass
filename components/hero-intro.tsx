"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./hero-intro.module.scss";

export default function HeroIntro({ title, children }: { title: ReactNode; children: ReactNode }) {
 const reduceMotion = useReducedMotion();
 const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
   opacity: 1,
   y: 0,
   transition: { duration: reduceMotion ? 0 : .4, ease: "easeOut" as const },
  },
 };

 return (
  <motion.div
   className={styles.intro}
   initial={reduceMotion ? false : "hidden"}
   animate="visible"
   variants={{
    visible: { transition: { staggerChildren: reduceMotion ? 0 : .12 } },
   }}
  >
   <motion.h1 variants={itemVariants}>{title}</motion.h1>
   <motion.span
    className={styles.line}
    aria-hidden="true"
    variants={{
     hidden: { opacity: 0, scaleX: 0 },
     visible: {
      opacity: 1,
      scaleX: 1,
      transition: { duration: reduceMotion ? 0 : .5, ease: "easeOut" },
     },
    }}
   />
   <motion.p variants={itemVariants}>{children}</motion.p>
  </motion.div>
 );
}

"use client";

import { Children, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./grid.module.scss";

export default function EnsembleMusicianGrid({ children }: { children: ReactNode }) {
 const reduceMotion = useReducedMotion();
 const musicians = Children.toArray(children);

 return (
  <motion.ul
   className={styles.grid}
   initial={reduceMotion ? false : "hidden"}
   whileInView="visible"
   viewport={{ once: true, amount: .08, margin: "0px 0px -6% 0px" }}
   variants={{
    hidden: {},
    visible: {
     transition: reduceMotion ? { duration: 0 } : { delayChildren: .06, staggerChildren: .025 },
    },
   }}
  >
   {musicians.map((musician, index) => (
    <motion.li
     className={styles["grid--item"]}
     key={index}
     variants={{
      hidden: { opacity: 0, y: 10 },
      visible: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : .26, ease: "easeOut" } },
     }}
    >
     {musician}
    </motion.li>
   ))}
  </motion.ul>
 );
}

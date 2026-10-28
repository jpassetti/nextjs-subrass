"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type PageTransitionProps = {
 children: ReactNode;
 transitionKey: string;
};

export default function PageTransition({ children, transitionKey }: PageTransitionProps) {
 const reduceMotion = useReducedMotion();

 return (
  <motion.div
   key={transitionKey}
   initial={reduceMotion ? false : { opacity: 0, y: 10 }}
   animate={{ opacity: 1, y: 0 }}
   transition={{ duration: reduceMotion ? 0 : 0.28, ease: "easeOut" }}
  >
   {children}
  </motion.div>
 );
}

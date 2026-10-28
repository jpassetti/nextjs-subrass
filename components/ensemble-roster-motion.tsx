"use client";

import { Children, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useEnsembleTransition } from "./ensemble-transition-context";

type EnsembleRosterMotionProps = {
 children: ReactNode;
 transitionKey: string;
};

export default function EnsembleRosterMotion({ children, transitionKey }: EnsembleRosterMotionProps) {
 const reduceMotion = useReducedMotion();
 const sections = Children.toArray(children);
 const { completeExit, phase } = useEnsembleTransition();

 return (
  <motion.div
   key={transitionKey}
   initial={reduceMotion ? false : "hidden"}
   animate={phase === "exiting" ? "exit" : "visible"}
   onAnimationComplete={(definition) => {
    if (definition === "exit") completeExit();
   }}
   variants={{
    hidden: { opacity: 0 },
    visible: {
     opacity: 1,
     transition: { duration: reduceMotion ? 0 : .2, ease: "easeOut" },
    },
    exit: {
     opacity: 0,
     transition: { duration: reduceMotion ? 0 : .16, ease: "easeIn" },
    },
   }}
  >
   {sections.map((section, index) => (
    <motion.div
     key={index}
     initial={reduceMotion ? false : "hidden"}
     whileInView="visible"
     viewport={{ once: true, amount: .08, margin: "0px 0px -8% 0px" }}
     variants={{
      hidden: { opacity: 0, y: 18 },
      visible: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : .38, ease: "easeOut" } },
     }}
    >
     {section}
    </motion.div>
   ))}
  </motion.div>
 );
}

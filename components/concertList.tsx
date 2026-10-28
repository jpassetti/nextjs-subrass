// @ts-nocheck
"use client";

import { motion, useReducedMotion } from "framer-motion";
import ConcertListItem from "./concertListItem";

const ConcertList = ({ concerts }) => {
    const reduceMotion = useReducedMotion();

    return <motion.section
       initial={reduceMotion ? false : "hidden"}
       animate="visible"
       variants={{
        hidden: {},
        visible: {
         transition: reduceMotion ? { duration: 0 } : { delayChildren: .04, staggerChildren: .055 },
        },
       }}
    >
       {concerts.map((concert, index) => {
			return <motion.div
                key={concert.node.slug || index}
                variants={{
                 hidden: { opacity: 0, y: 14 },
                 visible: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : .3, ease: "easeOut" } },
                }}
               >
                <ConcertListItem data={concert.node} teaser />
               </motion.div>
		})}
    </motion.section>
}
export default ConcertList;

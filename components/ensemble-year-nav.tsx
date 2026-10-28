"use client";

import Link from "next/link";
import { useEnsembleTransition } from "./ensemble-transition-context";
import styles from "./ensemble-year-nav.module.scss";

type EnsembleYearNavProps = {
 currentSlug: string;
 currentYearSlug: string;
 slugs: string[];
};

export default function EnsembleYearNav({ currentSlug, currentYearSlug, slugs }: EnsembleYearNavProps) {
 const { navigate, phase } = useEnsembleTransition();

 return (
  <nav className={styles.yearNav} aria-label="Ensemble rosters by year">
   <span className={styles.label}>Ensemble year</span>
   <div className={styles.links}>
    {slugs.map((slug) => {
     const href = slug === currentYearSlug ? "/ensembles" : `/ensembles/${slug}`;
     const handleNavigate = (event) => {
      if (slug === currentSlug) return;
      event.preventDefault();
      navigate(href);
     };

     return <Link
      className={slug === currentSlug ? styles.active : ""}
      href={href}
      aria-current={slug === currentSlug ? "page" : undefined}
      aria-disabled={phase === "exiting" && slug !== currentSlug ? true : undefined}
      onNavigate={handleNavigate}
      key={slug}
     >
      {slug}
     </Link>;
    })}
   </div>
  </nav>
 );
}

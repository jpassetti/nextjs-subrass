"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import styles from "./announcement-banner.module.scss";

export const AMERICA_250_ANNOUNCEMENT_EXPIRES = "2026-11-14T00:00:00-05:00";

export default function AnnouncementBanner() {
 const pathname = usePathname();
 const [isActive, setIsActive] = useState(false);

 useEffect(() => {
  const expiration = new Date(AMERICA_250_ANNOUNCEMENT_EXPIRES).getTime();
  const updateVisibility = () => setIsActive(Date.now() < expiration);

  updateVisibility();
  const interval = window.setInterval(updateVisibility, 60_000);
  return () => window.clearInterval(interval);
 }, []);

 const normalizedPath = pathname.replace(/\/+$/, "") || "/";
 if (!isActive || normalizedPath === "/concerts/america250") return null;

 return (
  <aside className={styles.banner} aria-label="America 250 event announcement">
   <div className={styles.message}>
    <span className={styles.badge}>Upcoming</span>
    <p><strong className={styles.noWrap}>America 250 at Hendricks Chapel</strong><span className={styles.separator} aria-hidden="true">·</span><span className={styles.noWrap}>Friday, Nov. 13</span><span className={styles.separator} aria-hidden="true">·</span><span className={styles.noWrap}>Free musician masterclass and concert</span></p>
   </div>
   <div className={styles.actions}>
    <Link href="/concerts/america250">Event details <span aria-hidden="true">→</span></Link>
    <Link href="/concerts/america250/master-class/rsvp">Masterclass RSVP <span aria-hidden="true">→</span></Link>
   </div>
  </aside>
 );
}

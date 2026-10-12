"use client";

import { useState } from "react";

import styles from "./promotions.module.scss";

const EVENT_URL = "https://subrass.syr.edu/concerts/america250";
const EVENT_TITLE = "America 250 Concert at Hendricks Chapel";
const SHARE_TEXT = "Join the Syracuse University Brass Ensemble and the 10th Mountain Division Band for a free America 250 concert on Nov. 13, 2026.";

export default function ShareActions() {
 const [status, setStatus] = useState("");

 async function copyEventLink() {
  try {
   await navigator.clipboard.writeText(EVENT_URL);
   setStatus("Event link copied.");
  } catch {
   setStatus(`Copy this link: ${EVENT_URL}`);
  }
 }

 async function shareEvent() {
  if (!navigator.share) {
   await copyEventLink();
   return;
  }

  try {
   await navigator.share({ title: EVENT_TITLE, text: SHARE_TEXT, url: EVENT_URL });
   setStatus("Share options opened.");
  } catch (error) {
   if (error instanceof DOMException && error.name === "AbortError") return;
   setStatus("The share menu could not be opened. You can copy the event link instead.");
  }
 }

 const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(EVENT_URL)}`;
 const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(EVENT_URL)}`;
 const emailUrl = `mailto:?subject=${encodeURIComponent(EVENT_TITLE)}&body=${encodeURIComponent(`${SHARE_TEXT}\n\n${EVENT_URL}`)}`;

 return (
  <div>
   <div className={styles.shareActions}>
    <button type="button" className={styles.primaryButton} onClick={shareEvent}>Share event</button>
    <button type="button" className={styles.secondaryButton} onClick={copyEventLink}>Copy event link</button>
    <a className={styles.secondaryButton} href={facebookUrl} target="_blank" rel="noopener noreferrer">Share on Facebook</a>
    <a className={styles.secondaryButton} href={linkedInUrl} target="_blank" rel="noopener noreferrer">Share on LinkedIn</a>
    <a className={styles.secondaryButton} href={emailUrl}>Share by email</a>
   </div>
   <p className={styles.shareStatus} aria-live="polite">{status}</p>
  </div>
 );
}

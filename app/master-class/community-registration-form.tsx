"use client";

import { FormEvent, useState } from "react";

import { event as trackEvent } from "../../lib/gtag";
import styles from "./master-class.module.scss";

const instruments = [
 "Flute", "Oboe", "Clarinet", "Bass clarinet", "Bassoon", "Saxophone",
 "Trumpet", "French horn", "Trombone", "Baritone or euphonium", "Tuba", "Percussion",
];

export default function CommunityRegistrationForm() {
 const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
 const [message, setMessage] = useState("");
 const [instrument, setInstrument] = useState("");

 async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  setStatus("submitting");
  setMessage("");

  const form = event.currentTarget;
  const response = await fetch("/api/master-class/register-community", {
   method: "POST",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify(Object.fromEntries(new FormData(form))),
  });
  const result = await response.json().catch(() => ({}));

  if (response.ok) {
   form.reset();
   setInstrument("");
   setStatus("success");
   setMessage("Thank you. Your master class registration has been received.");
   trackEvent({ action: "masterclass_community_rsvp_success", category: "Event", label: "america250-masterclass", value: undefined });
  } else {
   setStatus("error");
   setMessage(result.message || "We could not submit your registration. Please try again.");
  }
 }

 return (
  <form className={styles.form} onSubmit={handleSubmit}>
   <fieldset className={styles.formGroup}>
    <legend>Musician information</legend>
    <p className={styles.groupDescription}>For college and community musicians age 18 and older.</p>
    <div className={styles.grid}>
     <div className={styles.field}><label htmlFor="communityFirstName">First name *</label><input id="communityFirstName" name="firstName" autoComplete="given-name" required maxLength={80} /></div>
     <div className={styles.field}><label htmlFor="communityLastName">Last name *</label><input id="communityLastName" name="lastName" autoComplete="family-name" required maxLength={80} /></div>
    </div>
    <div className={styles.grid}>
     <div className={styles.field}><label htmlFor="communityEmail">Email address *</label><input id="communityEmail" name="email" type="email" autoComplete="email" required maxLength={254} /></div>
     <div className={styles.field}><label htmlFor="communityPhone">Phone number <span className={styles.optional}>(optional)</span></label><input id="communityPhone" name="phone" type="tel" autoComplete="tel" maxLength={40} /></div>
    </div>
    <div className={styles.field}><label htmlFor="affiliation">College, ensemble, or musical affiliation <span className={styles.optional}>(optional)</span></label><input id="affiliation" name="affiliation" maxLength={160} /></div>
    <div className={styles.field}>
     <label htmlFor="communityInstrument">Instrument *</label>
     <select id="communityInstrument" name="instrument" required value={instrument} onChange={(event) => setInstrument(event.target.value)}>
      <option value="" disabled>Select an instrument</option>
      {instruments.map((instrumentName) => <option key={instrumentName}>{instrumentName}</option>)}
      <option>Other</option>
     </select>
    </div>
    {instrument === "Other" ? <div className={styles.field}><label htmlFor="communityOtherInstrument">Enter your instrument *</label><input id="communityOtherInstrument" name="otherInstrument" required maxLength={80} /></div> : null}
   </fieldset>

   <div className={styles.field}><label htmlFor="communityNotes">Questions, accessibility needs, or additional information</label><textarea id="communityNotes" name="notes" maxLength={2000} /></div>
   <label className={styles.checkbox}><input type="checkbox" name="ageConfirmed" value="yes" required /><span>I confirm that I am age 18 or older. *</span></label>
   <label className={styles.checkbox}><input type="checkbox" name="consentToContact" value="yes" required /><span>I consent to being contacted about this master class and understand that my information will be used to administer the event. *</span></label>
   <div className={styles.honeypot} aria-hidden="true"><label htmlFor="communityWebsite">Website</label><input id="communityWebsite" name="website" tabIndex={-1} autoComplete="off" /></div>
   <button className={styles.button} disabled={status === "submitting"}>{status === "submitting" ? "Submitting…" : "Submit registration"}</button>
   {message && <div className={status === "success" ? styles.notice : styles.error} role="status">{message}</div>}
  </form>
 );
}

"use client";

import { FormEvent, useState } from "react";
import styles from "./master-class.module.scss";

const instruments = [
 "Trumpet", "Cornet", "Flugelhorn", "French horn", "Trombone",
 "Bass trombone", "Euphonium", "Baritone", "Tuba", "Other",
];

export default function RegistrationForm() {
 const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
 const [message, setMessage] = useState("");

 async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  setStatus("submitting");
  setMessage("");

  const form = event.currentTarget;
  const response = await fetch("/api/master-class/register", {
   method: "POST",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify(Object.fromEntries(new FormData(form))),
  });
  const result = await response.json().catch(() => ({}));

  if (response.ok) {
   form.reset();
   setStatus("success");
   setMessage("Thank you. Your master class registration has been received.");
  } else {
   setStatus("error");
   setMessage(result.message || "We could not submit your registration. Please try again.");
  }
 }

 return (
  <form className={styles.form} onSubmit={handleSubmit}>
   <fieldset className={styles.formGroup}>
    <legend>Student information</legend>
    <div className={styles.grid}>
     <div className={styles.field}>
      <label htmlFor="firstName">First name *</label>
      <input id="firstName" name="firstName" autoComplete="given-name" required maxLength={80} />
     </div>
     <div className={styles.field}>
      <label htmlFor="lastName">Last name *</label>
      <input id="lastName" name="lastName" autoComplete="family-name" required maxLength={80} />
     </div>
    </div>

    <div className={styles.grid}>
     <div className={styles.field}>
      <label htmlFor="school">School *</label>
      <input id="school" name="school" required maxLength={160} />
     </div>
     <div className={styles.field}>
      <label htmlFor="gradeLevel">High school grade *</label>
      <select id="gradeLevel" name="gradeLevel" required defaultValue="">
       <option value="" disabled>Select a grade</option>
       {[9, 10, 11, 12].map((grade) => <option key={grade} value={grade}>Grade {grade}</option>)}
      </select>
     </div>
    </div>

    <div className={styles.grid}>
     <div className={styles.field}>
      <label htmlFor="email">Student email address *</label>
      <input id="email" name="email" type="email" autoComplete="email" required maxLength={254} />
     </div>
     <div className={styles.field}>
      <label htmlFor="phone">Student phone number</label>
      <input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={40} />
     </div>
    </div>

    <div className={styles.field}>
     <label htmlFor="instrument">Instrument *</label>
     <select id="instrument" name="instrument" required defaultValue="">
      <option value="" disabled>Select an instrument</option>
      {instruments.map((instrument) => <option key={instrument}>{instrument}</option>)}
     </select>
    </div>
   </fieldset>

   <fieldset className={styles.formGroup}>
    <legend>Music instructor</legend>
    <p className={styles.groupDescription}>Please provide contact information for the student’s school music instructor.</p>
    <div className={styles.grid}>
     <div className={styles.field}>
      <label htmlFor="teacherName">Instructor name *</label>
      <input id="teacherName" name="teacherName" required maxLength={160} />
     </div>
     <div className={styles.field}>
      <label htmlFor="teacherEmail">Instructor email address *</label>
      <input id="teacherEmail" name="teacherEmail" type="email" required maxLength={254} />
     </div>
    </div>
    <div className={styles.field}>
     <label htmlFor="teacherPhone">Instructor phone number</label>
     <input id="teacherPhone" name="teacherPhone" type="tel" maxLength={40} />
    </div>
   </fieldset>

   <div className={styles.field}>
    <label htmlFor="notes">Questions, accessibility needs, or additional information</label>
    <textarea id="notes" name="notes" maxLength={2000} />
   </div>

   <label className={styles.checkbox}>
    <input type="checkbox" name="consentToContact" value="yes" required />
    <span>I consent to being contacted about this master class and understand that my information will be used to administer the event. *</span>
   </label>

   <div className={styles.honeypot} aria-hidden="true">
    <label htmlFor="website">Website</label>
    <input id="website" name="website" tabIndex={-1} autoComplete="off" />
   </div>

   <button className={styles.button} disabled={status === "submitting"}>
    {status === "submitting" ? "Submitting…" : "Submit registration"}
   </button>
   {message && <div className={status === "success" ? styles.notice : styles.error} role="status">{message}</div>}
  </form>
 );
}

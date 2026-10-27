"use client";

import { FormEvent, useState } from "react";

import { event as trackEvent } from "../../lib/gtag";
import styles from "./master-class.module.scss";

const instruments = [
 "Flute", "Oboe", "Clarinet", "Bass clarinet", "Bassoon", "Saxophone",
 "Trumpet", "French horn", "Trombone", "Baritone or euphonium", "Tuba", "Percussion",
];

type Student = {
 id: number;
 firstName: string;
 lastName: string;
 email: string;
 gradeLevel: string;
 instrument: string;
 otherInstrument: string;
};

const newStudent = (id: number): Student => ({
 id,
 firstName: "",
 lastName: "",
 email: "",
 gradeLevel: "",
 instrument: "",
 otherInstrument: "",
});

export default function EducatorRegistrationForm() {
 const [students, setStudents] = useState<Student[]>([newStudent(1)]);
 const [nextId, setNextId] = useState(2);
 const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
 const [message, setMessage] = useState("");

 function updateStudent(id: number, field: keyof Omit<Student, "id">, value: string) {
  setStudents((current) => current.map((student) => student.id === id ? { ...student, [field]: value } : student));
 }

 function addStudent() {
  if (students.length >= 50) return;
  setStudents((current) => [...current, newStudent(nextId)]);
  setNextId((current) => current + 1);
 }

 function removeStudent(id: number) {
  if (students.length === 1) return;
  setStudents((current) => current.filter((student) => student.id !== id));
 }

 async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  setStatus("submitting");
  setMessage("");

  const form = event.currentTarget;
  const body = { ...Object.fromEntries(new FormData(form)), students };
  const response = await fetch("/api/master-class/register-educator", {
   method: "POST",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify(body),
  });
  const result = await response.json().catch(() => ({}));

  if (response.ok) {
   const count = Number(result.count || students.length);
   form.reset();
   setStudents([newStudent(1)]);
   setNextId(2);
   setStatus("success");
   setMessage(`Thank you. ${count} student${count === 1 ? "" : "s"} ${count === 1 ? "has" : "have"} been registered.`);
   trackEvent({ action: "masterclass_educator_rsvp_success", category: "Event", label: "america250-masterclass", value: count });
  } else {
   setStatus("error");
   setMessage(result.message || "We could not submit these registrations. Please try again.");
  }
 }

 return (
  <form className={styles.form} onSubmit={handleSubmit}>
   <fieldset className={styles.formGroup}>
    <legend>Music educator information</legend>
    <p className={styles.groupDescription}>You will be the primary contact for every student in this submission.</p>
    <div className={styles.grid}>
     <div className={styles.field}><label htmlFor="educatorName">Educator name *</label><input id="educatorName" name="educatorName" autoComplete="name" required maxLength={160} /></div>
     <div className={styles.field}><label htmlFor="school">School name *</label><input id="school" name="school" required maxLength={160} /></div>
    </div>
    <div className={styles.grid}>
     <div className={styles.field}><label htmlFor="educatorEmail">Educator email address *</label><input id="educatorEmail" name="educatorEmail" type="email" autoComplete="email" required maxLength={254} /></div>
     <div className={styles.field}><label htmlFor="educatorPhone">Educator phone number</label><input id="educatorPhone" name="educatorPhone" type="tel" autoComplete="tel" maxLength={40} /></div>
    </div>
   </fieldset>

   <fieldset className={styles.formGroup}>
    <legend>Students</legend>
    <p className={styles.groupDescription}>Add each participating student. Student email addresses are optional; event communication will be sent to you.</p>
    <div className={styles.studentList}>
     {students.map((student, index) => (
      <section className={styles.studentEntry} key={student.id} aria-labelledby={`student-${student.id}-heading`}>
       <div className={styles.studentEntryHeader}>
        <h3 id={`student-${student.id}-heading`}>Student {index + 1}</h3>
        {students.length > 1 ? <button className={styles.removeButton} type="button" onClick={() => removeStudent(student.id)}>Remove</button> : null}
       </div>
       <div className={styles.grid}>
        <div className={styles.field}><label htmlFor={`student-${student.id}-firstName`}>First name *</label><input id={`student-${student.id}-firstName`} value={student.firstName} onChange={(event) => updateStudent(student.id, "firstName", event.target.value)} required maxLength={80} /></div>
        <div className={styles.field}><label htmlFor={`student-${student.id}-lastName`}>Last name *</label><input id={`student-${student.id}-lastName`} value={student.lastName} onChange={(event) => updateStudent(student.id, "lastName", event.target.value)} required maxLength={80} /></div>
       </div>
       <div className={styles.grid}>
        <div className={styles.field}>
         <label htmlFor={`student-${student.id}-grade`}>High school grade *</label>
         <select id={`student-${student.id}-grade`} value={student.gradeLevel} onChange={(event) => updateStudent(student.id, "gradeLevel", event.target.value)} required>
          <option value="" disabled>Select a grade</option>
          {[9, 10, 11, 12].map((grade) => <option key={grade} value={grade}>Grade {grade}</option>)}
         </select>
        </div>
        <div className={styles.field}>
         <label htmlFor={`student-${student.id}-instrument`}>Instrument *</label>
         <select id={`student-${student.id}-instrument`} value={student.instrument} onChange={(event) => updateStudent(student.id, "instrument", event.target.value)} required>
          <option value="" disabled>Select an instrument</option>
          {instruments.map((instrument) => <option key={instrument}>{instrument}</option>)}
          <option>Other</option>
         </select>
        </div>
       </div>
       {student.instrument === "Other" ? <div className={styles.field}><label htmlFor={`student-${student.id}-otherInstrument`}>Enter the instrument *</label><input id={`student-${student.id}-otherInstrument`} value={student.otherInstrument} onChange={(event) => updateStudent(student.id, "otherInstrument", event.target.value)} required maxLength={80} /></div> : null}
       <div className={styles.field}><label htmlFor={`student-${student.id}-email`}>Student email address <span className={styles.optional}>(optional)</span></label><input id={`student-${student.id}-email`} type="email" value={student.email} onChange={(event) => updateStudent(student.id, "email", event.target.value)} maxLength={254} /></div>
      </section>
     ))}
    </div>
    <button className={styles.addButton} type="button" onClick={addStudent} disabled={students.length >= 50}>Add another student</button>
   </fieldset>

   <div className={styles.field}><label htmlFor="educatorNotes">Questions, accessibility needs, or information applying to this group</label><textarea id="educatorNotes" name="notes" maxLength={2000} /></div>

   <label className={styles.checkbox}>
    <input type="checkbox" name="consentToContact" value="yes" required />
    <span>I confirm that I am authorized to submit this student information and consent to being contacted as the primary contact for this group. *</span>
   </label>

   <div className={styles.honeypot} aria-hidden="true"><label htmlFor="educatorWebsite">Website</label><input id="educatorWebsite" name="website" tabIndex={-1} autoComplete="off" /></div>

   <button className={styles.button} disabled={status === "submitting"}>{status === "submitting" ? "Submitting…" : `Register ${students.length} student${students.length === 1 ? "" : "s"}`}</button>
   {message && <div className={status === "success" ? styles.notice : styles.error} role="status">{message}</div>}
  </form>
 );
}

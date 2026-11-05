"use client";

import { useState } from "react";

import EducatorRegistrationForm from "./educator-registration-form";
import RegistrationForm from "./registration-form";
import CommunityRegistrationForm from "./community-registration-form";
import styles from "./master-class.module.scss";

export default function RegistrationOptions() {
 const [registrationType, setRegistrationType] = useState<"individual" | "educator" | "community">("individual");

 return (
  <div>
   <div className={styles.registrationType} role="group" aria-label="Choose a registration method">
    <button className={registrationType === "individual" ? styles.registrationTypeActive : styles.registrationTypeButton} type="button" onClick={() => setRegistrationType("individual")} aria-pressed={registrationType === "individual"}>
     <strong>Individual registration</strong>
     <span>For a student or parent registering one student</span>
    </button>
    <button className={registrationType === "educator" ? styles.registrationTypeActive : styles.registrationTypeButton} type="button" onClick={() => setRegistrationType("educator")} aria-pressed={registrationType === "educator"}>
     <strong>Music educator registration</strong>
     <span>Register multiple students in one submission</span>
    </button>
    <button className={registrationType === "community" ? styles.registrationTypeActive : styles.registrationTypeButton} type="button" onClick={() => setRegistrationType("community")} aria-pressed={registrationType === "community"}>
     <strong>College &amp; community musicians</strong>
     <span>For musicians age 18 and older registering themselves</span>
    </button>
   </div>
   {registrationType === "individual" ? <RegistrationForm /> : registrationType === "educator" ? <EducatorRegistrationForm /> : <CommunityRegistrationForm />}
  </div>
 );
}

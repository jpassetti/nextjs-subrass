"use client";

import { useState } from "react";

import EducatorRegistrationForm from "./educator-registration-form";
import RegistrationForm from "./registration-form";
import styles from "./master-class.module.scss";

export default function RegistrationOptions() {
 const [registrationType, setRegistrationType] = useState<"individual" | "educator">("individual");

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
   </div>
   {registrationType === "individual" ? <RegistrationForm /> : <EducatorRegistrationForm />}
  </div>
 );
}

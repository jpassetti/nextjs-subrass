import assert from "node:assert/strict";
import test from "node:test";

import {
 isValidMasterClassRegistration,
 isValidEducatorMasterClassRegistration,
 normalizeMasterClassRegistration,
 normalizeEducatorMasterClassRegistration,
} from "../lib/master-class-registration.mjs";

const validPayload = {
 firstName: "Jordan",
 lastName: "Student",
 school: "Central High School",
 teacherName: "Morgan Director",
 teacherEmail: "director@example.edu",
 teacherPhone: "315-555-0200",
 email: "student@example.edu",
 phone: "315-555-0100",
 parentName: "Taylor Student",
 parentEmail: "parent@example.edu",
 parentPhone: "315-555-0110",
 instrument: "Trumpet",
 gradeLevel: "10",
 notes: "Vegetarian",
 consentToContact: "yes",
 website: "",
};

test("normalizes registration input before persistence", () => {
 const registration = normalizeMasterClassRegistration({
  ...validPayload,
  firstName: "  Jordan  ",
  email: "  STUDENT@EXAMPLE.EDU ",
 teacherEmail: " DIRECTOR@EXAMPLE.EDU ",
  parentEmail: " PARENT@EXAMPLE.EDU ",
  notes: "x".repeat(2100),
 });

 assert.equal(registration.firstName, "Jordan");
 assert.equal(registration.email, "student@example.edu");
 assert.equal(registration.teacherEmail, "director@example.edu");
 assert.equal(registration.parentEmail, "parent@example.edu");
 assert.equal(registration.notes.length, 2000);
 assert.equal(registration.consentToContact, true);
});

test("accepts a complete high school student registration", () => {
 assert.equal(isValidMasterClassRegistration(normalizeMasterClassRegistration(validPayload)), true);
});

test("stores a manually entered instrument when Other is selected", () => {
 const registration = normalizeMasterClassRegistration({ ...validPayload, instrument: "Other", otherInstrument: "Alto horn" });
 assert.equal(registration.instrument, "Alto horn");
 assert.equal(isValidMasterClassRegistration(registration), true);
});

test("rejects Other when no instrument is entered", () => {
 const registration = normalizeMasterClassRegistration({ ...validPayload, instrument: "Other", otherInstrument: "" });
 assert.equal(registration.instrument, "");
 assert.equal(isValidMasterClassRegistration(registration), false);
});

for (const gradeLevel of ["6", "8", "College", "Adult", "13", ""]) {
 test(`rejects ineligible grade: ${gradeLevel || "blank"}`, () => {
  const registration = normalizeMasterClassRegistration({ ...validPayload, gradeLevel });
  assert.equal(isValidMasterClassRegistration(registration), false);
 });
}

for (const field of ["firstName", "lastName", "school", "parentName", "parentPhone", "teacherName", "instrument"]) {
 test(`rejects a missing required field: ${field}`, () => {
  const registration = normalizeMasterClassRegistration({ ...validPayload, [field]: "" });
  assert.equal(isValidMasterClassRegistration(registration), false);
 });
}

test("requires valid student and instructor email addresses", () => {
 assert.equal(isValidMasterClassRegistration(normalizeMasterClassRegistration({ ...validPayload, email: "invalid" })), false);
 assert.equal(isValidMasterClassRegistration(normalizeMasterClassRegistration({ ...validPayload, teacherEmail: "invalid" })), false);
});

test("requires a valid parent or guardian email address", () => {
 assert.equal(isValidMasterClassRegistration(normalizeMasterClassRegistration({ ...validPayload, parentEmail: "invalid" })), false);
});

test("requires contact consent", () => {
 const registration = normalizeMasterClassRegistration({ ...validPayload, consentToContact: "" });
 assert.equal(isValidMasterClassRegistration(registration), false);
});

test("captures the anti-spam honeypot", () => {
 const registration = normalizeMasterClassRegistration({ ...validPayload, website: "https://spam.example" });
 assert.equal(registration.website, "https://spam.example");
});

const validEducatorPayload = {
 educatorName: "Corey Riley",
 educatorEmail: "corey@example.edu",
 educatorPhone: "315-555-0123",
 school: "Central High School",
 notes: "Traveling together",
 consentToContact: "yes",
 website: "",
 students: [
  { firstName: "Avery", lastName: "Student", email: "", instrument: "Clarinet", gradeLevel: "9" },
  { firstName: "Jordan", lastName: "Musician", email: "jordan@example.edu", instrument: "Other", otherInstrument: "Alto horn", gradeLevel: "12" },
 ],
};

test("accepts an educator registration containing multiple students", () => {
 const registration = normalizeEducatorMasterClassRegistration(validEducatorPayload);
 assert.equal(isValidEducatorMasterClassRegistration(registration), true);
 assert.equal(registration.students.length, 2);
 assert.equal(registration.students[1].instrument, "Alto horn");
});

test("allows an educator to omit student email addresses", () => {
 const registration = normalizeEducatorMasterClassRegistration(validEducatorPayload);
 assert.equal(registration.students[0].email, "");
 assert.equal(isValidEducatorMasterClassRegistration(registration), true);
});

test("rejects an educator registration with no students", () => {
 const registration = normalizeEducatorMasterClassRegistration({ ...validEducatorPayload, students: [] });
 assert.equal(isValidEducatorMasterClassRegistration(registration), false);
});

test("rejects invalid students within an educator registration", () => {
 for (const students of [
  [{ firstName: "", lastName: "Student", instrument: "Trumpet", gradeLevel: "10" }],
  [{ firstName: "Avery", lastName: "Student", instrument: "", gradeLevel: "10" }],
  [{ firstName: "Avery", lastName: "Student", instrument: "Trumpet", gradeLevel: "8" }],
  [{ firstName: "Avery", lastName: "Student", email: "invalid", instrument: "Trumpet", gradeLevel: "10" }],
 ]) {
  assert.equal(isValidEducatorMasterClassRegistration(normalizeEducatorMasterClassRegistration({ ...validEducatorPayload, students })), false);
 }
});

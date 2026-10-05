import assert from "node:assert/strict";
import test from "node:test";

import {
 isValidMasterClassRegistration,
 normalizeMasterClassRegistration,
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
  notes: "x".repeat(2100),
 });

 assert.equal(registration.firstName, "Jordan");
 assert.equal(registration.email, "student@example.edu");
 assert.equal(registration.teacherEmail, "director@example.edu");
 assert.equal(registration.notes.length, 2000);
 assert.equal(registration.consentToContact, true);
});

test("accepts a complete high school student registration", () => {
 assert.equal(isValidMasterClassRegistration(normalizeMasterClassRegistration(validPayload)), true);
});

for (const gradeLevel of ["6", "8", "College", "Adult", "13", ""]) {
 test(`rejects ineligible grade: ${gradeLevel || "blank"}`, () => {
  const registration = normalizeMasterClassRegistration({ ...validPayload, gradeLevel });
  assert.equal(isValidMasterClassRegistration(registration), false);
 });
}

for (const field of ["firstName", "lastName", "school", "teacherName", "instrument"]) {
 test(`rejects a missing required field: ${field}`, () => {
  const registration = normalizeMasterClassRegistration({ ...validPayload, [field]: "" });
  assert.equal(isValidMasterClassRegistration(registration), false);
 });
}

test("requires valid student and instructor email addresses", () => {
 assert.equal(isValidMasterClassRegistration(normalizeMasterClassRegistration({ ...validPayload, email: "invalid" })), false);
 assert.equal(isValidMasterClassRegistration(normalizeMasterClassRegistration({ ...validPayload, teacherEmail: "invalid" })), false);
});

test("requires contact consent", () => {
 const registration = normalizeMasterClassRegistration({ ...validPayload, consentToContact: "" });
 assert.equal(isValidMasterClassRegistration(registration), false);
});

test("captures the anti-spam honeypot", () => {
 const registration = normalizeMasterClassRegistration({ ...validPayload, website: "https://spam.example" });
 assert.equal(registration.website, "https://spam.example");
});

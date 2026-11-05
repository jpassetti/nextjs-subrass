import assert from "node:assert/strict";
import test from "node:test";

import {
 buildMasterClassConfirmation,
 buildMasterClassNotification,
 sendMasterClassConfirmation,
 sendMasterClassNotification,
} from "../lib/master-class-notification.mjs";

const env = {
 RESEND_API_KEY: "re_test_key",
 RSVP_FROM_EMAIL: "SU Brass Ensemble <rsvp@subrass.org>",
 RSVP_REPLY_TO: "subrass@syr.edu",
 RSVP_NOTIFICATION_TO: "admin@example.com",
};

test("builds an organization-level notification without America 250 branding", () => {
 const notification = buildMasterClassNotification({ registrationId: "42", env });
 assert.equal(notification.payload.from, "SU Brass Ensemble <rsvp@subrass.org>");
 assert.equal(notification.payload.reply_to, "subrass@syr.edu");
 assert.deepEqual(notification.payload.to, ["admin@example.com"]);
 assert.equal(notification.idempotencyKey, "master-class-rsvp/42");
 assert.doesNotMatch(notification.payload.from, /America 250/i);
});

test("notification excludes student and instructor registration data", () => {
 const notification = buildMasterClassNotification({ registrationId: "42", env });
 const serialized = JSON.stringify(notification.payload);
 assert.match(serialized, /master-class\/admin/);
 assert.doesNotMatch(serialized, /student email|student phone|teacher|instructor email|accessibility/i);
});

test("identifies a community musician registration in the admin alert", () => {
 const notification = buildMasterClassNotification({ registrationId: "42", registrationType: "community", env });
 assert.equal(notification.payload.subject, "New college/community musician master class RSVP");
 assert.match(notification.payload.text, /college\/community musician/);
 assert.doesNotMatch(notification.payload.text, /louise@example|French horn/i);
});

test("builds a complete adult musician confirmation", () => {
 const confirmation = buildMasterClassConfirmation({ registrationId: "42", email: "louise@example.com", firstName: "Louise", env });
 assert.deepEqual(confirmation.payload.to, ["louise@example.com"]);
 assert.equal(confirmation.payload.reply_to, "subrass@syr.edu");
 assert.equal(confirmation.payload.subject, "Your America 250 masterclass RSVP");
 assert.equal(confirmation.idempotencyKey, "master-class-confirmation/42");
 for (const detail of ["Friday, Nov. 13, 2026", "4–5 p.m.", "Hendricks Chapel", "Irving Garage", "Stadium Place", "Syracuse, NY 13210", "Friends, family members, and other supporters", "sit in the audience", "Registration is not required", "Masterclass audience guests", "Concert attendees in your group", "rough estimate", "6:30 p.m.", "joining together for the finale", "SHARE WITH OTHERS", "all skill and experience levels", "concerts/america250/master-class"]) {
  assert.match(confirmation.payload.text, new RegExp(detail.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
 }
});

test("escapes the registrant name in confirmation HTML", () => {
 const confirmation = buildMasterClassConfirmation({ registrationId: "42", email: "person@example.com", firstName: "<script>alert(1)</script>", env });
 assert.doesNotMatch(confirmation.payload.html, /<script>/);
 assert.match(confirmation.payload.html, /&lt;script&gt;/);
});

test("skips delivery when Resend configuration is incomplete", async () => {
 let called = false;
 const result = await sendMasterClassNotification({
  registrationId: "42",
  env: {},
  fetchImpl: async () => { called = true; },
 });
 assert.deepEqual(result, { skipped: true });
 assert.equal(called, false);
});

test("sends notification with authorization and idempotency headers", async () => {
 let request;
 const result = await sendMasterClassNotification({
  registrationId: "42",
  env,
  fetchImpl: async (url, options) => {
   request = { url, options };
   return new Response(JSON.stringify({ id: "email_123" }), { status: 200 });
  },
 });

 assert.deepEqual(result, { sent: true });
 assert.equal(request.url, "https://api.resend.com/emails");
 assert.equal(request.options.headers.Authorization, "Bearer re_test_key");
 assert.equal(request.options.headers["Idempotency-Key"], "master-class-rsvp/42");
 assert.equal(JSON.parse(request.options.body).from, "SU Brass Ensemble <rsvp@subrass.org>");
});

test("sends the registrant confirmation with its own idempotency key", async () => {
 let request;
 const result = await sendMasterClassConfirmation({
  registrationId: "42",
  email: "louise@example.com",
  firstName: "Louise",
  env,
  fetchImpl: async (url, options) => {
   request = { url, options };
   return new Response(JSON.stringify({ id: "email_confirmation_123" }), { status: 200 });
  },
 });

 assert.deepEqual(result, { sent: true });
 assert.equal(request.options.headers["Idempotency-Key"], "master-class-confirmation/42");
 assert.deepEqual(JSON.parse(request.options.body).to, ["louise@example.com"]);
});

test("surfaces a Resend API failure to the caller", async () => {
 await assert.rejects(
  sendMasterClassNotification({
   registrationId: "42",
   env,
   fetchImpl: async () => new Response("domain not verified", { status: 403 }),
  }),
  /Resend notification failed \(403\): domain not verified/
 );
});

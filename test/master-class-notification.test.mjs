import assert from "node:assert/strict";
import test from "node:test";

import {
 buildMasterClassNotification,
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

const RESEND_EMAILS_ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_FROM = "SU Brass Ensemble <rsvp@subrass.org>";
const DEFAULT_REPLY_TO = "subrass@syr.edu";
const ADMIN_URL = "https://subrass.syr.edu/master-class/admin";

function recipients(value) {
 return typeof value === "string"
  ? value.split(",").map((email) => email.trim()).filter(Boolean)
  : [];
}

export function buildMasterClassNotification({ registrationId, env = process.env }) {
 const to = recipients(env.RSVP_NOTIFICATION_TO);
 if (!env.RESEND_API_KEY || to.length === 0) return null;

 return {
  endpoint: RESEND_EMAILS_ENDPOINT,
  apiKey: env.RESEND_API_KEY,
  idempotencyKey: `master-class-rsvp/${registrationId}`,
  payload: {
   from: env.RSVP_FROM_EMAIL || DEFAULT_FROM,
   to,
   reply_to: env.RSVP_REPLY_TO || DEFAULT_REPLY_TO,
   subject: "New master class RSVP received",
   text: `A new high school master class RSVP has been received. Review it securely in the SU Brass Ensemble admin: ${ADMIN_URL}`,
   html: `<p>A new high school master class RSVP has been received.</p><p><a href="${ADMIN_URL}">Review the registration securely in the SU Brass Ensemble admin</a>.</p><p>This notification intentionally excludes student contact information and registration notes.</p>`,
  },
 };
}

export async function sendMasterClassNotification({ registrationId, env = process.env, fetchImpl = fetch }) {
 const notification = buildMasterClassNotification({ registrationId, env });
 if (!notification) return { skipped: true };

 const response = await fetchImpl(notification.endpoint, {
  method: "POST",
  headers: {
   "Content-Type": "application/json",
   Authorization: `Bearer ${notification.apiKey}`,
   "Idempotency-Key": notification.idempotencyKey,
  },
  body: JSON.stringify(notification.payload),
 });

 if (!response.ok) {
  const details = await response.text().catch(() => "");
  throw new Error(`Resend notification failed (${response.status})${details ? `: ${details}` : ""}`);
 }

 return { sent: true };
}

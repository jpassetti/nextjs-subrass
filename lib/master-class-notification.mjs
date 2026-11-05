const RESEND_EMAILS_ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_FROM = "SU Brass Ensemble <rsvp@subrass.org>";
const DEFAULT_REPLY_TO = "subrass@syr.edu";
const ADMIN_URL = "https://subrass.syr.edu/master-class/admin";
const EVENT_URL = "https://subrass.syr.edu/concerts/america250/master-class";

const registrationTypeLabels = {
 community: "college/community musician",
 educator: "music educator group",
 individual: "high school student",
};

function recipients(value) {
 return typeof value === "string"
  ? value.split(",").map((email) => email.trim()).filter(Boolean)
  : [];
}

function escapeHtml(value) {
 return String(value || "").replace(/[&<>'"]/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
 })[character]);
}

export function buildMasterClassNotification({ registrationId, registrationType = "individual", env = process.env }) {
 const to = recipients(env.RSVP_NOTIFICATION_TO);
 if (!env.RESEND_API_KEY || to.length === 0) return null;
 const typeLabel = registrationTypeLabels[registrationType] || "musician";

 return {
  endpoint: RESEND_EMAILS_ENDPOINT,
  apiKey: env.RESEND_API_KEY,
  idempotencyKey: `master-class-rsvp/${registrationId}`,
  payload: {
   from: env.RSVP_FROM_EMAIL || DEFAULT_FROM,
   to,
   reply_to: env.RSVP_REPLY_TO || DEFAULT_REPLY_TO,
   subject: `New ${typeLabel} master class RSVP`,
   text: `A new ${typeLabel} master class RSVP has been received. Review it securely in the SU Brass Ensemble admin: ${ADMIN_URL}`,
   html: `<p>A new ${typeLabel} master class RSVP has been received.</p><p><a href="${ADMIN_URL}">Review the registration securely in the SU Brass Ensemble admin</a>.</p><p>This notification intentionally excludes registrant contact information and registration notes.</p>`,
  },
 };
}

export function buildMasterClassConfirmation({ registrationId, email, firstName, env = process.env }) {
 if (!env.RESEND_API_KEY || !email) return null;
 const greeting = firstName ? `Hi ${firstName},` : "Hello,";
 const safeGreeting = firstName ? `Hi ${escapeHtml(firstName)},` : "Hello,";
 const replyTo = env.RSVP_REPLY_TO || DEFAULT_REPLY_TO;

 return {
  endpoint: RESEND_EMAILS_ENDPOINT,
  apiKey: env.RESEND_API_KEY,
  idempotencyKey: `master-class-confirmation/${registrationId}`,
  payload: {
   from: env.RSVP_FROM_EMAIL || DEFAULT_FROM,
   to: [email],
   reply_to: replyTo,
   subject: "Your America 250 masterclass RSVP",
   text: `${greeting}\n\nYour RSVP for the free America 250 musician masterclass has been received. We look forward to welcoming you.\n\nMASTERCLASS DETAILS\nFriday, Nov. 13, 2026\n4–5 p.m.\nHendricks Chapel\n121 Crouse Drive\nSyracuse, NY 13244\n\nPARKING AND ARRIVAL\nFree public parking is available at Irving Garage, Stadium Place, Syracuse, NY 13210. Please allow additional time to park and walk to Hendricks Chapel.\n\nGUESTS AND OPTIONAL HEADCOUNT\nFriends, family members, and other supporters are welcome to attend the masterclass and sit in the audience. Registration is not required for guests or concert audience members.\n\nIf you know who may be joining you, please reply with a rough estimate. This simply helps us plan seating and prepare for the day.\n\nMasterclass audience guests: ___\nConcert attendees in your group: ___\n\nFREE AMERICA 250 CONCERT\nEveryone is invited to stay for the concert at 6:30 p.m. The Syracuse University Brass Ensemble and the 10th Mountain Division Band will each perform before joining together for the finale.\n\nSHARE WITH OTHERS\nKnow another musician who may be interested? Please forward this email or share the event link. High school students, college musicians, and adult community musicians of all skill and experience levels are welcome.\n${EVENT_URL}\n\nQUESTIONS OR ACCOMMODATIONS\nReply to this email or contact ${replyTo}.`,
   html: `<p>${safeGreeting}</p><p>Your RSVP for the <strong>free America 250 musician masterclass</strong> has been received. We look forward to welcoming you.</p><h2 style="font-size:18px;margin:24px 0 8px;">Masterclass details</h2><p><strong>Friday, Nov. 13, 2026</strong><br>4–5 p.m.<br>Hendricks Chapel<br>121 Crouse Drive<br>Syracuse, NY 13244</p><h2 style="font-size:18px;margin:24px 0 8px;">Parking and arrival</h2><p><strong>Free public parking</strong> is available at Irving Garage, Stadium Place, Syracuse, NY 13210. Please allow additional time to park and walk to Hendricks Chapel.</p><h2 style="font-size:18px;margin:24px 0 8px;">Guests and optional headcount</h2><p>Friends, family members, and other supporters are welcome to attend the masterclass and sit in the audience. Registration is not required for guests or concert audience members.</p><p>If you know who may be joining you, please reply with a rough estimate. This simply helps us plan seating and prepare for the day.</p><p><strong>Masterclass audience guests:</strong> ___<br><strong>Concert attendees in your group:</strong> ___</p><p><a href="mailto:${replyTo}?subject=America%20250%20attendance%20estimate">Reply with an optional attendance estimate</a></p><h2 style="font-size:18px;margin:24px 0 8px;">Free America 250 concert</h2><p>Everyone is invited to stay for the concert at <strong>6:30 p.m.</strong> The Syracuse University Brass Ensemble and the 10th Mountain Division Band will each perform before joining together for the finale.</p><h2 style="font-size:18px;margin:24px 0 8px;">Share with others</h2><p>Know another musician who may be interested? Please forward this email or share the event link. High school students, college musicians, and adult community musicians of all skill and experience levels are welcome.</p><p><a href="${EVENT_URL}">Share masterclass and event information</a></p><h2 style="font-size:18px;margin:24px 0 8px;">Questions or accommodations</h2><p>Reply to this email or contact <a href="mailto:${replyTo}">${replyTo}</a>.</p>`,
  },
 };
}

async function sendEmail(delivery, fetchImpl, errorLabel) {
 if (!delivery) return { skipped: true };

 const response = await fetchImpl(delivery.endpoint, {
  method: "POST",
  headers: {
   "Content-Type": "application/json",
   Authorization: `Bearer ${delivery.apiKey}`,
   "Idempotency-Key": delivery.idempotencyKey,
  },
  body: JSON.stringify(delivery.payload),
 });

 if (!response.ok) {
  const details = await response.text().catch(() => "");
  throw new Error(`${errorLabel} failed (${response.status})${details ? `: ${details}` : ""}`);
 }

 return { sent: true };
}

export async function sendMasterClassNotification({ registrationId, registrationType = "individual", env = process.env, fetchImpl = fetch }) {
 const notification = buildMasterClassNotification({ registrationId, registrationType, env });
 if (!notification) return { skipped: true };
 return sendEmail(notification, fetchImpl, "Resend notification");
}

export async function sendMasterClassConfirmation({ registrationId, email, firstName, env = process.env, fetchImpl = fetch }) {
 const confirmation = buildMasterClassConfirmation({ registrationId, email, firstName, env });
 return sendEmail(confirmation, fetchImpl, "Resend confirmation");
}

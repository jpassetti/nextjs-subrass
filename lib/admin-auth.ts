import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "subrass_master_class_admin";
const SESSION_DURATION_SECONDS = 60 * 60 * 12;

function getSessionSecret() {
 const secret = process.env.MASTER_CLASS_ADMIN_SESSION_SECRET;
 if (!secret) throw new Error("MASTER_CLASS_ADMIN_SESSION_SECRET is not configured");
 return secret;
}

function safeEqual(left: string, right: string) {
 const leftBuffer = Buffer.from(left);
 const rightBuffer = Buffer.from(right);
 return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

export function isValidAdminPassword(password: string) {
 const expected = process.env.MASTER_CLASS_ADMIN_PASSWORD;
 return Boolean(expected && safeEqual(password, expected));
}

export function createAdminSessionToken() {
 const expiresAt = Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS;
 const payload = String(expiresAt);
 const signature = createHmac("sha256", getSessionSecret()).update(payload).digest("hex");
 return `${payload}.${signature}`;
}

export async function isAdminAuthenticated() {
 const token = (await cookies()).get(ADMIN_COOKIE_NAME)?.value;
 if (!token) return false;

 const [expiresAt, signature] = token.split(".");
 if (!expiresAt || !signature || Number(expiresAt) < Math.floor(Date.now() / 1000)) return false;

 const expected = createHmac("sha256", getSessionSecret()).update(expiresAt).digest("hex");
 return safeEqual(signature, expected);
}

export const adminSessionMaxAge = SESSION_DURATION_SECONDS;

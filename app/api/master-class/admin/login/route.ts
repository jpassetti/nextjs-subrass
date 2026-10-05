import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, adminSessionMaxAge, createAdminSessionToken, isValidAdminPassword } from "../../../../../lib/admin-auth";

export async function POST(request: Request) {
 const contentType = request.headers.get("content-type") || "";
 const password = contentType.includes("application/json")
  ? (await request.json()).password
  : (await request.formData()).get("password");

 if (typeof password !== "string" || !isValidAdminPassword(password)) {
  return NextResponse.redirect(new URL("/master-class/admin/login?error=1", request.url), 303);
 }

 const response = NextResponse.redirect(new URL("/master-class/admin", request.url), 303);
 response.cookies.set(ADMIN_COOKIE_NAME, createAdminSessionToken(), {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  path: "/",
  maxAge: adminSessionMaxAge,
 });
 return response;
}

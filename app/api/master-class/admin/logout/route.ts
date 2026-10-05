import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME } from "../../../../../lib/admin-auth";

export async function POST(request: Request) {
 const response = NextResponse.redirect(new URL("/master-class/admin/login", request.url), 303);
 response.cookies.set(ADMIN_COOKIE_NAME, "", { expires: new Date(0), path: "/" });
 return response;
}

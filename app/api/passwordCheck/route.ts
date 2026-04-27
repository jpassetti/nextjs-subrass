import { NextResponse } from "next/server";

export async function POST(request) {
 const { password } = await request.json();

 if (password === process.env.SECRET_GOOGLE_DRIVE_PW) {
  return NextResponse.json({ success: true }, { status: 200 });
 }

 return NextResponse.json(
  { success: false, message: "Incorrect password" },
  { status: 401 }
 );
}

export async function GET() {
 return new NextResponse(null, { status: 405 });
}
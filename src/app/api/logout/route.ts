
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(request: Request) {
  const response = NextResponse.json({ message: "Logged Out" });

  response.cookies.set("username", "", {
    path: "/",
    expires: new Date(0),
  });

  return response;
}

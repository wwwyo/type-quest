import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// delete access token
export async function GET(req: NextRequest) {
  const access_token = cookies().get("qiita_access_token")?.value;
  await fetch(`https://qiita.com/api/v2/access_tokens/${access_token}`, {
    method: "DELETE",
  });

  const response = NextResponse.redirect(new URL("/signup", req.url));
  response.cookies.set("qiita_access_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    path: "/",
  });
  return response;
}

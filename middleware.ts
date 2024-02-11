import { NextRequest, NextResponse } from "next/server";
import { NextMiddlewareResult } from "next/dist/server/web/types";
import { cookies } from "next/headers";

export function middleware(req: NextRequest): NextMiddlewareResult | Response {
  // コンストラクタからURLオブジェクトを取得
  const url = req.nextUrl.clone();

  if (url.pathname === "/" || url.pathname.startsWith("/oauth")) {
    return NextResponse.next();
  }

  // Cookieを取得
  const token = cookies().get("qiita_access_token")?.value;

  // トークンがない場合、signupページにリダイレクト
  if (!token) {
    url.pathname = "/signup";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|static|_next|favicon.ico|robots.txt|signup|signout).*)"],
};

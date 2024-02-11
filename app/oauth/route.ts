import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const state = new URL(req.url).searchParams.get("state");
  const code = new URL(req.url).searchParams.get("code");

  if (state !== process.env.NEXT_PUBLIC_QIITA_OAUTH_STATE || !code) {
    return new Response("not found", { status: 404 });
  }

  const accessToken = await getAccessToken(code);
  console.log(accessToken);
  if (accessToken === undefined) {
    return notFound();
  }

  const qiita = await fetch("https://qiita.com/api/v2/authenticated_user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then(
    (res) =>
      res.json() as Promise<{
        id: string;
        name: string;
        profile_image_url: string;
        items_count: number;
        twitter_screen_name: string;
        github_login_name: string;
      }>
  );

  await prisma.user.upsert({
    where: {
      qiitaId: qiita.id,
    },
    update: {
      name: qiita.name || qiita.github_login_name || qiita.twitter_screen_name,
      image: qiita.profile_image_url,
      itemCount: qiita.items_count,
    },
    create: {
      name: qiita.name || qiita.github_login_name || qiita.twitter_screen_name,
      qiitaId: qiita.id,
      image: qiita.profile_image_url,
      itemCount: qiita.items_count,
    },
  });

  // リダイレクト top page
  const response = NextResponse.redirect(new URL("/", req.url));
  response.cookies.set("qiita_access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    path: "/",
  });

  return response;
}

const getAccessToken = async (code: string) => {
  const res = await fetch("https://qiita.com/api/v2/access_tokens", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.NEXT_PUBLIC_QIITA_CLIENT_ID,
      client_secret: process.env.QIITA_CLIENT_SECRET,
      code,
    }),
  }).then((res) => res.json());

  return res.token;
};

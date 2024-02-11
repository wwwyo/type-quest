"use server";

import { cookies } from "next/headers";

export const getQiitaUser = async () => {
  const accessToken = cookies().get("qiita_access_token")?.value;
  if (!accessToken) {
    return null;
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
      }>
  );
  return qiita;
};

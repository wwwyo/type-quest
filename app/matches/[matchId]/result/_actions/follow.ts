"use server";

import { cookies } from "next/headers";

export const follow = async (_: any, formData: FormData) => {
  const user_id = formData.get("userId");
  const token = cookies().get("qiita_access_token")?.value;
  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    await fetch(`https://qiita.com/api/v2/users/${user_id}/following`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
    return { ok: true };
  } catch (e) {
    return new Response("Failed to follow", { status: 500 });
  }
};

import { headers } from "next/headers";

export const getDoc = async (
  questionOriginalId: string,
  type: "description" | "default-code" | "test-code"
): Promise<string> => {
  const headersData = headers();
  const protocol = headersData.get("x-forwarded-proto");
  const host = headersData.get("host");

  const res = await fetch(
    `${protocol}://${host}/questions/${questionOriginalId}/${type}.${fileType[type]}`
  );
  return await res.text();
};

const fileType = {
  description: "md",
  "default-code": "ts",
  "test-code": "ts",
} as const;

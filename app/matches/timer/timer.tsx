"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export const Timerc = ({
  matchId,
  children,
}: {
  matchId: number;
  children: ReactNode;
}) => {
  const router = useRouter();
  router.push(`/matches/${matchId}`);

  return <div>{children}</div>;
};

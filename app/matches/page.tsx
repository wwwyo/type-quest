import { prisma } from "@/lib/prisma";
import { getQiitaUser } from "../_fetch/get-user";
import { notFound } from "next/navigation";
import { Timerc } from "./timer/timer";

export default async function Page() {
  const qiita = await getQiitaUser();
  const user = await prisma.user.findUnique({ where: { qiitaId: qiita?.id } });
  if (!user) return notFound();
  const questions = await prisma.question.findMany();
  // 3つ取得
  const question3 = questions.slice(0, 3);
  const match = await prisma.match.create({
    data: {
      playerOneId: user.id,
      playerTwoId: 1,
      status: "PLAYING",
      matchQuestions: {
        create: question3.map((question) => ({
          question: { connect: { id: question.id } },
        })),
      },
    },
  });

  return <Timerc matchId={match.id}>まもなく対戦開始</Timerc>;
}

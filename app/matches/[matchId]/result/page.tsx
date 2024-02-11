import { getQiitaUser } from "@/app/_fetch/get-user";
import { prisma } from "@/lib/prisma";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SubmitForm } from "./_components/submit-form";

export default async function Page({
  params,
}: {
  params: { matchId: string };
}) {
  const { matchId } = params;
  const qiitaUser = await getQiitaUser();
  const user = await prisma.user.findUnique({
    where: { qiitaId: qiitaUser?.id },
  });

  const match = await prisma.match.findUnique({
    select: {
      id: true,
      playerOneId: true,
      playerTwoId: true,
      winnerId: true,
    },
    where: { id: +matchId },
  });

  const enemy = await prisma.user.findUnique({
    where: {
      id:
        user?.id === match?.playerOneId
          ? match?.playerTwoId
          : match?.playerOneId,
    },
  });

  return (
    <div className="grid gap-y-10 p-10">
      <div className="text-2xl">
        {user?.id === match?.winnerId ? "あなたの勝利です" : "あなたの負けです"}
      </div>
      <div className="border w-fit px-6 py-3 rounded-md flex justify-end gap-x-4 items-center">
        <div className="grid gap-y-1">
          <span>{enemy?.name}</span>
          <span className="green-500">投稿数: {enemy?.itemCount}</span>
        </div>
        <Avatar>
          <AvatarImage src={enemy?.image} />
          <AvatarFallback>{enemy?.name}</AvatarFallback>
        </Avatar>
        {enemy && <SubmitForm enemy={enemy} />}
      </div>
    </div>
  );
}

import { ScrollArea } from "@/components/ui/scroll-area";
import { TypeChallengeForm } from "./_components/type-challenge-form";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { QuestionDescriptionMarkdown } from "./_components/question-description-markdown";
import { getDoc } from "./_fetch/get-doc";
import { Suspense } from "react";
import { Loading } from "@/components/ui/loading";
import { Separator } from "@/components/ui/separator";
import { getQiitaUser } from "@/app/_fetch/get-user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check } from "lucide-react";
import { redirect } from "next/navigation";

export default async function Page({
  params,
  searchParams,
}: {
  params: { matchId: string };
  searchParams: { questId?: string };
}) {
  const { matchId } = params;
  const { questId } = searchParams;

  const qiita = await getQiitaUser();
  const user = await prisma.user.findUnique({
    where: { qiitaId: qiita?.id },
  });

  if (!user) {
    return <div>ユーザーが見つかりません</div>;
  }

  const match = await prisma.match.findUnique({
    select: {
      id: true,
      status: true,
      playerOneId: true,
      playerTwoId: true,
      matchQuestions: {
        select: {
          id: true,
          question: {
            select: {
              id: true,
              originalId: true,
            },
          },
          submissions: {
            select: {
              id: true,
              userId: true,
              isCorrect: true,
            },
          },
        },
      },
    },
    where: { id: +matchId },
  });

  const enemyId =
    user.id === match?.playerOneId ? match?.playerTwoId : match?.playerOneId;
  const enemy = enemyId
    ? await prisma.user.findUnique({
        where: { id: enemyId },
      })
    : undefined;

  const isCurrentQuest = (id: number): boolean => id === Number(questId);
  const currentQuest = match?.matchQuestions.find((quest) =>
    isCurrentQuest(quest.id)
  );

  const defaultCode = currentQuest
    ? await getDoc(currentQuest.question.originalId, "default-code")
    : undefined;

  // 正解済みかチェックする
  const isCorrect = (matchQuest: { submissions: any[] }) => {
    return matchQuest.submissions.find(
      (sub) => sub.userId === user.id && sub.isCorrect
    );
  };

  // isCorrect count
  const correctCount = match?.matchQuestions.filter((q) =>
    q.submissions.some((sub) => {
      return sub.userId === user.id && sub.isCorrect;
    })
  ).length;
  if (Number(correctCount) >= 2) {
    redirect(`/matches/${+matchId}/result`);
  }

  return (
    <div className="grid grid-cols-2 gap-x-5">
      <div>
        {/* タブ */}
        <div className="flex items-center gap-x-3 mt-7">
          <div className="font-bold text-2xl">Quest</div>
          <ul className="flex gap-x-2">
            {match?.matchQuestions.map((quest, idx) => (
              <Button
                key={quest.id}
                variant={isCurrentQuest(quest.id) ? "default" : "outline"}
                size="icon"
                asChild
                disabled={isCorrect(quest)}
              >
                <a href={`?questId=${quest.id}`}>
                  {isCorrect(quest) && <Check width={17} />}
                  {idx + 1}
                </a>
              </Button>
            ))}
          </ul>
        </div>

        <div>
          <ScrollArea className="h-[35vh] pt-5 grid">
            {currentQuest ? (
              <Suspense fallback={<Loading darken />}>
                <QuestionDescriptionMarkdown
                  questionOriginalId={currentQuest.question.originalId}
                />
              </Suspense>
            ) : (
              <div className="mt-10">Questを選択してね</div>
            )}
          </ScrollArea>
          <Separator className="w-full my-10" />
          {/* icon */}
          <div className="h-full pt-5 grid w-full gap-y-5">
            <div className="border justify-self-end w-fit px-6 py-3  rounded-md flex justify-end gap-x-4 items-center">
              <div className="grid gap-y-1">
                <span>{enemy?.name}</span>
                <span className="green-500">投稿数: {enemy?.itemCount}</span>
              </div>
              <Avatar>
                <AvatarImage src={enemy?.image} />
                <AvatarFallback>{enemy?.name}</AvatarFallback>
              </Avatar>
            </div>

            <ScrollArea className="w-full border border-black h-40 rounded-md px-10 grid">
              <p className="mt-10">{enemy?.name}がバトルを仕掛けてきた</p>
              <div className="mt-4 grid gap-y-2">
                {match?.matchQuestions.map((quest, idx) =>
                  quest.submissions.map((sub) => (
                    <div key={sub.id} className="flex gap-x-2">
                      <div>
                        {sub.userId === user.id ? "自分の提出" : "敵の提出"}:
                      </div>
                      <div className="">
                        {sub.isCorrect ? "正解" : "不正解"}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>

            <div className="border w-fit px-6 py-3 bg-green-400 text-white rounded-md flex gap-x-4 items-center">
              <Avatar>
                <AvatarImage src={user.image} />
                <AvatarFallback>{user.name}</AvatarFallback>
              </Avatar>
              <div className="grid gap-y-1">
                <span>{user.name}</span>
                <span className="green-500">投稿数: {user.itemCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-10">
        {currentQuest && isCorrect(currentQuest) ? (
          <div className="border-green-500 rounded-md h-full w-full border">
            <div className="text-green-500 text-3xl p-10">攻略済み</div>
          </div>
        ) : currentQuest ? (
          <TypeChallengeForm
            matchId={matchId}
            questionId={currentQuest.question.id}
            matchQuestionId={currentQuest.id}
            sutCode={defaultCode ?? ""}
          />
        ) : null}
      </div>
    </div>
  );
}

import { ScrollArea } from "@/components/ui/scroll-area";
import { TypeChallengeForm } from "./_components/type-challenge-form";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { QuestionDescriptionMarkdown } from "./_components/question-description-markdown";
import { getDoc } from "./_fetch/get-doc";
import { Suspense } from "react";
import { Loading } from "@/components/ui/loading";
import { Separator } from "@/components/ui/separator";

export default async function Page({
  params,
  searchParams,
}: {
  params: { matchId: string };
  searchParams: { questId?: string };
}) {
  const { matchId } = params;
  const { questId } = searchParams;

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
        },
      },
    },
    where: { id: +matchId },
  });

  const isCurrentQuest = (id: number): boolean => id === Number(questId);
  const currentQuest = match?.matchQuestions.find((quest) =>
    isCurrentQuest(quest.id)
  );

  const defaultCode = currentQuest
    ? await getDoc(currentQuest.question.originalId, "default-code")
    : undefined;

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
              >
                <a href={`?questId=${quest.id}`}>{idx + 1}</a>
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
          <div className="h-full pt-5 grid">
            <div className="border p-2 rounded-md w-80 flex justify-end">
              <div className="flex gap-x-1">
                <span>山田 太郎</span>
                <span className="green-500">Contribute</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-10">
        {currentQuest ? (
          <TypeChallengeForm
            questionId={currentQuest.id}
            sutCode={defaultCode ?? ""}
          />
        ) : null}
      </div>
    </div>
  );
}

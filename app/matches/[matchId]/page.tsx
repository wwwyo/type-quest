import { ScrollArea } from "@/components/ui/scroll-area";
import { TypeChallengeForm } from "./_components/type-challenge-form";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

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
              description: true,
              defaultCode: true,
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

  return (
    <div className="grid grid-cols-2">
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

        <ScrollArea className="h-[80vh] grid">
          <div>
            {currentQuest ? (
              <div>
                <h1 className="text-2xl font-bold">
                  {currentQuest.question.description}
                </h1>
              </div>
            ) : (
              <div className="mt-10">Questを選択してね</div>
            )}
          </div>
        </ScrollArea>
      </div>
      <div className="pt-10">
        {currentQuest ? (
          <TypeChallengeForm
            questionId={currentQuest.id}
            sutCode={currentQuest.question.defaultCode}
          />
        ) : null}
      </div>
    </div>
  );
}

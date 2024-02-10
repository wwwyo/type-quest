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

  // prisma でmatchを取得
  const match = await prisma.match.findUnique({
    select: { id: true, status: true },
    where: { id: +matchId },
  });

  return (
    <div className="grid grid-cols-2">
      <ScrollArea className="h-[90vh]">
        <div className="font-bold text-lg">クエスト</div>
        <ul className="flex gap-x-2">
          {["1", "2", "3"].map((id) => (
            <Button
              key={id}
              variant={questId === id ? "default" : "outline"}
              size="sm"
              asChild
            >
              <a href={`?questId=${id}`}>{id}</a>
            </Button>
          ))}
        </ul>
      </ScrollArea>
      <div className="grid h-full">
        <TypeChallengeForm
          questionId="1"
          sutCode="type Condition<T, U> = T extends U ? T : unknown;"
        />
      </div>
    </div>
  );
}

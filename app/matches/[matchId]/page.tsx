import { ScrollArea } from "@/components/ui/scroll-area";
import { TypeChallengeForm } from "./_components/type-challenge-form";
import { Button } from "@/components/ui/button";

export default function Page({
  params,
  searchParams,
}: {
  params: { matchId: string };
  searchParams: { quest?: string };
}) {
  const { matchId } = params;
  const { quest } = searchParams;
  // get random

  return (
    <div className="grid grid-cols-2">
      <ScrollArea className="h-[90vh]">
        <div className="font-bold text-lg">クエスト</div>
        <ul className="flex gap-x-2">
          {["1", "2", "3"].map((id) => (
            <Button
              key={id}
              variant={quest === id ? "default" : "outline"}
              size="sm"
              asChild
            >
              <a href={`?quest=${id}`}>{id}</a>
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

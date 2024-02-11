"use client";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { follow } from "../_actions/follow";
import { useFormState } from "react-dom";

export const SubmitForm = ({ enemy }: { enemy: User }) => {
  const [state, formAction] = useFormState(follow, { ok: false });

  return (
    <div className="grid gap-y-2">
      <form action={formAction}>
        <input type="hidden" name="userId" value={enemy.qiitaId} />
        <Button className="w-fit">対戦相手とつながる</Button>
      </form>

      {state.ok && (
        <div className="grid gap-y-2">
          <p>フォローしました</p>
          <Button variant="link" asChild>
            <a href="/">ホームに戻る</a>
          </Button>
        </div>
      )}
    </div>
  );
};

"use client";

import { checkType } from "../../_actions/check";
import { FC } from "react";
import { useFormState } from "react-dom";
import { SubmitButton } from "./submit-button";

type Props = {
  questionId: string;
  sutCode: string;
};

export const TypeChallengeForm: FC<Props> = (defaultValues) => {
  const [state, formAction] = useFormState(checkType, { type: "initial" });

  return (
    <form action={formAction} className="grid w-full">
      {state.type === "error" ? (
        <div>
          {state.errors.questionId && (
            <p className="text-red-500">{state.errors.questionId}</p>
          )}
          {state.errors.sutCode && (
            <p className="text-red-500">{state.errors.sutCode}</p>
          )}
        </div>
      ) : state.type === "failed" ? (
        <div>
          <p>{state.message}</p>
        </div>
      ) : null}
      <input type="hidden" name="questionId" id={defaultValues.questionId} />
      <textarea
        className="border p-4"
        name="sutCode"
        defaultValue={defaultValues.sutCode}
      />
      <SubmitButton />
    </form>
  );
};

"use client";

import { checkType } from "../../_actions/check";
import { FC, useState } from "react";
import { useFormState } from "react-dom";
import { SubmitButton } from "./submit-button";
import Editor from '@monaco-editor/react'

type Props = {
  questionId: string;
  sutCode: string;
};

export const TypeChallengeForm: FC<Props> = (defaultValues) => {
  const [code, setCode] = useState(defaultValues.sutCode);
  const [state, formAction] = useFormState(checkType, { type: "initial" });

  return (
    <form action={formAction} className="grid w-full gap-y-5">
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
        readOnly
        className="hidden"
        name="sutCode"
        value={code}
      />
      {/* https://www.npmjs.com/package/@monaco-editor/react */}
      <Editor className="rounded-md border-2 border-green-500" height="80vh" width="100%" defaultLanguage="typescript" value={code} onChange={(v) => v && setCode(v)} />
      <SubmitButton />
    </form>
  );
};

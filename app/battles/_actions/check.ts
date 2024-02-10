"use server";

import { ServerError, TestError } from "@/lib/errors";
import { exec } from "child_process";
import { unlinkSync, writeFileSync } from "fs";
import path from "path";
import { z } from "zod";

const schema = z.object({
  questionId: z.string(),
  sutCode: z.string(),
});
type Response =
  | {
      type: "initial";
    }
  | {
      type: "error";
      errors: {
        questionId?: string[] | undefined;
        sutCode?: string[] | undefined;
      };
    }
  | {
      type: "failed";
      message: string;
    }
  | {
      type: "success";
      message: string;
    };

/**
 * server actions for the type check
 * @param questionId - 問題番号
 * @param sutCode - ユーザーが提出したコード
 */
export const checkType = async (
  _: any,
  formData: FormData
): Promise<Response> => {
  const parsedData = schema.safeParse({
    questionId: formData.get("questionId"),
    sutCode: formData.get("sutCode"),
  });

  if (!parsedData.success) {
    return { type: "error", errors: parsedData.error.flatten().fieldErrors };
  }

  // get test code
  const testCode = await getTestCode(parsedData.data.questionId);
  const result = await evaluateTestCode(parsedData.data.sutCode, testCode);
  if (result instanceof TestError) {
    return { type: "failed", message: result.message };
  } else if (result instanceof ServerError) {
    return { type: "error", errors: { sutCode: [result.message] } };
  }
  return { type: "success", message: result };
};

/**
 * test codeを取得
 * @param questionId - 問題番号
 */
const getTestCode = async (questionId: string): Promise<string> => {
  return `
  import { expectType } from "tsd";
  describe("Check type definitions", () => {
    it("Condition", () => {
      let animal: Condition<"kuma", "inu" | "neko">;

      expectType<unknown>(animal);
    });
  });
  `;
};

/**
 * TypeScriptのコード用のテンプレートファイルとテストファイルを生成し、tsdで型チェックを実施します
 * @param sutCode - ユーザーが提出したコード
 * @param testCode - テストコード
 */
const evaluateTestCode = async (
  sutCode: string,
  testCode: string
): Promise<string | TestError | ServerError> => {
  // tsdファイルとテストファイルを生成
  const testFile = generateTempFile("test", `${sutCode}\n${testCode}`);

  try {
    // jestを使ってテスト実行
    const testResult = await runCommand(`pnpm jest --silent ${testFile}`);
    if (testResult !== "") {
      return new TestError(testResult);
    }
    return testResult;
  } catch (error) {
    const err = new ServerError("Error evaluating TypeScript", {
      cause: error,
    });
    return err;
  } finally {
    // ファイル削除
    deleteFile(testFile);
  }
};

/**
 * ファイルを作成する関数
 * @param file_prefix
 * @param content
 * @returns
 */
const generateTempFile = (file_prefix: string, content: string) => {
  const fileName = `${file_prefix}_${crypto.randomUUID()}.test.ts`;
  const file = path.join(process.cwd(), "files", fileName);
  writeFileSync(file, content);
  return file;
};

const timeout = 10_000;
const maxBuffer = 1024 * 500;
const runCommand = async (command: string): Promise<string> => {
  return new Promise((resolve) => {
    exec(command, { timeout, maxBuffer }, (error, stdout, stderr) => {
      // NOTE: 通った場合は何も帰らない, 失敗した場合はエラーメッセージが帰る
      if (error) {
        resolve(stderr);
      } else {
        resolve(stdout);
      }
    });
  });
};

const deleteFile = (fileName: string) => {
  unlinkSync(fileName);
};

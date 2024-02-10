"use server";

import { exec } from "child_process";
import { unlinkSync, writeFileSync } from "fs";

/**
 * server actions for the type check
 * @param questionId - 問題番号
 * @param sutCode - ユーザーが提出したコード
 */
export const checkType = async (formData: FormData) => {
  const questionId = formData.get("questionId");
  const sutCode = formData.get("sutCode");
  if (!validateStr(questionId) || !validateStr(sutCode)) {
    return { ok: false, error: "Invalid data" };
  }

  // get test code
  const testCode = await getTestCode(questionId);
  const result = await evaluateTestCode(sutCode, testCode);
  return { ok: true, result };
};

/**
 * string型であることをチェックする
 * @param check
 */
const validateStr = (check: unknown): check is string => {
  if (typeof check === "string") {
    return true;
  }
  return false;
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
const evaluateTestCode = async (sutCode: string, testCode: string) => {
  // tsdファイルとテストファイルを生成
  const testFileName = generateTempFile("test", `${sutCode}\n${testCode}`);

  try {
    // jestを使ってテスト実行
    const testResult = await runCommand(`pnpm jest --silent ${testFileName}`);
    console.log("Test result:", testResult, "wey");
    return testResult;
  } catch (error) {
    console.error("Error evaluating TypeScript:", error);
    return error;
  } finally {
    // ファイル削除
    deleteFile(testFileName);
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
  writeFileSync(`${fileName}`, content);
  return fileName;
};

const timeout = 10_000;
const maxBuffer = 1024 * 500;
const runCommand = async (command: string): Promise<string> => {
  return new Promise((resolve) => {
    exec(command, { maxBuffer }, (error, stdout, stderr) => {
      // なぜか正常な場合もstderrに出力される
      if (error) {
        console.log("e", error);
        resolve(stderr);
      } else {
        console.log("std", stdout);
        resolve(stdout);
      }
    });
  });
};

const deleteFile = (fileName: string) => {
  unlinkSync(fileName);
};

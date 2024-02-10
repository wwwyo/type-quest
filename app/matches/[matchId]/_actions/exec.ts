import path from "path";
import ts from "typescript";

export const compileAndCheck = (filePath: string) => {
  // TypeScriptファイルの絶対パスを取得
  const absolutePath = path.resolve(filePath);

  // コンパイルオプション
  const options = {
    noEmit: true, // ファイル出力をスキップ
    strict: true, // StrictTypeChecksを有効化
  };

  // プログラムを作成
  const program = ts.createProgram([absolutePath], options);
  const emitResult = program.emit();

  // コンパイルエラーを取得
  const allDiagnostics = ts
    .getPreEmitDiagnostics(program)
    .concat(emitResult.diagnostics);

  // エラーがないか確認
  if (allDiagnostics.length === 0) {
    return;
  }

  // エラーがある場合、それらを出力
  return allDiagnostics.map((diagnostic) => {
    return ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
  });
};

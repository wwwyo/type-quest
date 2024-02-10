/*
  13 - Hello World
  -------
  by Anthony Fu (@antfu) #お試し

  ### 質問

  Hello, World!

  Type Challenges では、型システム自体を使用してアサーションを実行します。

  この課題では、次のコードを変更してテストに合格する必要があります（型チェックエラーなし）。

  ```ts
  // expected to be string
  type HelloWorld = any
  ```

  ```ts
  // you should make this work
  type test = Expect<Equal<HelloWorld, string>>
  ```

  > GitHubで確認する：https://tsch.js.org/13/ja
*/

/* _____________ ここにコードを記入 _____________ */

type HelloWorld = any; // expected to be a string

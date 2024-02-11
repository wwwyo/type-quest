/*
  7 - Readonly
  -------
  by Anthony Fu (@antfu) #初級 #built-in #readonly #object-keys

  ### 質問

  組み込みの型ユーティリティ`Readonly<T>`を使用せず、`T` のすべてのプロパティを読み取り専用にする型を実装します。実装された型のプロパティは再割り当てできません。

  例えば：

  ```ts
  interface Todo {
    title: string
    description: string
  }

  const todo: MyReadonly<Todo> = {
    title: "Hey",
    description: "foobar"
  }

  todo.title = "Hello" // Error: cannot reassign a readonly property
  todo.description = "barFoo" // Error: cannot reassign a readonly property
  ```

  > GitHubで確認する：https://tsch.js.org/7/ja
*/

/* _____________ ここにコードを記入 _____________ */

type MyReadonly<T> = any;

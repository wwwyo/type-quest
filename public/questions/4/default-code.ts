/*
  4 - Pick   > GitHubで確認する：https://tsch.js.org/4/ja
  -------

  ### 質問

  組み込みの型ユーティリティ`Pick<T, K>`を使用せず、`T`から`K`のプロパティを抽出する型を実装します。

  例えば：

  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  type TodoPreview = MyPick<Todo, 'title' | 'completed'>

  const todo: TodoPreview = {
      title: 'Clean room',
      completed: false,
  }
  ```
*/

/* _____________ ここにコードを記入 _____________ */

type MyPick<T, K> = any;

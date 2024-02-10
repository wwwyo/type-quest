Hello, World!

Type Challenges では、型システム自体を使用してアサーションを実行します。

この課題では、次のコードを変更してテストに合格する必要があります（型チェックエラーなし）。

```typescript
// expected to be string
type HelloWorld = any;
// you should make this work
type test = Expect<Equal<HelloWorld, string>>;
```

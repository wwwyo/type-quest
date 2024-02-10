import { checkType } from "./actions/check";

export default function Page() {
  return (
    <div>
      <form action={checkType} className="grid w-full">
        <input type="hidden" name="questionId" value="1" />
        <textarea
          className="border p-4"
          name="sutCode"
          defaultValue="type Condition<T, U> = T extends U ? T : unknown;"
        />
        <button type="submit">提出する</button>
      </form>
    </div>
  );
}

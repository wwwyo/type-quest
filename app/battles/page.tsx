import { TypeChallengeForm } from "./_components/type-challenge-form";

export default function Page() {
  return (
    <div className="grid grid-cols-2">
      <div>title</div>
      <div className="grid h-full">
        <TypeChallengeForm
          questionId="1"
          sutCode="type Condition<T, U> = T extends U ? T : unknown;"
        />
      </div>
    </div>
  );
}

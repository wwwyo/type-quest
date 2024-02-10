import { Loading } from "@/components/ui/loading";

export default function Page() {
  return (
    <div className="text-black relative">
      <div className="absolute inset-0">
        <div className="flex items-center gap-x-2">
          <Loading />
          Matching...
        </div>
        <p>対戦相手を待っています</p>
      </div>
    </div>
  );
}

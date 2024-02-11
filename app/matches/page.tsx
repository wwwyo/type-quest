import { Loading } from "@/components/ui/loading";

export default function Page() {
  console.log(process.env.DATABASE_URL);
  return (
    <div className="text-black relative">
      <div className="absolute inset-0">
        <div className="flex items-center gap-x-2">
          <Loading darken />
          Matching...
        </div>
        <p>対戦相手を待っています</p>
      </div>
    </div>
  );
}

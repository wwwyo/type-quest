import { Loading as LoadingComp } from "@/components/ui/loading";

export default function Loading() {
  return (
    <div className="flex gap-x-1">
      <LoadingComp darken />
      認証中...
    </div>
  );
}

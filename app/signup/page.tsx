import { Button } from "@/components/ui/button";

export default function Page() {
  const oauthUrl = `https://qiita.com/api/v2/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_QIITA_CLIENT_ID}&scope=read_qiita+write_qiita&state=${process.env.QIITA_OAUTH_STATE}`;
  return (
    <>
      <img src="/img/bg.jpg" alt="" className="w-full h-full absolute" />
      <div className="absolute gap-y-20 top-1/3 left-1/2 grid border-green-400 border bg-white/50 rounded-md p-20 -translate-x-1/2">
        <h1 className="text-2xl">Type Quest を始める</h1>
        <Button variant="outline" asChild>
          <a href={`${oauthUrl}`}>Qiita</a>
        </Button>
      </div>
    </>
  );
}

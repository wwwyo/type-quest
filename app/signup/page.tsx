import { Button } from "@/components/ui/button";

export default function Page() {
  const oauthUrl = `https://qiita.com/api/v2/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_QIITA_CLIENT_ID}&scope=read_qiita+write_qiita&state=${process.env.NEXT_PUBLIC_QIITA_OAUTH_STATE}`;
  return (
    <div className="absolute top-1/3 left-1/2 grid gap-y-4">
      <h1 className="text-2xl">Type Quest を始める</h1>
      <Button variant="outline" asChild>
        <a href={`${oauthUrl}`}>Qiita</a>
      </Button>
    </div>
  );
}

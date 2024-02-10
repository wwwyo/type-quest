import { Button } from "@/components/ui/button";
import { Sword, Crown, History } from "lucide-react";
import { FC, ReactNode } from "react";

export default function Page() {
  return (
    <div className="absolute flex flex-col w-80 gap-y-5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-50 rounded-md py-5 px-10">
      <LinkButton>
        <a href="/matches">
          <Sword />
          対戦する
        </a>
      </LinkButton>
      <LinkButton>
        <a href="/ranking">
          <Crown />
          ランキング
        </a>
      </LinkButton>
      <LinkButton>
        <a href="/histories">
          <History />
          履歴
        </a>
      </LinkButton>
    </div>
  );
}

const LinkButton: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="group flex items-center">
      <span className="text-green-900 group-hover:visible invisible">&gt;</span>
      <Button
        variant="link"
        size="lg"
        className="justify-start flex gap-x-2"
        asChild
      >
        {children}
      </Button>
    </div>
  );
};

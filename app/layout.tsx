import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Type Quest",
  description:
    "型の世界へようこそ、type challengeの問題を2本先取した方が勝ちです",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={cn(inter.className, "w-svw h-svh max-h-screen")}>
        <header className="w-full h-14 shadow flex items-center px-10">
          <div className="flex items-center">
            <a
              href="/"
              className="bg-green-500 text-white rounded px-2 font-medium"
            >
              Type Quest
            </a>
          </div>
        </header>
        <main className="relative h-full w-full px-10">{children}</main>
      </body>
    </html>
  );
}

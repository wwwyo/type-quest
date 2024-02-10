import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
      <body className={inter.className}>
        <header className="w-full h-14 shadow flex items-center px-10">
          <div className="container mx-auto flex items-center">
            <a
              href="/"
              className="bg-green-500 text-white rounded py-px px-2 font-medium"
            >
              Type Quest
            </a>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}

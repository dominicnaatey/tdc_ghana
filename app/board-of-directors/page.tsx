import { Metadata } from "next";
import { BoardHero, BoardMembers } from "@/components/board";

export const metadata: Metadata = {
  title: "Board of Directors | TDC Ghana Ltd",
  description: "Meet the distinguished board of directors leading TDC Ghana Ltd towards excellence in real estate development and urban planning.",
};

export default function BoardOfDirectorsPage() {
  return (
    <main className="min-h-screen">
      <BoardHero />
      <BoardMembers />
    </main>
  );
}
import { Metadata } from "next";
import { ManagementHero, ManagementMembers } from "@/components/management";

export const metadata: Metadata = {
  title: "Management Team | TDC Ghana Ltd",
  description: "Meet the experienced management team driving TDC Ghana Ltd's operations and strategic initiatives in real estate development and urban planning.",
};

export default function ManagementPage() {
  return (
    <main className="min-h-screen">
      <ManagementHero />
      <ManagementMembers />
    </main>
  );
}
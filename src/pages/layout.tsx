import UseFormComponent from "@/components/UseForm";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Layout() {
  return (
    <div
      className={`flex min-h-screen bg-white flex-col items-center p-24 ${inter.className}`}
    >
      <div className="w-[400px]">Coming soon...</div>
    </div>
  );
}

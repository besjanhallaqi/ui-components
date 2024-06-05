import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <ul className="flex flex-col items-center gap-4 text-xl">
        <Link href="/layout">Layout</Link>
        <Link href="/form">Form</Link>
        <Link href="/table">Table</Link>
      </ul>
    </main>
  );
}

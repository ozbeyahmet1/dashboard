import { Lexend } from "next/font/google";

const lexend = Lexend({ subsets: ["latin"] });

export default function Home() {
  return <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${lexend.className} `}></main>;
}

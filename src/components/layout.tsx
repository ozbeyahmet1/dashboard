import useConfiguration from "@/hooks/useConfiguration";
import { Lexend } from "next/font/google";
import { PropsWithChildren } from "react";
import { HeadComponent as Head } from "./head";
import { Header } from "./header";
import Sidebar from "./sidebar";
const lexend = Lexend({ subsets: ["latin"] });

export const Layout = ({ children }: PropsWithChildren) => {
  const { data } = useConfiguration();
  if (!data?.mainColor) {
    return <div className={`flex h-full min-h-screen w-full items-start ${lexend.className}`}></div>;
  }
  return (
    <div className={`flex h-full min-h-screen w-full items-start ${lexend.className}`}>
      <Head />
      <Header />
      <div className="hidden lg:block">
        <Sidebar bgColor={data?.mainColor} />
      </div>
      <main className="mt-24 w-full lg:ml-[8.5%] lg:w-11/12 lg:p-8 xl:ml-[20%] xl:w-4/5">{children}</main>
    </div>
  );
};

import { PropsWithChildren } from "react";
import { HeadComponent as Head } from "./head";
import { Header } from "./header";
import Sidebar from "./sidebar";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-full min-h-screen w-full items-start">
      <Head />
      <Header />
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <main className="w-full pt-16 lg:ml-[8.5%] lg:w-11/12 xl:ml-[20%] xl:w-4/5">{children}</main>
    </div>
  );
};
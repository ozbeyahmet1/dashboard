import useSidebar from "@/hooks/useSidebar";
import { SelectedSidebar } from "@/store/features/sidebarSlice";
import { PropsWithBgColor } from "@/utils";
import Link from "next/link";
import { AiOutlineEdit, AiOutlineMenu, AiOutlineTag } from "react-icons/ai";
import { BsGrid } from "react-icons/bs";

export default function Sidebar({ bgColor }: PropsWithBgColor) {
  const { sidebar } = useSidebar();

  return (
    <nav className="fixed flex h-full w-1/12 bg-white xl:w-1/5">
      <div className="w-full px-4 py-12">
        <ul className="mt-20 flex w-full flex-col gap-y-10 rounded-3xl">
          <Link href="/">
            <li
              className={`flex items-center justify-between rounded-md ${
                sidebar == SelectedSidebar.HOMEPAGE ? " text-white" : "bg-transparent"
              }  px-5 py-3  `}
              style={{ background: sidebar == SelectedSidebar.HOMEPAGE ? bgColor : "white" }}
            >
              <p className="hidden xl:block">Homepage</p>
              <BsGrid className="h-5 w-5" />
            </li>
          </Link>
          <Link href="/product/6781">
            <li
              className={`flex items-center justify-between rounded-md ${
                sidebar == SelectedSidebar.PRODUCT ? " text-white" : " bg-transparent"
              } px-5 py-3 `}
              style={{ background: sidebar == SelectedSidebar.PRODUCT ? bgColor : "white " }}
            >
              <p className="hidden xl:block">Product</p>
              <AiOutlineTag className="h-5 w-5" />
            </li>
          </Link>
          <Link href="/edit/6781">
            <li
              className={`flex items-center justify-between rounded-md ${
                sidebar == SelectedSidebar.EDIT ? " text-white" : "bg-transparent"
              } px-5 py-3 `}
              style={{ background: sidebar == SelectedSidebar.EDIT ? bgColor : "white " }}
            >
              <p className="hidden  xl:block">Edit</p>
              <AiOutlineEdit className="h-5 w-5" />
            </li>
          </Link>
        </ul>
      </div>
      <AiOutlineMenu className="md:hidden" size={40} />
    </nav>
  );
}

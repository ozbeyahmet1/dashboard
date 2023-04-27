import { AiOutlineEdit, AiOutlineMenu, AiOutlineTag } from "react-icons/ai";
import { BsGrid } from "react-icons/bs";

export default function Sidebar() {
  return (
    <nav className="fixed flex h-full w-1/12 bg-white xl:w-1/5">
      <div className="w-full px-4 py-12">
        <ul className="mt-20 flex w-full flex-col gap-y-10 rounded-3xl">
          <li className="flex items-center justify-between rounded-md bg-baseColor px-5 py-3 text-white shadow-minimal">
            <p className="hidden xl:block">Homepage</p>
            <BsGrid className="h-5 w-5" />
          </li>
          <li className="flex items-center justify-between rounded-md bg-baseColor px-5 py-3 text-white shadow-minimal">
            <p className="hidden xl:block">Product</p>
            <AiOutlineTag className="h-5 w-5" />
          </li>
          <li className="flex items-center justify-between rounded-md bg-baseColor px-5 py-3 text-white shadow-minimal">
            <p className="hidden  xl:block">Edit</p>
            <AiOutlineEdit className="h-5 w-5" />
          </li>
        </ul>
      </div>
      <AiOutlineMenu className="md:hidden" size={40} />
    </nav>
  );
}

import { ProductCardProps, PropsWithBgColor } from "@/utils";
import Image from "next/image";
import Link from "next/link";

export const ProductCard = ({ id, picture, name, bgColor }: PropsWithBgColor<ProductCardProps>) => {
  return (
    <Link href={`/product/${id}`}>
      <div className=" z-10 cursor-pointer text-gray shadow-minimal">
        <div className="flex  flex-col  items-start rounded-lg">
          <Image src={picture} alt="" width={300} height={300} className="rounded-t-md bg-white" />
          <div className={`w-full rounded-b-md p-5`} style={{ background: bgColor }}>
            <p className="text-xl font-bold text-white">{name}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

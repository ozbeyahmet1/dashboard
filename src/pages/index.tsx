import { ProductCard } from "@/components/productCard";
import { Product } from "@/interface/product";
import { getSingleProductData } from "@/utils";
import { GetStaticProps } from "next";
import { BsGrid } from "react-icons/bs";
type Props = {
  readonly product: Product;
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const endpoint = params?.id ? params.id.toString() : "6781";
  const product: Product = await getSingleProductData(endpoint);

  return {
    props: {
      product,
    },
  };
};

export default function Home({ product: { name, id, picture } }: Props) {
  return (
    <div>
      <div className="mb-5 flex items-center gap-x-2">
        <BsGrid color="white" size={40} className="w-fit rounded-md bg-baseColor p-2" />
        <p className="text-lg">Homepage</p>
      </div>
      <div className="z-40 flex w-full">
        <ProductCard name={name} id={id} picture={picture} key={id} />
      </div>
    </div>
  );
}

import { Product } from "@/interface/product";
import { getSingleProductData } from "@/utils";
import { GetStaticProps } from "next";

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

export default function Home({ product: { name } }: Props) {
  return (
    <div>
      <div className="flex w-full">
        <div>{name}</div>
      </div>
    </div>
  );
}

import { Accordion } from "@/components/accordion";
import useConfiguration from "@/hooks/useConfiguration";
import { Product } from "@/interface/product";
import { Sex } from "@/interface/user";
import { getSingleProductData, getVideoIdFromUrl } from "@/utils";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineTag } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";
import YouTube from "react-youtube";
const Map = dynamic(import("@/components/map"), { ssr: false });

interface Props {
  readonly product: Product;
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  const endpoint = params?.productId ? params.productId.toString() : "";
  const product = await getSingleProductData(endpoint);

  return {
    props: {
      product,
    },
  };
};

const ProductDetails = ({
  product: {
    businessModels,
    categories,
    company,
    description,
    investmentEffort,
    name,
    picture,
    trl,
    type,
    user,
    video,
  },
}: Props) => {
  const router = useRouter();
  const { productId } = router.query;
  const { data } = useConfiguration();

  const twClasses = {
    headers: "mb-2 font-semibold uppercase text-white",
    tagSm: `w-fit rounded-3xl bg-opacity-60 px-3 py-1 text-sm text-white`,
    tagXl: `w-fit rounded-md bg-opacity-60 p-2 text-base lg:text-xl uppercase text-white md:p-3 lg:p-5`,
  };

  return (
    <div className=" w-full rounded-2xl">
      <div className="mb-5 flex items-center gap-x-2">
        <AiOutlineTag
          color="white"
          size={40}
          style={{ background: data?.mainColor }}
          className="w-fit rounded-md p-2"
        />
        <p className="text-lg">Product</p>
      </div>
      {/* Top */}
      <section
        className={`flex w-full items-start gap-2 p-3 lg:gap-8 lg:rounded-tl-2xl lg:rounded-tr-2xl lg:p-8`}
        style={{ background: data?.mainColor }}
      >
        <div className="w-fit rounded-md  border-2 border-gray">
          <Image
            src={picture}
            alt=""
            width={700}
            height={700}
            className="h-[70px] w-[70px] rounded-md bg-white p-2 lg:h-[200px] lg:w-[200px]"
          />
        </div>
        <div className="w-3/4">
          <div className="flex  w-full justify-between">
            <h3 className="text-3xl font-medium text-white lg:text-6xl">{name}</h3>
            <Link href={`/edit/${productId as string}`}>
              <BsPencilSquare size={40} className="cursor-pointer text-white transition-all hover:text-gray" />
            </Link>
          </div>
          <div className="rounded-md ">
            <div className="my-3">
              <p className="w-fit rounded-md border-2 border-white px-2 py-[2px] text-white lg:px-4">{type.name}</p>
            </div>
            <Accordion
              body={<div dangerouslySetInnerHTML={{ __html: description }} contentEditable={false}></div>}
              heading="Description"
            />
          </div>
        </div>
      </section>

      <div className="rounded-bl-2xl rounded-br-2xl bg-gray bg-opacity-50 p-2 lg:p-8">
        {/* Middle */}
        <section className="w-full border-b-[2px] border-dashed border-white">
          <div className="mb-8">
            <h3 className={twClasses.headers}>categories</h3>
            <div className="flex grid-cols-2 gap-2">
              {categories.map((category, i) => {
                return (
                  <p key={i} className={twClasses.tagXl} style={{ background: data?.mainColor }}>
                    {category.name}
                  </p>
                );
              })}
            </div>
          </div>

          <div className="mb-8 flex flex-col items-start gap-6 lg:flex-row lg:items-end">
            <div>
              <h3 className={twClasses.headers}>Business Models</h3>
              <div className="grid grid-cols-2 grid-rows-2 gap-2 gap-x-2 gap-y-2 md:flex">
                {businessModels.map((businessModel, i) => {
                  return (
                    <p className={twClasses.tagSm} key={i} style={{ background: data?.mainColor }}>
                      {businessModel.name}
                    </p>
                  );
                })}
              </div>
            </div>
            <div>
              <h3 className={twClasses.headers}>Investment Effort</h3>
              <p className={twClasses.tagSm} style={{ background: data?.mainColor }}>
                {investmentEffort}
              </p>
            </div>
          </div>
          <div className="mb-8">
            <h3 className={twClasses.headers}>TRL</h3>
            <p className={twClasses.tagSm} style={{ background: data?.mainColor }}>
              {trl.name}
            </p>
          </div>
        </section>

        {/* Video */}
        <section className={`w-full  ${data?.hasUserSection ? "border-b-[2px] border-dashed border-gray " : ""} py-8`}>
          <h3 className={twClasses.headers}>video</h3>
          <YouTube
            videoId={getVideoIdFromUrl(video)}
            id={video}
            iframeClassName="w-full h-auto object-cover xs:h-[300px] md:h-[500px]"
          />
        </section>

        {/* Users */}
        {data?.hasUserSection &&
          <section className="w-full py-8">
            <h3 className={twClasses.headers}>OFFERED BY </h3>
            <div className="flex flex-col items-start gap-3 md:flex-row">
              <Image src={user.profilePicture} width={200} height={400} alt="" className="rounded-full" />
              <div className="w-full">
                <div className="flex w-full flex-col justify-between gap-y-2 md:flex-row">
                  <div className="mb-2 flex flex-col gap-y-2">
                    <p className="text-lg font-normal text-white">
                      {user.lastName},{user.firstName}
                    </p>
                    <p className="text-lg font-normal text-white">{user.email}</p>
                    {user.sex == Sex.male ? (
                      <p className="w-fit rounded-md px-2 py-1 text-white" style={{ background: "#23B8E1" }}>
                        Male
                      </p>
                    ) : (
                      <p className="w-fit rounded-md px-2 py-1 text-white" style={{ background: "pink" }}>
                        Female
                      </p>
                    )}
                  </div>
                  <p className="uppercase text-white">{user.position}</p>
                </div>
                <div className="text-white">
                  <Accordion
                    body={
                      <>
                        <div className="mb-4 flex items-center gap-x-2">
                          <Image
                            src={company.logo}
                            width={100}
                            height={100}
                            alt="logo"
                            className="rounded-sm bg-white p-3"
                          />
                          <div>
                            <h2>{company.name}</h2>
                            <h3>
                              {company.address.street} {company.address.house},{company.address.zipCode}{" "}
                              {company.address.city.name},{company.address.country.name}
                            </h3>
                          </div>
                        </div>
                        <Map
                          latitude={company.address.latitude}
                          longitude={company.address.longitude}
                          mapHeight="500"
                          mapWidth="700"
                        />
                      </>
                    }
                    heading={company.name}
                  />
                </div>
              </div>
            </div>
          </section>
        }
      </div>
    </div>
  );
};

export default ProductDetails;

import { Accordion } from "@/components/accordion";
import Map from "@/components/map";
// import { Size, TagXl } from '@/components/tags/tagXl';
import { Identifiable } from "@/interface/identifiable";
import { Product } from "@/interface/product";
import { Sex } from "@/interface/user";
import { editorFormats, editorModules, getSingleProductData, getSingleTrlData, getVideoIdFromUrl } from "@/utils";
import { Field, FieldArray, Form, Formik } from "formik";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { GiFemale, GiMale } from "react-icons/gi";
import "react-quill/dist/quill.snow.css";
import YouTube from "react-youtube";

const Quill = dynamic(import("react-quill"), { ssr: false });

interface Props {
  readonly product: Product;
  readonly trlData: Identifiable[];
}

const twClasses = {
  dashedInput:
    "right-0 mt-2 h-fit w-full rounded-md border-[1.5px] border-dashed border-gray-400 bg-transparent text-black  p-3 font-medium",
  headers: "mb-2 font-semibold uppercase text-white",
  tagSm: "w-fit rounded-3xl bg-baseColor bg-opacity-60 px-3 py-1 text-sm text-white",
  tagXl: "w-full rounded-md bg-baseColor bg-opacity-60 text-base lg:text-xl uppercase text-white  border-dashed",
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  const endpoint = params?.productId ? params.productId.toString() : "6781";
  const product = await getSingleProductData(endpoint);
  const trlData = await getSingleTrlData();
  return {
    props: {
      product,
      trlData,
    },
  };
};

const ProductForm = ({ product, trlData }: Props) => {
  const [image, setImage] = useState("");

  return (
    <Formik
      initialValues={product}
      onSubmit={(values, actions) => {
        console.log(values);
      }}
    >
      {({ values: { businessModels, categories, company, description, picture, video, user }, setFieldValue }) => (
        <Form>
          <div className="w-full rounded-2xl">
            {/* Top */}
            <section className="flex w-full items-start gap-2 bg-baseColor p-3 lg:gap-8 lg:rounded-tl-2xl lg:rounded-tr-2xl lg:p-8">
              <div className="flex w-fit flex-col items-center rounded-md">
                <Image
                  src={picture}
                  alt=""
                  width={700}
                  height={700}
                  className="h-[70px] w-[70px] rounded-md border-2 border-gray bg-white p-2  lg:h-[200px] lg:w-[200px]"
                />
                <label htmlFor="image">
                  <p className="cursor-pointer text-center text-gray underline-offset-2 hover:text-gray hover:underline">
                    Change Image
                  </p>
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  className="hidden"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files && e.target.files.length > 0) {
                      const file = e.target.files[0];
                      const reader = new FileReader();
                      reader.onload = () => {
                        setImage(reader.result as string);
                        setFieldValue("picture", reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>
              <div className="w-3/4">
                <div className="mb-5 w-fit">
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="w-4/5 rounded-md border-2 border-dashed border-white bg-transparent p-2 text-3xl font-medium text-white lg:text-6xl"
                  />
                </div>
                <div className="w-4/5">
                  <Accordion
                    body={
                      <Quill
                        className="w-full"
                        defaultValue={description}
                        theme="snow"
                        modules={editorModules}
                        formats={editorFormats}
                        onChange={(value: string) => setFieldValue("description", value)}
                      />
                    }
                    heading="Description"
                  />
                </div>

                <div className="rounded-md ">
                  <div className="my-3">
                    <Field
                      as="select"
                      id="type"
                      name="type.name"
                      className="w-fit rounded-md border-2 border-white bg-transparent px-4 py-[2px] text-white"
                    >
                      <option value="">Select a type</option>
                      <option value="Software">Software</option>
                      <option value="Hardware">Hardware</option>
                      <option value="Service">Service</option>
                    </Field>
                  </div>
                  {/* <Accordion body={<Quill value={description} className="w-full" />} heading="Description" /> */}
                </div>
              </div>
            </section>
            <div className="rounded-bl-2xl rounded-br-2xl bg-gray bg-opacity-50 p-2 lg:p-8">
              <section className="w-full border-b-[2px] border-dashed border-white">
                <div className="mb-8">
                  <h3 className={twClasses.headers}>categories</h3>
                  <div className="flex w-full grid-cols-3 flex-col gap-2 md:grid">
                    <FieldArray name="categories">
                      {({ push, remove }) => (
                        <>
                          {categories.map((_, index: number) => (
                            <div className="flex w-full items-center " key={index}>
                              <Field
                                name={`categories.${index}.name`}
                                className="h-full w-full rounded-md border-2 border-dashed bg-transparent p-5"
                              />
                              <button type="button" onClick={() => remove(index)} className={`-ml-12 h-full`}>
                                <AiFillCloseCircle size={40} className=" text-black " />
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => push({ id: 0, name: "" })}
                            className={twClasses.tagXl}
                            style={{ background: "orange" }}
                          >
                            Add Category
                          </button>
                        </>
                      )}
                    </FieldArray>
                  </div>
                </div>

                <div className="mb-8 flex flex-col items-start gap-6 lg:flex-row lg:items-start">
                  <div>
                    <h3 className="mb-2 font-semibold uppercase text-black">Business Models</h3>
                    <div className="grid grid-cols-2 grid-rows-2 gap-2 gap-x-2 gap-y-2 md:grid-cols-3">
                      <FieldArray name="businessModels">
                        {({ push, remove }) => (
                          <>
                            {businessModels.map((_, index: number) => (
                              <div className="w-full" key={index}>
                                <div className="flex w-full items-center">
                                  <Field
                                    name={`businessModels.${index}.name`}
                                    className=" flex w-full items-center rounded-full border-[1.5px] border-dashed border-black bg-transparent px-3 py-1 text-sm font-medium uppercase"
                                  />
                                  <button type="button" onClick={() => remove(index)} className="-ml-8">
                                    <AiFillCloseCircle size={20} className=" text-black " />
                                  </button>
                                </div>
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() => push({ id: 0, name: "" })}
                              className="w-full rounded-full px-3 py-1 text-sm uppercase"
                              style={{ background: "orange" }}
                            >
                              Add Business Model
                            </button>
                          </>
                        )}
                      </FieldArray>
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold uppercase text-black">Investment Effort</h3>
                    <Field
                      type="text"
                      id="investmentEffort"
                      name="investmentEffort"
                      className=" flex h-fit w-full items-center rounded-full border-[1.5px] border-dashed bg-transparent px-3 py-1 text-sm font-medium uppercase"
                    />
                  </div>
                </div>
                <div className="mb-8">
                  <h3 className="mb-2 font-semibold uppercase text-black">TRL</h3>
                  <Field as="select" id="trl" name="trl.name" className={twClasses.dashedInput}>
                    {trlData.map((sing) => {
                      return (
                        <option key={sing.id} value={sing.name}>
                          {sing.name}
                        </option>
                      );
                    })}
                  </Field>
                </div>
              </section>
              <section className="w-full border-b-[2px] border-dashed border-gray py-8">
                <h3 className="mb-2 font-semibold uppercase text-black">video</h3>
                <YouTube
                  videoId={getVideoIdFromUrl(video)}
                  id={video}
                  iframeClassName="w-full h-auto object-cover xs:h-[300px] md:h-[500px]"
                />
                <Field type="text" id="video" name="video" className={twClasses.dashedInput} />
              </section>
              <section className="w-full py-8">
                <h3 className="mb-2 font-semibold uppercase text-black">OFFERED BY </h3>
                <div className="flex flex-col items-start gap-3 md:flex-row">
                  <Image src={user.profilePicture} width={200} height={400} alt="" className="rounded-full" />
                  <div className="w-full">
                    <div className="flex w-full justify-between">
                      <div>
                        <div className="mr-2 flex items-end gap-x-1">
                          <Field
                            type="text"
                            id="user.lastName"
                            name="user.lastName"
                            className={twClasses.dashedInput}
                          />
                          ,
                          <Field
                            type="text"
                            id="user.firstName"
                            name="user.firstName"
                            className={twClasses.dashedInput}
                          />
                        </div>
                        <Field type="email" id="user.email" name="user.email" className={twClasses.dashedInput} />
                        <Field type="radio" name="user.sex" value={Sex.female} checked={user.sex == Sex.female} />
                        <Field type="radio" name="user.sex" value={Sex.male} checked={user.sex == Sex.male} />
                        {user.sex == Sex.male ? (
                          <GiMale color="#0194E9" size={50} />
                        ) : (
                          <GiFemale color="pink" size={50} />
                        )}
                      </div>
                      <Field type="text" id="user.position" name="user.position" className={twClasses.dashedInput} />
                    </div>
                    <div className="text-black">
                      <Accordion
                        body={
                          <div>
                            <div>
                              <div className="mb-2 flex flex-col items-start">
                                <label htmlFor="company.name" className="font-bold text-black">
                                  Company Name
                                </label>
                                <Field
                                  type="text"
                                  id="company.name"
                                  name="company.name"
                                  className={twClasses.dashedInput}
                                />
                              </div>

                              <div className="mb-2">
                                <div className="mb-2 flex items-end gap-x-1">
                                  <div className="flex flex-col items-start">
                                    <label htmlFor="company.address.street" className="font-bold text-black ">
                                      Street
                                    </label>
                                    <Field
                                      type="text"
                                      id="company.address.street"
                                      name="company.address.street"
                                      className={twClasses.dashedInput}
                                    />
                                  </div>
                                  <div className="flex flex-col items-start">
                                    <label htmlFor="company.address.house" className="font-bold text-black">
                                      House
                                    </label>
                                    <Field
                                      type="text"
                                      id="company.address.house"
                                      name="company.address.house"
                                      className={twClasses.dashedInput}
                                    />
                                  </div>
                                  ,
                                </div>
                                <div className="mb-6 flex items-end gap-x-1">
                                  <div className="flex flex-col items-start">
                                    <label htmlFor="company.address.zipCode" className="font-bold text-black">
                                      Zip Code
                                    </label>
                                    <Field
                                      type="text"
                                      id="company.address.zipCode"
                                      name="company.address.zipCode"
                                      className={twClasses.dashedInput}
                                    />
                                  </div>
                                  <div className="flex flex-col items-start">
                                    <label htmlFor="company.address.city.name" className="font-bold text-black">
                                      City
                                    </label>
                                    <Field
                                      type="text"
                                      id="company.address.city.name"
                                      name="company.address.city.name"
                                      className={twClasses.dashedInput}
                                    />
                                  </div>
                                  <div className="flex flex-col items-start">
                                    <label htmlFor="company.address.country.name" className="font-bold text-black">
                                      Country
                                    </label>
                                    <Field
                                      type="text"
                                      id="company.address.country.name"
                                      name="company.address.country.name"
                                      className={twClasses.dashedInput}
                                    />
                                  </div>
                                  ,
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col justify-between gap-x-2 font-bold lg:flex-row">
                              <div className="hidden lg:block">
                                <Map
                                  latitude={company.address.latitude}
                                  longitude={company.address.longitude}
                                  mapHeight="500"
                                  mapWidth="500"
                                />
                              </div>
                              <div className="block lg:hidden">
                                <Map
                                  latitude={company.address.latitude}
                                  longitude={company.address.longitude}
                                  mapHeight="250"
                                  mapWidth="300"
                                />
                              </div>
                              <div>
                                <div>
                                  <p>Latitude</p>
                                  <Field
                                    type="text"
                                    id="company.address.latitude"
                                    name="company.address.latitude"
                                    className={twClasses.dashedInput}
                                  />
                                </div>
                                <div>
                                  <p>Longitude</p>
                                  <Field
                                    type="text"
                                    id="company.address.longitude"
                                    name="company.address.longitude"
                                    className={twClasses.dashedInput}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        }
                        heading={company.name}
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <button
              type="submit"
              className="float-right my-10 rounded-md px-5 py-2 text-xl uppercase text-black"
              style={{ background: "#0194E9" }}
            >
              SAVE
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ProductForm;

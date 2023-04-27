import axios, { AxiosError, AxiosResponse } from "axios";
import { Identifiable } from "./interface/identifiable";
import { Product } from "./interface/product";

export const INNOLOFT_API_ENDPOINT = "https://api-test.innoloft.com/";

export async function getSingleData<T>(endpoint: string): Promise<T> {
  try {
    const res: AxiosResponse<T> = await axios.get(endpoint);
    return res.data;
  } catch (error: AxiosError | unknown) {
    console.log((error as AxiosError).message);
    return null as unknown as T;
  }
}

export const getSingleProductData = (endpoint: string) =>
  getSingleData<Product>(INNOLOFT_API_ENDPOINT + "product/" + endpoint);

export type ProductCardProps = Pick<Product, "id" | "picture" | "name">;

export async function getDatas<T>(endpoint: string): Promise<T[]> {
  try {
    const response = await axios.get<T[]>(endpoint);
    return response.data;
  } catch (error: AxiosError | unknown) {
    console.error((error as AxiosError).message);
    return [];
  }
}

export async function fetchTRLData(): Promise<Identifiable[]> {
  const endpoint = "https://api-test.innoloft.com/trl/";

  try {
    const response = await axios.get<Identifiable[]>(endpoint);
    return response.data;
  } catch (error: AxiosError | unknown) {
    console.error((error as AxiosError).message);
    return [];
  }
}

export const getSingleTrlData = () => getDatas<Identifiable>("https://api-test.innoloft.com/trl/");

export const getVideoIdFromUrl = (url: string) => {
  const regex = /[?&]v=([^&#]*)/;
  const match = regex.exec(url);
  if (!match) {
    return;
  }
  return match[1];
};

export const editorModules = {
  toolbar: [
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    ["link", "image"],
  ],
};

export const editorFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

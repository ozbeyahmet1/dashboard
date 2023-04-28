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



export type ProductCardProps = Pick<Product, "id" | "picture" | "name">;

export async function getData<T>(endpoint: string): Promise<T[]> {
  try {
    const response = await axios.get<T[]>(endpoint);
    return response.data;
  } catch (error: AxiosError | unknown) {
    console.error((error as AxiosError).message);
    return [];
  }
}

export async function postData<T>(endpoint: string, data: Product): Promise<T> {
  try {
    const response = await axios.put<T>(endpoint, data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type',
      },
    });
    return response.data;
  } catch (error: AxiosError | unknown) {
    console.error((error as AxiosError).message);
    return null as unknown as T;
  }
}

export async function fetchTRLData(): Promise<Identifiable[]> {
  const endpoint = `${INNOLOFT_API_ENDPOINT}trl/`;

  try {
    const response = await axios.get<Identifiable[]>(endpoint);
    return response.data;
  } catch (error: AxiosError | unknown) {
    console.error((error as AxiosError).message);
    return [];
  }
}

export const getSingleTrlData = () => getData<Identifiable>(`${INNOLOFT_API_ENDPOINT}trl/`);
export const getSingleProductData = (endpoint: string) =>
  getSingleData<Product>(INNOLOFT_API_ENDPOINT + "product/" + endpoint);

export const postFormData = (formData: Product) => postData<Product>(`${INNOLOFT_API_ENDPOINT}product/6781/`, formData);

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

export type PropsWithBgColor<P = unknown> = P & {
  readonly bgColor: string;
};

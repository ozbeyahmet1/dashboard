import axios, { AxiosError, AxiosResponse } from "axios";
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

export const getVideoIdFromUrl = (url: string) => {
  const regex = /[?&]v=([^&#]*)/;
  const match = regex.exec(url);
  if (!match) {
    return;
  }
  return match[1];
};

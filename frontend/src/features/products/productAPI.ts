import { client, IFetchResponse } from "../../api";
import { IProduct } from "./productSlice";

export const fetchProductRequest = async (
  storeUrl: string,
  categoryUrl: string,
  page = 0
): Promise<IFetchResponse<IProduct>> => {
  const limit = 10;
  const offset = page * limit;
  const response = await client.get(
    `stores/${storeUrl}/categories/${categoryUrl}/products?limit=${limit}&offset=${offset}`
  );
  if (response.status === 200) {
    return response.data;
  } else {
    return { count: 0, data: [] };
  }
};


export const postNewProductRequest = async (
  storeUrl: string,
  categoryUrl: string,
  body: FormData
): Promise<IProduct> => {
  return client.post(`stores/${storeUrl}/categories/${categoryUrl}/products`, body, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
import { client, IFetchResponse } from "../../api";
import { ICategory } from "./categorySlice";

export const fetchCategoriesRequest = async (
  storeUrl: string,
  page = 0
): Promise<IFetchResponse<ICategory>> => {
  const limit = 10;
  const offset = page * limit;
  const response = await client.get(
    `stores/${storeUrl}/categories?limit=${limit}&offset=${offset}`
  );
  if (response.status === 200) {
    return response.data;
  } else {
    return { data: [], count: 0 };
  }
};

export const postNewCategoryRequest = async (
  storeUrl: string,
  body: FormData
): Promise<ICategory> => {
  return client.post(`stores/${storeUrl}/categories`, body, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

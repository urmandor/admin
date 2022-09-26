import { client, IFetchResponse } from "../../api";
import { IStore } from "./storeSlice";

export const fetchStoresRequest = async (
  page = 0
): Promise<IFetchResponse<IStore>> => {
  const limit = 10;
  const offset = page * limit;
  const response = await client.get(`stores?limit=${limit}&offset=${offset}`);
  if (response.status === 200) {
    return response.data;
  } else {
    return { data: [], count: 0 };
  }
};

export const postNewStoreRequest = async (body: FormData): Promise<IStore> => {
  return client.post("stores", body, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFetchResponse } from "../../api";
import { RootState } from "../../store";
import { fetchStoresRequest, postNewStoreRequest } from "./storeAPI";

export interface IStore {
  name: string;
  url: string;
  address: string;
  city: string;
  state: string;
  country: string;
  imageUrl?: string;
}

interface IStoreState {
  data: IStore[];
  count: number;
}

export const fetchStores = createAsyncThunk(
  "fetchStores",
  async (page: number) => {
    return fetchStoresRequest(page);
  }
);

export const postNewStore = createAsyncThunk(
  "postNewStore",
  async (data: FormData) => {
    return postNewStoreRequest(data);
  }
);

export const storeSlice = createSlice({
  name: "store",
  initialState: { data: [], count: 0 },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchStores.fulfilled,
        (state: IStoreState, action: PayloadAction<IFetchResponse<IStore>>) => {
          state.data = action.payload.data;
          state.count = action.payload.count;
        }
      )
      .addCase(
        postNewStore.fulfilled,
        (state: IStoreState, action: PayloadAction<any>) => {
          state.data.unshift(action.payload.data);
          state.count++;
          if (state.count % 10 === 1) {
            state.data.pop();
          }
        }
      );
  },
});

export const selectStores = (state: RootState) => state.stores as IStoreState;

export default storeSlice.reducer;

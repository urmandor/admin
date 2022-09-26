import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFetchResponse } from "../../api";
import { RootState } from "../../store";
import { fetchProductRequest, postNewProductRequest } from "./productAPI";

export interface IProduct {
  name: string;
  url: string;
  description: string;
  price: number;
  imageUrl?: string;
}

interface IProductState {
  data: IProduct[];
  count: number;
}

interface IFetchProductsRequest {
  page: number;
  storeUrl: string;
  categoryUrl: string;
}

interface IPostNewProductRequest {
  body: FormData;
  storeUrl: string;
  categoryUrl: string;
}

export const fetchProducts = createAsyncThunk(
  "fetchProducts",
  async (data: IFetchProductsRequest) => {
    return fetchProductRequest(data.storeUrl, data.categoryUrl, data.page);
  }
);

export const postNewProduct = createAsyncThunk(
  "postNewProduct",
  async (data: IPostNewProductRequest) => {
    return postNewProductRequest(data.storeUrl, data.categoryUrl, data.body);
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState: { data: [], isLoading: false, count: 0 },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(
        fetchProducts.fulfilled,
        (
          state: IProductState,
          action: PayloadAction<IFetchResponse<IProduct>>
        ) => {
          state.data = action.payload.data;
          state.count = action.payload.count;
        }
      )
      .addCase(
        postNewProduct.fulfilled,
        (state: IProductState, action: PayloadAction<any>) => {
          state.data.unshift(action.payload.data);
          state.count++;
          if (state.count % 10 === 1) {
            state.data.pop();
          }
        }
      );
  },
});

export const selectProducts = (state: RootState) => state.products;

export default productSlice.reducer;

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFetchResponse } from "../../api";
import { RootState } from "../../store";
import { fetchCategoriesRequest, postNewCategoryRequest } from "./categoryAPI";

export interface ICategory {
  name: string;
  url: string;
  imageUrl?: string;
}

interface ICategoryState {
  data: ICategory[];
  count: number;
}

interface IFetchCategoriesRequest {
  page: number;
  storeUrl: string;
}

interface IPostNewCategoryRequest {
  body: FormData;
  storeUrl: string;
}

export const fetchCategories = createAsyncThunk(
  "fetchCategories",
  async (data: IFetchCategoriesRequest) => {
    return fetchCategoriesRequest(data.storeUrl, data.page);
  }
);

export const postNewCategory = createAsyncThunk(
  "postNewCategory",
  async (data: IPostNewCategoryRequest) => {
    return postNewCategoryRequest(data.storeUrl, data.body);
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState: { data: [], count: 0 },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchCategories.fulfilled,
        (
          state: ICategoryState,
          action: PayloadAction<IFetchResponse<ICategory>>
        ) => {
          state.data = action.payload.data;
          state.count = action.payload.count;
        }
      )
      .addCase(
        postNewCategory.fulfilled,
        (state: ICategoryState, action: PayloadAction<any>) => {
          state.data.unshift(action.payload.data);
          state.count++;
          if (state.count % 10 === 1) {
            state.data.pop();
          }
        }
      );
  },
});

export const selectCategories = (state: RootState) => state.categories;

export default categorySlice.reducer;

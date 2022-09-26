import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import storeReducer from "./features/stores/storeSlice";
import categoryReducer from "./features/categories/categorySlice";
import productReducer from "./features/products/productSlice";

export const store = configureStore({
  reducer: {
    stores: storeReducer,
    categories: categoryReducer,
    products: productReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

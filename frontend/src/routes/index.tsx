import { createBrowserRouter } from "react-router-dom";
import CategoryList from "../features/categories/categoryList";
import ProductList from "../features/products/productList";
import StoreList from "../features/stores/storeList";
import Root from "./root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <StoreList /> },
      { path: "/:store", element: <CategoryList /> },
      { path: "/:store/:category", element: <ProductList /> },
    ],
  },
]);

export default router;

import * as React from "react";
import { Typography } from "@mui/material";
import TableList from "../../../components/Table";
import Modal from "../../../components/Modal";
import AddProduct from "../addProduct";
import { useState } from "react";
import BreadCrumbs from "../../../components/BreadCrumbs";
import { fetchProducts, selectProducts } from "../productSlice";
import { useParams } from "react-router";
import { useAppSelector, useAppDispatch } from "../../../hooks";

export default function ProductList() {
  const [addProductButton, setAddProduct] = useState(false);
  const [page, changePage] = useState(0);

  const products = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();
  const { store, category } = useParams();

  React.useEffect(() => {
    dispatch(
      fetchProducts({
        storeUrl: store as string,
        categoryUrl: category as string,
        page,
      })
    );
  }, [dispatch, store, category, page]);

  const onPageChange = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    changePage(newPage);
  };

  const onCloseModal = () => {
    setAddProduct(false);
  };

  return (
    <React.Fragment>
      <Typography
        style={{ marginBottom: 20 }}
        variant="h4"
        component="h4"
        sx={{
          fontWeight: 900,
          color: "inherit",
          fontFamily: "monospace",
        }}
      >
        Products
      </Typography>
      <BreadCrumbs
        links={[
          { name: "Stores", path: "/" },
          { name: "Categories", path: `/${store}` },
        ]}
        currentName="Products"
      />
      <TableList
        columnNames={[
          { key: "name", name: "Name" },
          { key: "description", name: "Description" },
          { key: "price", name: "Price" },
        ]}
        rows={products.data}
        footerButtonOnClick={() => {
          setAddProduct(true);
        }}
        footerButtonText="Add Product"
        currentPage={page}
        handlePageChange={onPageChange}
        totalCount={products.count}
        imageKey="imageUrl"
        showImage={true}
      />
      <Modal
        title="Add Product"
        maxWidth="sm"
        onClose={onCloseModal}
        isOpen={addProductButton}
      >
        <AddProduct onClose={onCloseModal} />
      </Modal>
    </React.Fragment>
  );
}

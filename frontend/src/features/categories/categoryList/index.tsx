import * as React from "react";
import { Typography } from "@mui/material";
import TableList from "../../../components/Table";
import Modal from "../../../components/Modal";
import AddCategory from "../addCategory";
import { useState } from "react";
import BreadCrumbs from "../../../components/BreadCrumbs";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { fetchCategories, selectCategories } from "../categorySlice";

export default function CategoryList() {
  const [addCategoryButton, setAddCategory] = useState(false);
  const [page, changePage] = useState(0);

  const categories = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { store } = useParams();

  React.useEffect(() => {
    dispatch(fetchCategories({ storeUrl: store as string, page }));
  }, [dispatch, store, page]);

  const onItemClick = (index: number) => {
    const { url } = categories.data[index];
    navigate(`/${store}/${url}`);
  };

  const onCloseModal = () => {
    setAddCategory(false);
  };

  const onPageChange = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    changePage(newPage);
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
        Categories
      </Typography>
      <BreadCrumbs
        links={[{ name: "Stores", path: "/" }]}
        currentName="Categories"
      />
      <TableList
        columnNames={[{ key: "name", name: "Name" }]}
        rows={categories.data}
        footerButtonOnClick={() => {
          setAddCategory(true);
        }}
        footerButtonText="Add Category"
        onRowClick={onItemClick}
        currentPage={page}
        handlePageChange={onPageChange}
        totalCount={categories.count}
        showImage={true}
        imageKey="imageUrl"
      />
      <Modal
        title="Add Category"
        maxWidth="sm"
        onClose={onCloseModal}
        isOpen={addCategoryButton}
      >
        <AddCategory onClose={onCloseModal} />
      </Modal>
    </React.Fragment>
  );
}

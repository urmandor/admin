import * as React from "react";
import { Typography } from "@mui/material";
import TableList from "../../../components/Table";
import Modal from "../../../components/Modal";
import AddStore from "../addStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { fetchStores, selectStores } from "../storeSlice";

export default function StoreList() {
  const [addStoreButton, setAddStore] = useState(false);
  const [page, changePage] = useState(0);

  const stores = useAppSelector(selectStores);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchStores(page));
  }, [dispatch, page]);

  const onItemClick = (index: number) => {
    const { url } = stores.data[index];
    navigate(`/${url}`);
  };

  const onPageChange = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    changePage(newPage);
  };

  const onCloseModal = () => {
    setAddStore(false);
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
        Stores
      </Typography>
      <TableList
        columnNames={[
          { key: "name", name: "Name" },
          { key: "address", name: "Address" },
          { key: "city", name: "City" },
          { key: "country", name: "Country" },
        ]}
        rows={stores.data}
        footerButtonOnClick={() => {
          setAddStore(true);
        }}
        footerButtonText="Add Store"
        onRowClick={onItemClick}
        currentPage={page}
        handlePageChange={onPageChange}
        totalCount={stores.count}
        showImage={true}
        imageKey="imageUrl"
      />
      <Modal
        title="Add Store"
        maxWidth="sm"
        onClose={onCloseModal}
        isOpen={addStoreButton}
      >
        <AddStore onClose={onCloseModal} />
      </Modal>
    </React.Fragment>
  );
}

import { Button, Stack, TextField, Typography } from "@mui/material";
import FileUploader from "../../../components/FileUploader";
import uploadFileAvatar from "../../../assets/upload_avatar.png";
import { useState } from "react";
import { useAppDispatch } from "../../../hooks";
import { postNewProduct } from "../productSlice";
import { useParams } from "react-router-dom";

interface IAddProductState {
  name: string;
  url: string;
  price: number;
  description: string;
  file?: File;
}

interface IAddCategoryProps {
  onClose: () => void;
}

const AddProduct = (props: IAddCategoryProps) => {
  const [inputs, setInputs] = useState<IAddProductState>({
    name: "",
    url: "",
    description: "",
    price: 0,
  });
  const dispatch = useAppDispatch();
  const { store, category } = useParams();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [e.target.name]: e.target.value,
    }));
  };

  const onFileSelected = (file: File) => {
    setInputs((prevInputs) => ({ ...prevInputs, file: file as File }));
  };

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("name", inputs.name);
    formData.append("url", inputs.url);
    formData.append("description", inputs.description);
    formData.append("price", `${inputs.price}`);

    formData.append("file", inputs.file as File);

    dispatch(
      postNewProduct({
        body: formData,
        storeUrl: store as string,
        categoryUrl: category as string,
      })
    );
    props.onClose();
  };

  return (
    <Stack style={{ marginTop: 20 }} spacing={2}>
      <Typography
        variant="h6"
        component="h6"
        sx={{
          fontWeight: 700,
          color: "inherit",
          fontFamily: "monospace",
        }}
      >
        Product's Image
      </Typography>
      <FileUploader
        defaultImagePath={uploadFileAvatar}
        onFileSelected={onFileSelected}
      />

      <TextField
        label="Name"
        variant="standard"
        name="name"
        value={inputs.name}
        onChange={handleOnChange}
      />
      <TextField
        label="URL"
        variant="standard"
        name="url"
        value={inputs.url}
        onChange={handleOnChange}
      />
      <TextField
        label="Description"
        variant="standard"
        name="description"
        value={inputs.description}
        onChange={handleOnChange}
      />
      <TextField
        label="Price"
        variant="standard"
        fullWidth
        name="price"
        value={inputs.price}
        onChange={handleOnChange}
      />
      <Button variant="contained" style={{ float: "right" }} onClick={onSubmit}>
        Add Product
      </Button>
    </Stack>
  );
};

export default AddProduct;

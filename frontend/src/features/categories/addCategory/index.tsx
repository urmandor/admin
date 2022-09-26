import { Button, Stack, TextField, Typography } from "@mui/material";
import FileUploader from "../../../components/FileUploader";
import uploadFileAvatar from "../../../assets/upload_avatar.png";
import { useState } from "react";
import { postNewCategory } from "../categorySlice";
import { useAppDispatch } from "../../../hooks";
import { useParams } from "react-router-dom";

interface IAddCategoryState {
  name: string;
  url: string;
  file?: File;
}

interface IAddCategoryProps {
  onClose: () => void;
}

const AddCategory = (props: IAddCategoryProps) => {
  const [inputs, setInputs] = useState<IAddCategoryState>({
    name: "",
    url: "",
  });

  const { store } = useParams();
  const dispatch = useAppDispatch();

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
    formData.append("file", inputs.file as File);

    dispatch(postNewCategory({ body: formData, storeUrl: store as string }));
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
        Category Image
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
      <Button variant="contained" style={{ float: "right" }} onClick={onSubmit}>
        Add Category
      </Button>
    </Stack>
  );
};

export default AddCategory;

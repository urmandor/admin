import { Button, Stack, TextField, Typography } from "@mui/material";
import FileUploader from "../../../components/FileUploader";
import uploadFileAvatar from "../../../assets/upload_avatar.png";
import { useAppDispatch } from "../../../hooks";
import React, { useState } from "react";
import { postNewStore } from "../storeSlice";

interface IAddStoreState {
  name: string;
  url: string;
  address: string;
  city: string;
  state: string;
  country: string;
  file?: File;
}

interface IAddStoreProps {
  onClose: () => void;
}

const AddStore = (props: IAddStoreProps) => {
  const [inputs, setInputs] = useState<IAddStoreState>({
    name: "",
    url: "",
    address: "",
    city: "",
    state: "",
    country: "",
  });
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
    formData.append("address", inputs.address);
    formData.append("city", inputs.city);
    formData.append("state", inputs.state);
    formData.append("country", inputs.country);

    formData.append("file", inputs.file as File);

    dispatch(postNewStore(formData));
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
        Store's Logo
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
        label="Address"
        variant="standard"
        name="address"
        value={inputs.address}
        onChange={handleOnChange}
      />
      <TextField
        label="City"
        variant="standard"
        fullWidth
        name="city"
        value={inputs.city}
        onChange={handleOnChange}
      />
      <TextField
        label="State/Province"
        variant="standard"
        fullWidth
        name="state"
        value={inputs.state}
        onChange={handleOnChange}
      />
      <TextField
        label="Country"
        variant="standard"
        fullWidth
        name="country"
        value={inputs.country}
        onChange={handleOnChange}
      />
      <Button variant="contained" style={{ float: "right" }} onClick={onSubmit}>
        Add Store
      </Button>
    </Stack>
  );
};

export default AddStore;

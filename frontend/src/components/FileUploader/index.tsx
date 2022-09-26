import { SyntheticEvent, useEffect, useState } from "react";

export interface IFileUploaderProps {
  defaultImagePath: string;
  onFileSelected: (file: File) => void;
}

const FileUploader = (props: IFileUploaderProps) => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [preview, setPreview] = useState<string>();
  const { defaultImagePath, onFileSelected } = props;

  useEffect(() => {
    if (!selectedFile) {
      setPreview(defaultImagePath);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile, defaultImagePath]);

  const onSelectFile = (e: SyntheticEvent<HTMLInputElement>) => {
    const { files } = e.target as HTMLInputElement;
    if (!files || files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(files[0]);
    onFileSelected(files[0]);
  };

  return (
    <div>
      {preview && (
        <img src={preview} alt="uploadedFile" style={{ maxWidth: "100%" }} />
      )}
      <input type="file" onChange={onSelectFile} />
    </div>
  );
};

export default FileUploader;

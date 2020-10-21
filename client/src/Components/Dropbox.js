import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import fileImportIcon from "../svg/upload.svg";
import Button from "@material-ui/core/Button";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  height: 300,
  borderWidth: 5,
  borderRadius: 2,
  borderColor: "darkgray",
  borderStyle: "dashed",
  backgroundColor: "#CECECE",
  color: "#000000",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "gold",
};

const acceptStyle = {
  borderColor: "green",
};

const rejectStyle = {
  borderColor: "red",
};

function Dropbox(props) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
    open,
  } = useDropzone({ accept: "application/*", noClick: true, noKeyboard: true });

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <img
          src={fileImportIcon}
          alt="upload icon made by < href=www.freepik.com Freepik from"
          width="32%"
        />
        <p style={{ fontSize: 18 }}>Drag your files here or</p>
        <Button
          type="button"
          onClick={open}
          variant="contained"
          color="primary"
        >
          Browse
        </Button>
      </div>
    </div>
  );
}

export default Dropbox;

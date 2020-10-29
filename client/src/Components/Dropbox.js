import React, { useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import fileImportIcon from "../svg/upload.svg";
import pdfIcon from "../svg/pdf.svg";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";

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

  const [fileAvailable, setFileAvailable] = useState(false);

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      <img src={pdfIcon} width="16px" /> {file.path}
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
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item xs={12}>
            <img
              src={fileImportIcon}
              alt="upload icon made by www.freepik.com Freepik"
              width="32%"
            />
            <p style={{ fontSize: 18 }}>Drag your files here or</p>
          </Grid>
          <Grid item xs={12} display="none" displayPrint="block">
            <Button
              type="button"
              onClick={open}
              variant="contained"
              color="primary"
            >
              Browse
            </Button>
          </Grid>
        </Grid>

        <List>
          <ListItem>
            <ListItemText primary={files} />
          </ListItem>
        </List>
      </div>
    </div>
  );
}

export default Dropbox;

import React, { useMemo, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import fileImportIcon from "../svg/upload.svg";
import pdfIcon from "../svg/pdf.svg";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

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

  const [fileAvailable, setFileAvailable] = useState(0);

  // useEffect(()=>{
  //   setFileAvailable(false);
  // })
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      <img src={pdfIcon} width="16px" /> {file.path}
    </li>
  ));

  if (files.length > 0 && fileAvailable <= 0) {
    setFileAvailable(fileAvailable + 1);
    console.log(fileAvailable);
  }

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
            <Box display="block" displayPrint="none">
              <img
                src={fileImportIcon}
                alt="upload icon made by www.freepik.com Freepik"
                width="32%"
              />
              <p style={{ fontSize: 18 }}>Drag your files here or</p>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="block" displayPrint="none">
              <Button
                type="button"
                onClick={open}
                variant="contained"
                color="primary"
              >
                Browse
              </Button>
            </Box>
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

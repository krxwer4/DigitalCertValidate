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
import axios from "axios";


const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  // alignItems: "center",
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
  borderColor: "royalblue",
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
    <ul key={file.path}>
      <img
        src={pdfIcon}
        alt="pdf icon made by Dimitry Miroliubov from www.flaticon.com/authors/dimitry-miroliubov"
        width="16px"
      />
      {"  "}
      {file.path}
    </ul>
  ));

  useEffect(() => {
    // console.log("from useEffect" + props.reset);
    
    while (acceptedFiles.length > 0) {
      // console.log(ele);
      acceptedFiles.pop();
    }
    setFileAvailable(false);
    return () => console.log("reset");
  }, [props.reset]);

  useEffect(() => {
    console.log("from useEffect " + props.submit);
    const data = new FormData();
    if (acceptedFiles.length > 0) {
      data.append("file", acceptedFiles[0]);
      // console.log(data)

      axios
        .post("http://localhost:9876/registcert", data)
        .then((res) => console.log(res.data))
        .catch((e) => console.log(e));
    }
  }, [props.submit]);

  if (files.length > 0 && !fileAvailable) {
    console.log(acceptedFiles[0]);
    setFileAvailable(true);
    // console.log(fileAvailable);
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
        {!fileAvailable && (
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              <Box display="block" displayPrint="none">
                <img
                  src={fileImportIcon}
                  alt="upload icon made by Freepik (www.freepik.com) from www.flaticon.com"
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
        )}
          
        {fileAvailable && (
          <List>
            <ListItem>
              <ListItemText primary={files} />
            </ListItem>
          </List>
        )}
      </div>
    </div>
  );
}

export default Dropbox;

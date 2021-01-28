import React, { useMemo, useState, useEffect, useRef } from "react";
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
import { drizzleReactHooks } from "@drizzle/react-plugin";
const { useDrizzleState } = drizzleReactHooks;

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
  const drizzle = props.drizzle;
  // console.log(props)
  const contract = drizzle.contracts.Poe;
  // console.log(contract)
  const drizzleState = useDrizzleState((drizzleState) => drizzleState);
  // console.log(useCacheCall('Poe','findCertificate'))

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
  const initialRender = useRef(true);

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
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      console.log("from useEffect " + props.submitReg);
      const data = new FormData();
      if (acceptedFiles.length > 0) {
        data.append("file", acceptedFiles[0]);
        // console.log(data)
        axios
          .post("http://localhost:9876/registcert", data)
          .then((res) => {
            contract.methods["addCertificate"].cacheSend(res.data, {
              from: drizzleState.accounts[0],
            });
          })
          .catch((e) => console.log(e));
      }
      // console.log(hash)
      // const transaction = addCertificate(hash);
      // console.log(transaction);
    }
    // contract.methods["addCertificate"].cacheSend(res.data,{from:drizzleState.accounts[0]})
    // 0x2bbaea7517a8e52961a7a77d747db9c178d881c1e18b7b6133bec735a99f20353a9e628c30c354b7fe9875c84eb1ccef4401ba941dcef78f24e01c775ee2a336
    console.log(
      contract.methods
        .findCertificate(
          "0xffe4b9fe1db4a36ac0a12396cba53a5e3ffe6972de91a92524f3bb8f630131d0417f0cbeca8056a9e4e59ac6c8a92064761064fc2fe8107a178ed02f227b8299"
        )
        .call()
    );
  }, [props.submitReg]);

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

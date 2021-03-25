import React, { useState } from "react";
import Dropbox from "./Components/Dropbox";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import Chip from "@material-ui/core/Chip";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import IconButton from "@material-ui/core/IconButton";
import CantFindDrizzle from "./Components/CantFindDrizzle";

import "./Modal.css";
import Modal from "./Modal";
import useModal from "./useModal";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  hoverFocus: {
    color: "#3f51b5",
    "&:hover, &.Mui-focusVisible": {
      backgroundColor: "#3f51b5",
      color: "white",
    },
  },
}));

const dropboxStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  // alignItems: "center",
  padding: "20px",
  height: 200,
  borderWidth: 5,
  borderRadius: 2,
  borderColor: "darkgray",
  borderStyle: "dashed",
  backgroundColor: "#CECECE",
  color: "#000000",
  transition: "border .24s ease-in-out",
};

const goDoc = () => {
  window.open("https://www.reg.kmitl.ac.th/index/index.php");
}

function Revoke(props) {
  const drizzle = props.location.drizzle;
  const classes = useStyles();
  const history = useHistory();
  const picUploadSize = "20%";

  const [resetState, clickReset] = useState(false);
  const [revokeState, revokeTrigger] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const { isShowing, toggle } = useModal();
  var drizzleIn = false;
  if (drizzle !== undefined) {
    drizzleIn = true;
  }
  const handleChange = (event) => {
    setConfirmText(event.target.value);
  };

  return (
    <div>
      <IconButton
        className={classes.hoverFocus}
        onClick={() => {
          history.push("/");
        }}
      >
        <ArrowBackIcon fontSize="large" />
      </IconButton>
      {drizzleIn && (
        <div>
          <Box
            display="flex"
            flexDirection="column"
            flexWrap="wrap"
            justifyContent="center"
            m={1}
            p={1}
            bgcolor="background.paper"
          >
            <Box p={1} textAlign="center">
              <h3 text-align="center">
                Upload your Certificate file to validate.
              </h3>
            </Box>
            <Box p={1} align="center" alignSelf="center">
              <Dropbox
                picsize={picUploadSize}
                dropboxStyle={dropboxStyle}
                revoke={revokeState}
                confirmText={confirmText}
                reset={resetState}
                drizzle={drizzle}
                caller={"revoke"}
              />
            </Box>
            <Box
              align="center"
              alignSelf="center"
              css={{ width: 600, height: 100 }}
            >
              <TextField
                required
                id="outlined-search"
                label="confirm text"
                value={confirmText}
                type="text"
                variant="outlined"
                fullWidth
                helperText="confirm text"
                onChange={handleChange}
              />
            </Box>

            <Box
              display="flex"
              flexDirection="row"
              flexWrap="wrap"
              justifyContent="center"
              bgcolor="background.paper"
            >
              <Box mx={4}>
                <Button
                  variant="contained"
                  onClick={() => {
                    clickReset(!resetState);
                  }}
                >
                  Reset
                </Button>
              </Box>
              <Box mx={4}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    revokeTrigger(!revokeState);
                  }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Box>
          <Chip
            color="primary"
            icon={<HelpOutlineIcon />}
            label="How to use"
            onClick={goDoc}
            style={{ position: "absolute", bottom: 10, right: 10 }}
          />
          <Modal isShowing={isShowing} hide={toggle} />
        </div>
      )}
      {!drizzleIn && <CantFindDrizzle />}
    </div>
  );
}

export default Revoke;

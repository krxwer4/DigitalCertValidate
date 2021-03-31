import React, { useState } from "react";
import Dropbox from "./Components/Dropbox";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import CantFindDrizzle from "./Components/CantFindDrizzle";

import "./Modal.css";
import Modal from "./Modal";
import useModal from "./useModal";

const useStyles = makeStyles((theme) => ({
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
  height: 300,
  borderWidth: 5,
  borderRadius: 2,
  borderColor: "darkgray",
  borderStyle: "dashed",
  backgroundColor: "#CECECE",
  color: "#000000",
  transition: "border .24s ease-in-out",
};

function Regiscert(props) {
  const drizzle = props.location.drizzle;
  console.log(drizzle);
  const history = useHistory();
  const classes = useStyles();
  const [resetState, clickReset] = useState(false);
  const [submitState, submitTrigger] = useState(false);
  const { isShowing, toggle } = useModal();
  const uploadPicSize = "32%";
  console.log("regist");
  var drizzleIn = false;
  if (drizzle !== undefined) {
    drizzleIn = true;
  }
  
  const goDoc = () => {
    window.open("https://op-digitalcertval-docu.netlify.app/docs/doc1.html#regist-cert");
  }

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
            bgcolor="background.paper"
          >
            <Box textAlign="center">
              <h3 text-align="center">Upload Certificate files.</h3>
            </Box>
            {/* dropbox */}
            <Box
              p={1}
              align="center"
              alignSelf="center"
              css={{ width: 670, height: 370 }}
            >
              <Dropbox
                picsize={uploadPicSize}
                dropboxStyle={dropboxStyle}
                reset={resetState}
                submitReg={submitState}
                drizzle={drizzle}
                caller={"regist"}
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
                    submitTrigger(!submitState);
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
            style={{position: "absolute", bottom: 10, right: 10}}
          />
          <Modal isShowing={isShowing} hide={toggle} />
        </div>
      )}
      {!drizzleIn && <CantFindDrizzle />}
    </div>
  );
}

export default Regiscert;

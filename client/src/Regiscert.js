import React, { useState } from "react";
import Dropbox from "./Components/Dropbox";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

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
  const uploadPicSize = "32%";
  console.log("regist");
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
    </div>
  );
}

export default Regiscert;

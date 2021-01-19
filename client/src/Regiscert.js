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

function Regiscert() {
  
  const history = useHistory();
  const classes = useStyles();
  const [resetState, clickReset] = useState(0);
  const [submitState, submitTrigger] = useState(false);
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
          css={{ width: 670, height: 350 }}
        >
          <Dropbox reset={resetState} submit={submitState} />
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
                clickReset(resetState + 1);
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

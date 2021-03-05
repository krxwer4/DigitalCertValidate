import React from "react";
import Box from "@material-ui/core/Box";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import clWebRegist from "../svg/CLwebsite.svg";
import blower from "../svg/party-blower.svg";

const useStyles = makeStyles((theme) => ({
  hoverFocus: {
    color: "#3f51b5",
    "&:hover, &.Mui-focusVisible": {
      backgroundColor: "#3f51b5",
      color: "white",
    },
  },
}));

const WebRegistComplete = (props) => {
  console.log(props)
  const account = props.location.account
  const url = props.location.url
  const history = useHistory();
  const classes = useStyles();
  if(props.location.caller !== "webreg"){
    history.push("/")
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
      <Box
        display="flex"
        flexDirection="column"
        flexWrap="wrap"
        justifyContent="center"
        m={1}
        p={1}
        bgcolor="background.paper"
      >
        <Box textAlign="center">
          <img src={clWebRegist} alt="forgot" width="270px" />
        </Box>

        <Box textAlign="center">
          <p>Your Account : {account}</p>
        </Box>

        <Box textAlign="center">
          <p>Match to this Url:</p>
        </Box>

        <Box textAlign="center">
          <Box
            display="flex"
            flexDirection="row"
            flexWrap="nowrap"
            justifyContent="center"
          >
            <img
              src={blower}
              alt="forgot"
              width="45px"
              style={{ transform: `scale(-1,1)`, marginRight: "10px" }}
            />
            <p>{url}</p>
            <img
              src={blower}
              alt="forgot"
              width="45px"
              style={{ marginLeft: "10px" }}
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default WebRegistComplete;

import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { orange , grey } from "@material-ui/core/colors";
import clWebRegist from "../svg/CLwebsite.svg"
import Box from "@material-ui/core/Box";

const WebRegistButton = (props) => {
  const WebRegistButStyle = withStyles((theme) => ({
    root: {
      color: grey[900],
      // backgroundColor: orange[300],
      borderWidth:"3px",
      borderColor: orange[500],
      width: "20rem",
      height: "13rem",
      "&:hover": {
        backgroundColor: orange[500],
        borderColor: orange[700],
        color: grey[900],
      },
    },
  }))(Button);

  return (
    <Link
      to={{
        pathname: "/webregist",
        drizzle: props.drizzle,
      }}
    >
      <WebRegistButStyle variant="outlined">
      <Box
          display="flex"
          flexDirection="column"
          flexWrap="wrap"
          justifyContent="center"
        >
          <Box align="center" alignSelf="center">
            <img src={clWebRegist} alt="forgot" width="96px" />
          </Box>
          <Box align="center" alignSelf="center">
            Web Regist
          </Box>
        </Box>
      </WebRegistButStyle>
    </Link>
  );
};

export default WebRegistButton;

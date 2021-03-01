import React from "react";

import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { pink, grey } from "@material-ui/core/colors";
import correctionImg from "../svg/correction.svg"
import Box from "@material-ui/core/Box";
const ValidateButton = (props) => {

  const ValidateButStyle = withStyles((theme) => ({
    root: {
      borderWidth: "3px",
      borderColor: pink[500],
      color: grey[900],
      width: "20rem",
      height: "13rem",
      "&:hover": {
        backgroundColor: pink[500],
        borderColor: pink[700],
        color: pink[50],
      },
    },
  }))(Button);

  return (
    <Link
      to={{
        pathname: "/validate",
        drizzle: props.drizzle,
      }}
    >
      <ValidateButStyle variant="outlined" >
      <Box
          display="flex"
          flexDirection="column"
          flexWrap="wrap"
          justifyContent="center"
        >
          <Box align="center" alignSelf="center">
            <img src={correctionImg} alt="forgot" width="96px" />
          </Box>
          <Box align="center" alignSelf="center">
            Validate Certificate
          </Box>
        </Box>
      </ValidateButStyle>
    </Link>
  );
};

export default ValidateButton;

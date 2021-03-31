import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { blue, grey } from "@material-ui/core/colors";
import trueFalseImg from "../svg/correction.svg";
import Box from "@material-ui/core/Box";
const ToggleButton = (props) => {
  const ToggleButStyle = withStyles((theme) => ({
    root: {
      // backgroundColor: blue[300],
      borderWidth: "3px",
      borderColor: blue[500],
      color: grey[900],
      width: "20rem",
      height: "13rem",
      "&:hover": {
        backgroundColor: blue[500],
        borderColor: blue[700],
        color: blue[50],
      },
    },
  }))(Button);

  return (
    <Link
      to={{
        pathname: "/revoke",
        drizzle: props.drizzle,
      }}
    >
      <ToggleButStyle variant="outlined">
        <Box
          display="flex"
          flexDirection="column"
          flexWrap="wrap"
          justifyContent="center"
        >
          <Box align="center" alignSelf="center">
            <img src={trueFalseImg} alt="forgot" width="96px" />
          </Box>
          <Box align="center" alignSelf="center">
            Revoke/Unrevoke Certificate
          </Box>
        </Box>
      </ToggleButStyle>
    </Link>
  );
};

export default ToggleButton;

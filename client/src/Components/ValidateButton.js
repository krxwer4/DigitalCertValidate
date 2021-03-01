import React from "react";

import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { pink, grey } from "@material-ui/core/colors";

const ValidateButton = (props) => {

  const ValidateButStyle = withStyles((theme) => ({
    root: {
      backgroundColor: pink[300],
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
      <ValidateButStyle variant="outlined" color="primary" size="large">
        Cert Check
      </ValidateButStyle>
    </Link>
  );
};

export default ValidateButton;

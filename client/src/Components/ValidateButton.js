import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { pink, grey } from "@material-ui/core/colors";

const ValidateButton = () => {
  const history = useHistory();

  const ValidateButStyle = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(pink[500]),
      backgroundColor: pink[300],
      borderColor: pink[500],
      color: grey[900],
      width: "13rem",
      height: "13rem",
      "&:hover": {
        backgroundColor: pink[500],
        borderColor: pink[700],
        color: pink[50],
      },
    },
  }))(Button);

  return (
    <ValidateButStyle
      onClick={() => {
        history.push("/validate");
      }}
      variant="outlined"
      color="primary"
      size="large"
    >
      Cert Check
    </ValidateButStyle>
  );
};

export default ValidateButton;

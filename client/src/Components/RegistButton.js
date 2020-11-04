import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { green,blue } from "@material-ui/core/colors";

const RegistButton = () => {
  const history = useHistory();
  const RegistCertButStyle = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(green[500]),
      backgroundColor: green[300],
      borderColor: green[500],
      width: "13rem",
      height: "13rem",
      "&:hover": {
        backgroundColor: green[500],
        borderColor: green[700],
        color: blue[50],
      },
    },
  }))(Button);

  return (
    <RegistCertButStyle
      onClick={() => {
        history.push("/regist");
      }}
      variant="outlined"
      color="primary"
    >
      Regist Cert
    </RegistCertButStyle>
  );
};

export default RegistButton;

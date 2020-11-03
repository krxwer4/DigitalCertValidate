import React from "react";
import { useHistory } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { green, blue } from "@material-ui/core/colors";

function Choice() {
  const ValidateButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(blue[500]),
      backgroundColor: blue[300],
      borderColor: blue[500],
      "&:hover": {
        backgroundColor: blue[500],
        borderColor: blue[700],
      },
    },
  }))(Button);

  const RegistCert = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(green[500]),
      backgroundColor: green[300],
      borderColor: green[500],
      "&:hover": {
        backgroundColor: green[500],
        borderColor: green[700],
      },
    },
  }))(Button);
  const history = useHistory();

  return (
    <div>
      <RegistCert
        onClick={()=>{history.push('/regist')}}
        variant="outlined"
        color="primary"
        size="large"
      >
        Regist Cert
      </RegistCert>
      <ValidateButton
        onClick={()=>{history.push('/validate')}}
        variant="outlined"
        color="primary"
        size="large"
      >
        Cert Check
      </ValidateButton>
    </div>
  );
}

export default Choice;

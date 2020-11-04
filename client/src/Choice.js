import React from "react";

import { useRoutes, RT } from "hookrouter";
import routes from "./router";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
// import "./Choice.css";
import { green, blue } from "@material-ui/core/colors";

function Choice() {
  const routeResult = useRoutes(routes);
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

  return (
    <div>
      <RT href="/regist">regist Page</RT> <br />
      <RT href="/validate">validate Page</RT>
      <br />
      {routeResult}
      <RegistCert variant="outlined" color="primary" size="large">
        Regist Cert
      </RegistCert>
      <ValidateButton variant="outlined" color="primary" size="large">
        Cert Check
      </ValidateButton>
    </div>
  );
}

export default Choice;

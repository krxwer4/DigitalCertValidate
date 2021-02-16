import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";

const WebRegistButton = (props) => {
  const WebRegistButStyle = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(orange[500]),
      backgroundColor: orange[300],
      borderColor: orange[500],
      width: "13rem",
      height: "13rem",
      "&:hover": {
        backgroundColor: orange[500],
        borderColor: orange[700],
        color: orange[50],
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
      <WebRegistButStyle variant="outlined" color="primary" size="large">
        Web Regist
      </WebRegistButStyle>
    </Link>
  );
};

export default WebRegistButton;

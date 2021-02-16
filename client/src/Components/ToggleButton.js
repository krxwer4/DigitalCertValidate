import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { blue, grey } from "@material-ui/core/colors";

const ToggleButton = (props) => {

  const ToggleButStyle = withStyles((theme) => ({
    root: {
      backgroundColor: blue[300],
      borderColor: blue[500],
      color: grey[900],
      width: "13rem",
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
      <ToggleButStyle
        variant="outlined"
        color="primary"
        size="large"
      >
        Revoke/Unrevoke
        Certificate
      </ToggleButStyle>
    </Link>
  );
};

export default ToggleButton;

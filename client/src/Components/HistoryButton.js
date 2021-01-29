import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { blue, grey } from "@material-ui/core/colors";

const HistoryButton = (props) => {

  const HistoryButStyle = withStyles((theme) => ({
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
        pathname: "/",
        drizzle: props.drizzle,
      }}
    >
      <HistoryButStyle
        variant="outlined"
        color="primary"
        size="large"
      >
        History
      </HistoryButStyle>
    </Link>
  );
};

export default HistoryButton;

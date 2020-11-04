import React from "react";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { withStyles} from "@material-ui/core/styles";
import { blue, grey } from "@material-ui/core/colors";

const HistoryButton = () => {
  const history = useHistory();

  const HistoryButStyle = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(blue[500]),
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
    <HistoryButStyle
      onClick={() => {
        history.push("/");
      }}
      variant="outlined"
      color="primary"
      size="large"
    >
      History
    </HistoryButStyle>
  );
};

export default HistoryButton;

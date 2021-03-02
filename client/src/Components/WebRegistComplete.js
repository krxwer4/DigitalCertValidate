import React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
import clWebRegist from "../src/svg/CLwebsite.svg";

const CantFindDrizzle = () => {
  const history = useHistory();

  return (
    <div>
      <IconButton
        className={classes.hoverFocus}
        onClick={() => {
          history.push("/");
        }}
      >
        <ArrowBackIcon fontSize="large" />
      </IconButton>
      <Box
          display="flex"
          flexDirection="column"
          flexWrap="wrap"
          justifyContent="center"
          m={1}
          p={1}
          bgcolor="background.paper"
        >
          <Box p={1} textAlign="center">
            <img src={clWebRegist} alt="forgot" width="270px" />
          </Box>
        </Box>
    </div>
  );
};

export default CantFindDrizzle;

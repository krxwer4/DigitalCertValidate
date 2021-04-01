import React from "react";
import Box from "@material-ui/core/Box";
import oopsIcon from "../svg/oops.svg";

const CantFindDrizzle = () => {
  return (
    <div>
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
          <img src={oopsIcon} alt="Freepik" width="250px" />
        </Box>
        <Box p={1} textAlign="center">
          <h1>Sorry. We can't find web3 object.</h1>
        </Box>
        <Box p={1} textAlign="center">
          <h3>Please go back to main menu and try again.</h3>
        </Box>
      </Box>
    </div>
  );
};

export default CantFindDrizzle;

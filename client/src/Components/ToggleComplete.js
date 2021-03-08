import React, { useEffect } from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import toggleIcon from "../svg/choice.svg";
import { Link } from "react-router-dom";

const ToggleComplete = (props) => {
  useEffect(() => {
    console.log(props);
  });
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
          <img src={toggleIcon} alt="freepik" width="350px" />
        </Box>
        <Box p={1} textAlign="center">
          <h1>Please comfirm your transaction in Metamask!</h1>
          <h2>Then your certificate's status will changed.</h2>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="center"
          bgcolor="background.paper"
        >
          <Box mx={4}>
            <Link to={{ pathname: "/" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  console.log("wait for edit");
                }}
              >
                Menu
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default ToggleComplete;

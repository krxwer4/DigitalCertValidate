import React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const RegCertSuccess = () => {
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
          <h1>Please comfirm your transaction in Metamask!</h1>
          <h2>So that your certificate will available in Blockchain.</h2>
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
                onClick={() => {
                  console.log("wait for edit");
                }}
              >
                Menu
              </Button>
            </Link>
          </Box>
          <Box mx={4}>
            <Link to={{ pathname: "/" }}>
              <Button
                variant="contained"
                color = "primary"
                onClick={() => {
                  console.log("wait for edit");
                }}
              >
                View History
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default RegCertSuccess;

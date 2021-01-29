import React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

RegCertSuccess = () => {
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
            <Button
              variant="contained"
              onClick={() => {
                console.log("wait for edit");
              }}
            >
              Menu
            </Button>
          </Box>
          <Box mx={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                console.log("wait for edit too");
              }}
            >
              View History
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default RegCertSuccess;

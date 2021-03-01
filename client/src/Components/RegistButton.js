import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { green, blue , grey} from "@material-ui/core/colors";
import fileImportIcon from "../svg/upload.svg";
import Box from "@material-ui/core/Box";

const RegistButton = (props) => {
  // console.log(props)
  const RegistCertButStyle = withStyles((theme) => ({
    root: {
      color:grey[900],
      // backgroundColor: green[300],
      borderWidth: "3px",
      borderColor: green[500],
      width: "20rem",
      height: "13rem",
      "&:hover": {
        backgroundColor: green[500],
        borderColor: green[700],
        color: blue[50],
      },
    },
  }))(Button);

  return (
    <Link
      to={{
        pathname: "/regist",
        drizzle: props.drizzle,
      }}
    >
      <RegistCertButStyle variant="outlined">
        <Box
          display="flex"
          flexDirection="column"
          flexWrap="wrap"
          justifyContent="center"
        >
          <Box align="center" alignSelf="center">
            <img src={fileImportIcon} alt="forgot" width="96px" />
          </Box>
          <Box align="center" alignSelf="center">
            Regist Cert
          </Box>
        </Box>
      </RegistCertButStyle>
    </Link>
  );
};

export default RegistButton;

import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import { Link } from "react-router-dom";
import CantFindDrizzle from "./Components/CantFindDrizzle";
import bwWebRegist from "../src/svg/BWwebsite.svg";

import "./Modal.css";
import Modal from "./Modal";
import useModal from "./useModal";

const { useDrizzleState } = drizzleReactHooks;

const useStyles = makeStyles((theme) => ({
  hoverFocus: {
    color: "#3f51b5",
    "&:hover, &.Mui-focusVisible": {
      backgroundColor: "#3f51b5",
      color: "white",
    },
  },
}));

const goDoc = () => {
  window.open("https://www.reg.kmitl.ac.th/index/index.php");
}

function WebRegist(props) {
  const drizzle = props.location.drizzle;
  console.log(drizzle);
  var drizzleIn = false;
  var contract = {};
  const drizzleState = useDrizzleState((drizzleState) => drizzleState);
  const { isShowing, toggle } = useModal();
  if (drizzle !== undefined) {
    console.log(typeof drizzle.contracts.Poe);
    drizzleIn = true;
    contract = drizzle.contracts.Poe;
  }
  const history = useHistory();
  const classes = useStyles();
  console.log("webregist");
  const [linkText, setLinkText] = useState("");

  const handleChange = (event) => {
    setLinkText(event.target.value);
  };

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

      {drizzleIn && (
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
              <img src={bwWebRegist} alt="forgot" width="270px" />
            </Box>

            <Box p={1} textAlign="center">
              <h3 text-align="center">
                Your Public Key : {drizzleState.accounts[0]}
              </h3>
            </Box>

            <Box
              display="flex"
              flexDirection="row"
              flexWrap="nowrap"
              align="center"
              alignSelf="center"
              // css={{ width: 600, height: 100 }}
            >
              <h3 text-align="center">Enter School Url : </h3>
              <TextField
                required
                id="outlined-search"
                label="School's Url"
                value={linkText}
                type="text"
                variant="outlined"
                style={{ width: "475px", marginLeft: "5px" }}
                helperText="Url that contain your public key"
                onChange={handleChange}
              />
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
                    setLinkText("");
                  }}
                >
                  Clear
                </Button>
              </Box>
              <Box mx={4}>
                <Link
                  to={{
                    pathname: "/webregcomp",
                    url: linkText,
                    account: drizzleState.accounts[0],
                    caller: "webreg",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      contract.methods["mapAdder"].cacheSend(linkText, {
                        from: drizzleState.accounts[0],
                      });
                      console.log("s");
                    }}
                  >
                    Submit
                  </Button>
                </Link>
              </Box>
            </Box>
          </Box>
          <Chip
            color="primary"
            icon={<HelpOutlineIcon />}
            label="How to use"
            onClick={goDoc}
            style={{ position: "absolute", bottom: 10, right: 10 }}
          />
          <Modal isShowing={isShowing} hide={toggle} />
        </div>
      )}
      {!drizzleIn && <CantFindDrizzle />}
    </div>
  );
}

export default WebRegist;

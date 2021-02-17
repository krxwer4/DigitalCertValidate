import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { drizzleReactHooks } from "@drizzle/react-plugin";
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

function WebRegist(props) {
  const drizzle = props.location.drizzle;
  console.log(drizzle);
  const contract = drizzle.contracts.Poe;
  const drizzleState = useDrizzleState((drizzleState) => drizzleState);
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
          <h3 text-align="center">Web Regist</h3>
        </Box>

        <Box
          align="center"
          alignSelf="center"
          css={{ width: 600, height: 100 }}
        >
          <TextField
            required
            id="outlined-search"
            label="School's Url"
            value={linkText}
            type="text"
            variant="outlined"
            fullWidth
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
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default WebRegist;

import React, { useState } from "react";
import Dropbox from "./Components/Dropbox";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import Chip from "@material-ui/core/Chip";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import IconButton from "@material-ui/core/IconButton";
import CantFindDrizzle from "./Components/CantFindDrizzle";


export const Context = React.createContext({
  validateResult: null,
  setValidateResult: () => {},
});

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  hoverFocus: {
    color: "#3f51b5",
    "&:hover, &.Mui-focusVisible": {
      backgroundColor: "#3f51b5",
      color: "white",
    },
  },
}));

const dropboxStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  // alignItems: "center",
  padding: "20px",
  height: 200,
  borderWidth: 5,
  borderRadius: 2,
  borderColor: "darkgray",
  borderStyle: "dashed",
  backgroundColor: "#CECECE",
  color: "#000000",
  transition: "border .24s ease-in-out",
};



function Validate(props) {
  const drizzle = props.location.drizzle;
  const classes = useStyles();
  const history = useHistory();
  const picUploadSize = "20%";
  const [resetState, clickReset] = useState(false);
  const [validateState, validateTrigger] = useState(false);
  const [pubValue, setPubValue] = useState("");
  var drizzleIn = false;
  if (drizzle !== undefined) {
    drizzleIn = true;
  }

  const goDoc = () => {
    window.open("https://op-digitalcertval-docu.netlify.app/docs/doc1.html#regist-cert");
  }

  const handleChange = (event) => {
    setPubValue(event.target.value);
  };

  const resetClick = () =>{
    setPubValue("");
  }

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
              <h3 text-align="center">
                Upload your Certificate file to validate.
              </h3>
            </Box>
            <Box p={1} align="center" alignSelf="center">
              <Dropbox
                picsize={picUploadSize}
                dropboxStyle={dropboxStyle}
                validate={validateState}
                publicKey={pubValue}
                reset={resetState}
                drizzle={drizzle}
                caller={"validate"}
              />
            </Box>
            <Box
              align="center"
              alignSelf="center"
              css={{ width: 600, height: 100 }}
            >
              <TextField
                required
                id="outlined-search"
                label="Public Key"
                value={pubValue}
                type="text"
                variant="outlined"
                fullWidth
                helperText="School's Public Key"
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
                    clickReset(!resetState);
                    resetClick();
                  }}
                >
                  Reset
                </Button>
              </Box>
              <Box mx={4}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    if (pubValue !== "") {
                      validateTrigger(!validateState);
                    } else {
                      console.log("pls enter pubkey");
                    }
                  }}
                >
                  Submit
                </Button>
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
        </div>
      )}
      {!drizzleIn && <CantFindDrizzle />}
    </div>
  );
}

export default Validate;

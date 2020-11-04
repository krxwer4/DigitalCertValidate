import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
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

function Validate() {
  const classes = useStyles();
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
          <h3 text-align="center">Upload your Certificate file to validate.</h3>
        </Box>
        <Box
          p={1}
          align="center"
          alignSelf="center"
          bgcolor="grey.300"
          css={{ width: 500, height: 200 }}
        >
          details
        </Box>
        <Box m={1} p={1} align="center" alignSelf="center">
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              Upload
            </Button>
          </label>
        </Box>
        <Box
          align="center"
          alignSelf="center"
          css={{ width: 600, height: 200 }}
        >
          <TextField
            required
            id="outlined-search"
            label="Public Key"
            type="text"
            variant="outlined"
            fullWidth
            helperText="School's Public Key"
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
            <Button variant="contained">Reset</Button>
          </Box>
          <Box mx={4}>
            <Button variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Validate;

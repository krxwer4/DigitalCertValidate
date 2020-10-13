import React from "react";
import "./Regiscert.css";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

function Validate() {
  const classes = useStyles();

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
          <h3 text-align="center">Upload your Certificate file.</h3>
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
            <Button variant="contained" >
              Reset
            </Button>
          </Box>
          <Box mx={4}>
            <Button variant="contained" color="primary" >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Validate;

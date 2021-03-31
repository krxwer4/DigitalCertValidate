import React from "react";
import Grid from "@material-ui/core/Grid";
import RegistButton from "./Components/RegistButton";
import ValidateButton from "./Components/ValidateButton";
import ToggleButton from "./Components/ToggleButton";
import WebRegistButton from "./Components/WebRegistButton";
import Chip from "@material-ui/core/Chip";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { makeStyles } from "@material-ui/core/styles";

const centStyle = makeStyles((theme) => ({
  cent: {
    position: "fixed",
    top: "25%",
    left: "0%",
  },
}));

function Menu(props) {
  const goDoc = () => {
    window.open("https://op-digitalcertval-docu.netlify.app/docs/doc1.html");
  }

  const { drizzle } = props;
  const classes = centStyle();
  // console.log(props.drizzle);
  return (
    <div>
      <Grid
        className={classes.cent}
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={5}
      >
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={5}
          >
            <Grid item xs={6}>
              <WebRegistButton drizzle = {drizzle}/>
            </Grid>
            <Grid item xs={6}>
              <RegistButton drizzle = {drizzle}/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={5}
          >
            <Grid item xs={6}>
              <ValidateButton drizzle = {drizzle}/>
            </Grid>
            <Grid item xs={6}>
              <ToggleButton drizzle = {drizzle}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Chip
            color="primary"
            icon={<HelpOutlineIcon />}
            label="How to use"
            onClick={goDoc}
            style={{position: "absolute", bottom: 10, right: 10}}
          />
    </div>
  );
}

export default Menu;

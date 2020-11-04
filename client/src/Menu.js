import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import RegistButton from "./Components/RegistButton";
import ValidateButton from "./Components/ValidateButton";
import HistoryButton from "./Components/HistoryButton";
import WebRegistButton from "./Components/WebRegistButton";
import { makeStyles } from "@material-ui/core/styles";

const centStyle = makeStyles((theme) => ({
  cent: {
    position: "fixed",
    top: "25%",
    left: "0%",
  },
}));

function Menu() {
  const classes = centStyle();

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
              <WebRegistButton />
            </Grid>
            <Grid item xs={6}>
              <RegistButton />
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
              <ValidateButton />
            </Grid>
            <Grid item xs={6}>
              <HistoryButton />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Menu;

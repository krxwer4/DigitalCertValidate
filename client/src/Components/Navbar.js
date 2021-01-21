import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Drizzle } from "@drizzle/store";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import Poe from "../artifacts/Poe.json";
import LoadingContainer from "./LoadingContainer";
import DrizzleComponent from "./DrizzleComponent"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const drizzleOptions = {
  contracts: [Poe],
  // events: {
  //   Poe: ["Poeset"],
  // },
};

const drizzleO = new Drizzle(drizzleOptions);
const { DrizzleProvider } = drizzleReactHooks;

// const { AccountData } = newContextComponents;

const Navbar = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Digital Certificate Validator
        </Typography>
        <DrizzleProvider drizzle={drizzleO}>
          <LoadingContainer>
            <DrizzleComponent/>
          </LoadingContainer>
        </DrizzleProvider>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

import React from "react";

import { Drizzle } from "@drizzle/store";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import Poe from "./artifacts/Poe.json";
import LoadingContainer from "./Components/LoadingContainer";
import DappComponents from "./DappComponents";

const drizzleOptions = {
  contracts: [Poe],
  // events: {
  //   Poe: ["Poeset"],
  // },
};

const drizzle = new Drizzle(drizzleOptions);
const { DrizzleProvider } = drizzleReactHooks;

// const { AccountData } = newContextComponents;

function App() {

  return (
    <DrizzleProvider drizzle={drizzle}>
      <LoadingContainer>
        <DappComponents drizzle = {drizzle}/>
      </LoadingContainer>
    </DrizzleProvider>
  );
}

export default App;

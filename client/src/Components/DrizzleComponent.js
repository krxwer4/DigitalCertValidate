import React, { useState } from "react";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import { newContextComponents } from "@drizzle/react-components";

const { useDrizzle, useDrizzleState } = drizzleReactHooks;
const { AccountData } = newContextComponents;

export default () => {
  const { drizzle } = useDrizzle();
  const state = useDrizzleState((state) => state);

  return (
    <AccountData
      drizzle={drizzle}
      drizzleState={state}
      accounts={state.accounts}
      accountIndex={0}
      units="ether"
      precision={3}
    />
  );
};

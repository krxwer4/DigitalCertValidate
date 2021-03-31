import React from "react";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import { newContextComponents } from "@drizzle/react-components";

const { useDrizzle, useDrizzleState } = drizzleReactHooks;
const { AccountData } = newContextComponents;

export default () => {
  const { drizzle } = useDrizzle();
  // const drizzleState = useDrizzleState((drizzleState) => ({
  //   accounts: drizzleState.accounts,
  //   balance: drizzleState.accountBalances[drizzleState.accounts[0]],
  // }));
  const drizzleState = useDrizzleState((drizzleState) => drizzleState);
  // console.log(drizzleState.accounts[0]);
  return (
    <AccountData
      drizzle={drizzle}
      drizzleState={drizzleState}
      accounts={drizzleState.accounts}
      accountIndex={0}
      units="ether"
      precision={3}
    />
    // {/* <p>{state.accounts[0]} {state.balance}</p> */}
  );
};

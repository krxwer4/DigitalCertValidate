import React, { useEffect } from "react";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import { newContextComponents } from "@drizzle/react-components";

const { useDrizzle, useDrizzleState } = drizzleReactHooks;
const { AccountData } = newContextComponents;

export default () => {
  const { drizzle } = useDrizzle();
  // const state = useDrizzleState((state) => ({
  //   accounts: state.accounts,
  //   balance: state.accountBalances[state.accounts[0]],
  // }));
  const state = useDrizzleState((state) => state);

  useEffect(() => {
    console.log("accout change")
  }, [state.accounts]);

  console.log(state);
  return (
    <AccountData
      drizzle={drizzle}
      drizzleState={state}
      accounts={state.accounts}
      accountIndex={0}
      units="ether"
      precision={3}
    />
    // {/* <p>{state.accounts[0]} {state.balance}</p> */}
  );
};

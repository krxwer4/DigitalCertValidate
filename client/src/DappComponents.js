import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import history from "./history";
import Navbar from "./Components/Navbar";
import Menu from "./Menu";
import Regiscert from "./Regiscert";
import Validate from "./Validate";
// import TransHistory from "./TransHistory"

function DappComponents(props) {
  const { drizzle } = props;
  // console.log(drizzle)
  useEffect(() => {
    history.listen(() => {
      console.log("wow");
    });
  }, []);

  return (
    <div className="App">
      <Router history={history}>
        <Navbar drizzle = {drizzle}/>
        <Switch>
          <Route exact path="/" render = {(props) => <Menu drizzle = {drizzle}/>}/>
          <Route path="/regist" component={Regiscert} />
          <Route path="/validate" component={Validate} />
        </Switch>
      </Router>
    </div>
  );
}

export default DappComponents;

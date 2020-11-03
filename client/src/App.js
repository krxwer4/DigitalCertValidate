import React, { useEffect } from "react";

import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import history from "./history";

import Choice from "./Choice";
import Regiscert from "./Regiscert";
import Validate from "./Validate";

function App() {
  useEffect(() => {
    history.listen(() => {
      console.log("wow");
    });
  }, []);

  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Choice} />
          <Route path="/regist" component={Regiscert} />
          <Route path="/validate" component={Validate} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

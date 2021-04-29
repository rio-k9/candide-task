import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import CreateAccount from "./pages/CreateAccount";
import CreateAccountSuccess from "./pages/CreateAccountSuccess";
import { history } from "./store";

function App() {

  return (
    <Router history={history}>
      <Switch>
        <Route
          key="/"
          path="/"
          component={CreateAccount}
          exact={true}
        />
        <Route
          key="/success"
          path="/success"
          component={CreateAccountSuccess}
          exact={true}
        />
      </Switch>
    </Router>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Form } from "./Form";
import "./App.css";

const defaultHistory = createBrowserHistory();

export const App = ({ history = defaultHistory, handler }) => {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => <Form {...{ history, ...props, handler }} />}
        />
      </Switch>
    </Router>
  );
};

export default App;

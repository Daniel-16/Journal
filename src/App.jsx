import React from "react";
import Welcome from "./components/Welcome";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Login from "./components/Auth/Login";
import Home from "./components/Home";
import PrivateRoute from "./Route/privateRoute";

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <PrivateRoute exact path="/home" component={Home} />
          <Route path="/" exact component={Welcome} />
          <Route path="/signup" component={Auth} />
          <Route path="/login" component={Login} />
          {/* <Route path="/home" component={Home} /> */}
        </Switch>
      </Router>
    </div>
  );
};

export default App;

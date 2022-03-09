import React, { createContext, useState } from "react";
import Welcome from "./components/Welcome";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Login from "./components/Auth/Login";
import Home from "./components/Home";
import PrivateRoute from "./Route/privateRoute";

export const CredentialsContext = createContext();

const App = () => {
  const credentials = useState({});
  return (
    <div>
      <CredentialsContext.Provider value={credentials}>
        <Router>
          <Switch>
            <PrivateRoute exact path="/home" component={Home} />
            <Route path="/" exact component={Welcome} />
            <Route path="/signup" component={Auth} />
            <Route path="/login" component={Login} />
            {/* <Route path="/home" component={Home} /> */}
          </Switch>
        </Router>
      </CredentialsContext.Provider>
    </div>
  );
};

export default App;

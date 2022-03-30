import React, { createContext, useState } from "react";
import Welcome from "./components/Welcome";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Home from "./components/Home";
import PrivateRoute from "./Route/privateRoute";
import Journals from "./components/Journals";
import UserProfile from "./components/UserProfile";
import UpdateJournals from "./components/UpdateJournal";
import Privacy from "./components/Privacy Policy/Privacy";
import ReportProblem from "./components/ReportProblem";

export const CredentialsContext = createContext();

const App = () => {
  const credentials = useState({});
  return (
    <div>
      <CredentialsContext.Provider value={credentials}>
        <Router>
          <Switch>
            <PrivateRoute path="/home" exact component={Home} />
            <Route path="/" exact component={Welcome} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/journals" component={Journals} />
            <Route path="/profile" component={UserProfile} />
            <Route path="/updatejournal" component={UpdateJournals} />
            <Route path="/privacypolicy" component={Privacy} />
            <Route path="/reportproblem" component={ReportProblem} />
          </Switch>
        </Router>
      </CredentialsContext.Provider>
    </div>
  );
};

export default App;

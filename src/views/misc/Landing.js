import React from "react";
import { Route } from "react-router-dom";
import Navigation from "../Navigation";
import logOut from "../../actions/logOut";

const Landing = ({ auth }) => (
  <Route
    render={({ history }) => (
      <div>
        <p>Welcome to Ellmoe</p>
        <button onClick={() => logOut().then(() => history.push(`/`))}>
          log out
        </button>
        <Navigation />
      </div>
    )}
  />
);

export default Landing;

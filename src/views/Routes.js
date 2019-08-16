// the main routes of our app are defined here using react-router
// https://reacttraining.com/react-router/web/example/basic

import React from "react";
import { Switch, Route } from "react-router-dom";

import SignInPage from "./account/SignInPage";
import SignUpPage from "./account/SignUpPage";
import LocationList from "./locations/LocationList";
import LocationNew from "./locations/LocationNew";
import Search from "./search/Search";
import LocationEdit from "./locations/LocationEdit";
import Account from "./account/Account";
import Location from "./locations/Location";
import Error from "./misc/Error";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={LocationList} />
    <Route path="/new" component={LocationNew} />
    <Route path="/account" component={Account} />
    <Route path="/search" component={Search} />
    <Route path="/signIn" component={SignInPage} />;
    <Route path="/signUp" component={SignUpPage} />;
    <Route path="/:slug/edit" component={LocationEdit} />
    <Route path="/:slug" component={Location} />
    <Route component={Error} />
  </Switch>
);

export default Routes;

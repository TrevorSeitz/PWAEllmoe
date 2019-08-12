// the main routes of our app are defined here using react-router
// https://reacttraining.com/react-router/web/example/basic

import React from "react";
import { Switch, Route } from "react-router-dom";

// import PostList from "./posts/PostList";
import LocationList from "./locations/LocationList";
// import PostNew from "./posts/PostNew";
import LocationNew from "./locations/LocationNew";
import Search from "./search/Search";
import Account from "./account/Account";
import PostEdit from "./posts/PostEdit";
// import LocationsEdit from "./locations/LocationsEdit";
// import Post from "./posts/Post";
import Location from "./locations/Location";
import Error from "./misc/Error";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={LocationList} />
    <Route path="/new" component={LocationNew} />
    <Route path="/search" component={Search} />
    <Route path="/account" component={Account} />
    <Route path="/:slug/edit" component={PostEdit} />
    <Route path="/:slug" component={Location} />
    <Route component={Error} />
  </Switch>
);

export default Routes;

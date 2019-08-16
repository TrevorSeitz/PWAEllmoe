import React from "react";
import { Link } from "react-router-dom";

import SignOutButton from "../actions/signOut";

const Navigation = () => (
  <div>
    <div>
      <ul>
        <li>
          <Link to={"/signIn"}>Sign In</Link>
        </li>
        <li>
          <Link to={"/locationList"}>Location List</Link>
        </li>
        <li>
          <Link to={"/:slug/edit"}>Edit</Link>
        </li>
        <li>
          <Link to={"/:slug"}>Location</Link>
        </li>
        <li>
          <Link to={"/new"}>New Location</Link>
        </li>
        <li>
          <SignOutButton />
        </li>
      </ul>
    </div>
  </div>
);
const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={"/landing"}>Landing</Link>
    </li>
    <li>
      <Link to={"/signIn"}>Sign In</Link>
    </li>
  </ul>
);

export default Navigation;

import React from "react";
import { Link } from "react-router-dom";

import SignOutButton from "../actions/signOut";
import * as ROUTES from "./Routes";

const Navigation = () => (
  <div>
    <ul>
      <li>
        <Link to={"/signIn"}>Sign In</Link>
      </li>
      <li>
        <Link to={"/"}>Location List</Link>
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
);

export default Navigation;

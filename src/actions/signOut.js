import React from "react";
import Firebase from "firebase/app";
import ReactGA from "react-ga";

import { withFirebase } from "../Firebase";

const SignOutButton = ({ firebase }) => (
  ReactGA.event({
    category: "User",
    action: "Log out"
  }),
  (
    <button type="button" onClick={firebase.doSignOut}>
      Sign Out
    </button>
  )
);

export default withFirebase(SignOutButton);

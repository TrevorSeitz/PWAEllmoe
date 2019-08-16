import React from "react";
import Firebase from "firebase/app";
import ReactGA from "react-ga";

import { withFirebase } from "./helpers/firestoreHelpers";

const SignOutButton = ({}) => (
  ReactGA.event({
    category: "User",
    action: "Log out"
  }),
  (
    <button type="button" onClick={Firebase.doSignOut}>
      Sign Out
    </button>
  )
);

export default withFirebase(SignOutButton);

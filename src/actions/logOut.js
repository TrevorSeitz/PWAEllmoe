import Firebase from "firebase/app";
import ReactGA from "react-ga";

const logOut = () => {
  ReactGA.event({
    category: "User",
    action: "Log out"
  });
  localStorage.clear();
  return Firebase.auth().signOut();
};

export default logOut;

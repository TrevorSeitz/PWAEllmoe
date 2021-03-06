import Firebase from "firebase/app";
import ReactGA from "react-ga";

const logIn = () => {
  ReactGA.event({
    category: "User",
    action: "Log in"
  });

  let provider = new Firebase.auth.GoogleAuthProvider();

  return Firebase.auth()
    .signInWithRedirect(provider)
    .then(result => {
      console.log(`USER INFO ${result}`);
      console.log(`logged in as ${result.user.displayName}`);
      console.log(`USER INFO ${result}`);
    })
    .catch(error => {
      console.error("could not sign in", error);
    });
};

export default logIn;

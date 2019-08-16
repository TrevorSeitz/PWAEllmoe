import Firebase from "firebase/app";
import "firebase/auth";

const signUp = () => {
  ReactGA.event({
    category: "User",
    action: "Sign Up"
  });

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);
};
export default signUp;

doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

import Firebase from "firebase/app";
import "firebase/auth";

const passwordUpdate = () => {
  ReactGA.event({
    category: "User",
    action: "Password Update"
  });

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
};

export default passwordUpdate;

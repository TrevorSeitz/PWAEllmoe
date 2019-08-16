import Firebase from "firebase/app";
import "firebase/auth";

const resetPassword = () => {
  ReactGA.event({
    category: "User",
    action: "Reset Password"
  });

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
};

export default resetPassword;

import firebase from "firebase/app";
import { FirestoreProvider } from "react-firestore";
import React, { useState, useEffect } from "react";
import ReactGA from "react-ga";
import { BrowserRouter, Route } from "react-router-dom";
import { withFirebase } from "../actions/helpers/firestoreHelpers";
import ErrorBoundary from "./misc/ErrorBoundary";
import Routes from "./Routes";
import Layout from "./layout/Layout";
import "../styles/global";

const App = () => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    console.log("Running App useEffect...");
    const authListener = firebase.auth().onAuthStateChanged(authUser => {
      console.log("authUser: ", authUser);
      console.log("authUser.uid", authUser.uid);
      localStorage.setItem("authUser", authUser.uid);

      if (authUser) {
        setAuthUser(authUser);
        // setAuthWasListened(true);
      } else {
        setAuthUser(null);
        // setAuthWasListened(true);
      }
    });
    return () => authListener(); // THIS MUST BE A FUNCTION, AND NOT A FUNCTION CALL
  }, []);

  return (
    <FirestoreProvider firebase={firebase}>
      <BrowserRouter>
        <ErrorBoundary>
          <Layout>
            <Route path="/" component={ScrollToTop} />
            <Routes authUser={authUser} />
          </Layout>
        </ErrorBoundary>
      </BrowserRouter>
    </FirestoreProvider>
  );
};

// scroll to top on route change
// https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/scroll-restoration.md#scroll-to-top
class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }
  render() {
    return null;
  }
}

// Track Google Analytics page view for every route
// https://github.com/react-ga/react-ga/issues/122#issuecomment-319546248
const Analytics = ({ location }) => {
  const page = location.pathname + location.search;
  ReactGA.set({ page });
  ReactGA.pageview(page);
  return null;
};

export default withFirebase(App);

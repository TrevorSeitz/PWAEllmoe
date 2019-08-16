// Helper functions for working with Firebase Firestore

import React from "react";
import Firebase from "firebase/app";
import "firebase/auth";

const prepareDocForCreate = doc => {
  // timestamps
  doc.createdBy = Firebase.auth().currentUser
    ? Firebase.auth().currentUser.uid
    : null;
  // doc.createdOn = Firebase.firestore.Timestamp.now()

  return doc;
};

const prepareDocForUpdate = doc => {
  // timestamps
  doc.updatedBy = Firebase.auth().currentUser
    ? Firebase.auth().currentUser.uid
    : null;
  // doc.updatedOn = Firebase.firestore.Timestamp.now();

  // don't save the id as part of the document
  delete doc.id;

  // don't save values that start with an underscore (these are calculated by the backend)
  Object.keys(doc).forEach(key => {
    if (key.indexOf("_") === 0) {
      delete doc[key];
    }
  });

  return doc;
};

const FirebaseContext = React.createContext(null);

const withFirebase = Component => props => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

export default FirebaseContext;

export { prepareDocForCreate, prepareDocForUpdate, withFirebase };

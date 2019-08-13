import React from "react";
import ReactGA from "react-ga";
import FirebaseAuth from "../misc/FirebaseAuth";
import Firebase from "firebase/app";

const uploadPhotos = files => {
  //files should be an array

  ReactGA.event({
    category: "Location",
    action: "Save Photos"
  });

  const storage = firebase.storage();
  const storageRef = storage.ref();
  // var imagesRef = storageRef.child("images");
  let metadata = files
    .getMetadata()
    .then(function(metadata) {
      console.log("metadata", metadata);
      // Metadata now contains the metadata for 'images/forest.jpg'
    })
    .catch(function(error) {
      // Uh-oh, an error occurred!
    });
  let uploadTask = storageRef.child("images/" + file.name).put(file, metadata);

  let upload = files.map(file => {
    let metadata = file
      .getMetadata()
      .then(function(metadata) {
        console.log("metadata", metadata);
        // Metadata now contains the metadata for 'images/forest.jpg'
      })
      .catch(function(error) {
        // Uh-oh, an error occurred!
      });
    uploadTask.then(function(snapshot) {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      console.log("snapshot", snapshot);
      console.log("Uploaded a blob or file!");
    });
  });
};
export default uploadPhotos;

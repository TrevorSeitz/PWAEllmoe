import React from "react";
import { FirestoreCollection } from "react-firestore";
import { Link } from "react-router-dom";
// import FirebaseAuth from "../misc/FirebaseAuth";
import firebase from "firebase/app";
import Error from "../misc/Error";
// import EllmoeSubscription from "../misc/EllmoeSubscription";
import { InternalLink } from "../../styles/links";
import { Place } from "../../styles/layout";

const authUser = localStorage.getItem("authUser");

const LocationList = () => (
  <Place>
    {console.log("authUser - top of page: ", authUser)}
    {({ isLoading, error, auth }) => {
      if (isLoading) {
        return <p>loading...</p>;
      }

      if (error) {
        return <Error error={error} />;
      }

      if (!authUser) {
        return (
          <div>
            <Link to="/logIn">
              <p>Log in to see your account</p>
            </Link>
          </div>
        );
      }
    }}
    <FirestoreCollection
      path={"locations"}
      filter={["createdBy", "==", authUser]}
    >
      {({ error, isLoading, data }) => {
        // console.log(data);
        if (error) {
          return <Error error={error} />;
        }

        if (isLoading) {
          return <p>loading...</p>;
        }

        if (data.length === 0) {
          return <p>No locations yet!</p>;
        }

        return (
          <div>
            {data.map(location => (
              <div key={location.id}>
                <InternalLink to={`/${location.name}`}>
                  {location.name}
                </InternalLink>
                <hr />
              </div>
            ))}
          </div>
        );
      }}
    </FirestoreCollection>
    <hr />
    <InternalLink to="/new">Add A New Location</InternalLink>
  </Place>
);

export default LocationList;

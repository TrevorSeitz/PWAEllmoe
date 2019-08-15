import React from "react";
import { FirestoreCollection } from "react-firestore";

import firebase from "firebase/app";
import Error from "../misc/Error";
// import EllmoeSubscription from "../misc/EllmoeSubscription";
import { InternalLink } from "../../styles/links";
import { Place } from "../../styles/layout";

const LocationList = () => (
  <Place>
    <FirestoreCollection
      path={"locations"}
      filter={["createdBy", "==", firebase.auth().currentUser.uid]}
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

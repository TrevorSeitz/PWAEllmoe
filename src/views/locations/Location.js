import React from "react";
import { FirestoreCollection } from "react-firestore";

import FirebaseAuth from "../misc/FirebaseAuth";
import Error from "../misc/Error";
import { InternalLink } from "../../styles/links";
import { Place } from "../../styles/layout";

const Location = ({ match }) => (
  //Not sure why match is used here
  <Place>
    <FirestoreCollection
      path={"locations"}
      filter={["slug", "==", match.params.slug]}
    >
      {({ error, isLoading, data }) => {
        if (error) {
          return <Error error={error} />;
        }

        if (isLoading) {
          return <p>loading...</p>;
        }

        if (data.length === 0) {
          return <Error />;
        }

        const location = data[0];

        console.log("location: ", location);
        console.log("location: ", data);

        return (
          <div>
            <img src={location.imageURL} width="100" height="100" />
            <h1>{location.name}</h1>
            <h5>Venue Type: {location.venue}</h5>
            <h5>Project: {location.project}</h5>
            <h5>Contact Name: {location.contactName}</h5>
            <h5>Contact Phone Number: {location.contactPhone}</h5>
            <h5>Contact Email: {location.email}</h5>
            <h5>Description:</h5>
            <p>{location.description}</p>
            <FirebaseAuth>
              {({ auth }) =>
                auth ? (
                  <InternalLink to={`/${location.slug}/edit`}>
                    Edit
                  </InternalLink>
                ) : null
              }
            </FirebaseAuth>
          </div>
        );
      }}
    </FirestoreCollection>
  </Place>
);

export default Location;

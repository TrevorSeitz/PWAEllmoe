import React from "react";

import FirebaseAuth from "../misc/FirebaseAuth";
import Error from "../misc/Error";
import logIn from "../../actions/logIn";
import createLocation from "../../actions/createLocation";
import LocationForm from "./LocationForm";
import { Place } from "../../styles/layout";

const LocationNew = ({ history }) => (
  <Place>
    <FirebaseAuth>
      {({ isLoading, error, auth }) => {
        if (error) {
          return <Error error={error} />;
        }

        if (isLoading) {
          return <div>loading...</div>;
        }

        if (!auth) {
          return (
            <div>
              <p>You must be logged in to add locationss</p>
              <button onClick={logIn}>log in</button>
            </div>
          );
        }
        return (
          <LocationForm
            onSubmit={values =>
              createLocation(values)
                .then(
                  // console.log("get history push from here: ", values)
                  history.push(`/${values.name}`)
                )
                .then(values => console.log(values))
            }
          />
        );
      }}
    </FirebaseAuth>
  </Place>
);

export default LocationNew;

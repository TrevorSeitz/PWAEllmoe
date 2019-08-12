import React from "react";

import FirebaseAuth from "../misc/FirebaseAuth";
import Error from "../misc/Error";
import logIn from "../../actions/logIn";
import createLocation from "../../actions/createLocation";
import LocationForm from "./LocationForm";
import { Location } from "../../styles/layout";

const LocationNew = ({ history }) => (
  <Location>
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
              createLocation(values).then(location =>
                history.push(`/${location.slug}`)
              )
            }
          />
        );
      }}
    </FirebaseAuth>
  </Location>
);

export default LocationNew;

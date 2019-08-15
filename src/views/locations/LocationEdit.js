import React from "react";
import { FirestoreCollection } from "react-firestore";

import Error from "../misc/Error";
import deleteLocation from "../../actions/deleteLocation";
import updateLocation from "../../actions/updateLocation";
import LocationForm from "./LocationForm";
import { Page } from "../../styles/layout";

const LocationEdit = ({ match, history }) => (
  <Page>
    <FirestoreCollection
      path={"locations"}
      filter={["name", "==", match.params.slug]}
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

        return (
          <div>
            <LocationForm
              location={location}
              onSubmit={values =>
                updateLocation(location.id, values).then(() =>
                  history.push(`/${location.slug}`)
                )
              }
            />
            <br />
            <button
              onClick={() =>
                deleteLocation(location).then(() => history.push(`/`))
              }
            >
              Delete location
            </button>
          </div>
        );
      }}
    </FirestoreCollection>
  </Page>
);

export default LocationEdit;

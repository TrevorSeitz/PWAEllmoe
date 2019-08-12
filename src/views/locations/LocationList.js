import React from "react";
import { FirestoreCollection } from "react-firestore";

import Error from "../misc/Error";
import EllmoeSubscription from "../misc/EllmoeSubscription";
import { InternalLink } from "../../styles/links";
import { Place } from "../../styles/layout";

const PostList = () => (
  <Place>
    <FirestoreCollection path={"locations"}>
      {({ error, isLoading, data }) => {
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
                <InternalLink to={`/${location.slug}`}>
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

    {/* For paid subscribers only */}
    <EllmoeSubscription>
      {({ isLoading, error, subscription }) => {
        if (error) {
          return <Error error={error} />;
        }

        if (isLoading) {
          return <p>loading...</p>;
        }

        if (!subscription) {
          return (
            <div>
              <p>Only paid subscribers can see what goes here</p>
              <InternalLink to={`/account`}>Subscribe now</InternalLink>
            </div>
          );
        }

        return (
          <div>
            <p>Super-fancy subscription-only features go here!</p>
          </div>
        );
      }}
    </EllmoeSubscription>
    <hr />
    <hr />
    <InternalLink to="/new">Add A New Location</InternalLink>
  </Place>
);

export default PostList;

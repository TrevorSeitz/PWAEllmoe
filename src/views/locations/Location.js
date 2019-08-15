import React from "react";
import { FirestoreCollection } from "react-firestore";

// import Firebase from "firebase/app";
import FirebaseAuth from "../misc/FirebaseAuth";
import Error from "../misc/Error";
import { InternalLink } from "../../styles/links";
import { Place } from "../../styles/layout";
// import ImageGallery from "react-image-gallery";

// import MediaCard from "../../styles/card";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from "react-responsive-carousel";

const Location = ({ match }) => (
  // match is the information sent in from the click event on the list
  // still have to search via uid
  <Place>
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
        // let images = [];
        // console.log("auth: ", auth);
        console.log("location: ", location);
        console.log("location data: ", data);
        console.log("location images: ", location.images);
        // const buildImagesArray = location.images.map(image => {
        //   images.push({
        //     src: image
        //   });
        // });

        return (
          <div>
            {location.images.map((image, i) => {
              return (
                <img
                  src={image}
                  alt="this should not be here"
                  width="140"
                  height="140"
                  padding="20px"
                />
              );
            })}
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
                  <InternalLink to={`/${location.name}/edit`}>
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

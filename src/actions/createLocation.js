import Firebase from "firebase/app";
import ReactGA from "react-ga";
import slugify from "slugify";

import { prepareDocForCreate } from "./helpers/firestoreHelpers";

const createLocation = values => {
  ReactGA.event({
    category: "Location",
    action: "Create location"
  });

  values.slug = slugify(values.name, { lower: true });
  values._likeCount = 0;

  return Firebase.firestore()
    .collection("locations")
    .add(prepareDocForCreate(values))
    .then(() => values)
    .catch(error => {
      alert(`Whoops, couldn't create the location: ${error.message}`);
    });
};

export default createLocation;

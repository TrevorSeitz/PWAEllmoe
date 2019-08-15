import Firebase from "firebase/app";
import ReactGA from "react-ga";
import { prepareDocForUpdate } from "./helpers/firestoreHelpers";

const updateLocation = (locationId, values) => {
  ReactGA.event({
    category: "Location",
    action: "Update location"
  });

  return Firebase.firestore()
    .collection("locations")
    .doc(locationId)
    .update(prepareDocForUpdate(values))
    .catch(error => {
      alert(`Whoops, couldn't edit the location: ${error.message}`);
    });
};

export default updateLocation;

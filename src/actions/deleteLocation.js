import Firebase from "firebase/app";
import ReactGA from "react-ga";

const deleteLocation = location => {
  ReactGA.event({
    category: "Location",
    action: "Delete location"
  });

  return Firebase.firestore()
    .collection("locations")
    .doc(location.id)
    .delete()
    .catch(error => {
      alert(`Whoops, couldn't delete the location: ${error.message}`);
    });
};

export default deleteLocation;

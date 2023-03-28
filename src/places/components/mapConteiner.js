import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
const API_KEY = "AIzaSyDzZouwEabkmkSZ1ORWZkE_EE_WRIlVYR4";

class LoadScriptOnlyIfNeeded extends LoadScript {
  componentDidMount() {
    const cleaningUp = true
    const isBrowser = typeof document !== "undefined" 
    const isAlreadyLoaded = window.google && window.google.maps && document.querySelector('body.first-hit-completed') 
    if (!isAlreadyLoaded && isBrowser) {
      if (window.google && !cleaningUp) {
        console.error("google api is already presented")
        return
      }

      this.isCleaningUp().then(this.injectScript)
    }

    if (isAlreadyLoaded) {
      this.setState({ loaded: true })
    }
  }
}

const MapContainer = React.memo(( props ) => {

  const mapStyles = {
    height: "100%",
    width: "100%",
  };

  const defaultCenter = {
    lat: props.lat,
    lng: props.lng,
  };

  return (
    <LoadScriptOnlyIfNeeded googleMapsApiKey={API_KEY}>
      <GoogleMap mapContainerStyle={mapStyles} zoom={11} center={defaultCenter}>
        <Marker position={defaultCenter} />
      </GoogleMap>
    </LoadScriptOnlyIfNeeded>
  );
}) 

export default MapContainer;

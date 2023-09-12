import React, { useRef, useEffect, useState, useContext } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import Modal from "./Modal";
import classes from "./ClickableMap.module.css";
import { NewPlaceContext } from "../NewPlaceContextProvider";

function ClickableMap(props) {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiYW1lbDIwMjMiLCJhIjoiY2xrdmM1NTQwMGoxejNkbGE3dmlremVsdyJ9.noG4p-epeQSusf0gvNcyyA";

  const placeCntxt = useContext(NewPlaceContext);
  const mapContainer = useRef(null);
  const map = useRef(null);

/*   const [lng, setLng] = useState(17.8101862);
  const [lat, setLat] = useState(43.3416893);
  const [zoom, setZoom] = useState(11); */

  const initLng = 17.8101862;
  const initLtd = 43.34168932;
  const initZoom = 11;
  const [markerLngLat, setMarkerLngLat] = useState(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [initLng, initLtd],
      zoom: initZoom,
    });

    if (props.markerPosition) {
      setMarkerLngLat([props.markerPosition.lng, props.markerPosition.ltd]);
      map.current.setCenter([props.markerPosition.lng, props.markerPosition.ltd]);
      map.current.setZoom(8);
    }
    //ubaceno
    if (!props.markerPosition) {
      map.current.on("click", (e) => {
        setMarkerLngLat([e.lngLat.lng, e.lngLat.lat]);
      });
    }
  }, [setMarkerLngLat, props.markerPosition]);

  useEffect(() => {
    if (!map.current || !markerLngLat) return;
    const marker = new mapboxgl.Marker()
      .setLngLat(markerLngLat)
      .addTo(map.current);

    // Clean up the marker when the component is unmounted or the marker position changes
    return () => marker.remove();
  }, [markerLngLat]);


  const clickHandler = () => {
    if(!props.markerPosition && markerLngLat) placeCntxt.setPlace(markerLngLat);
    props.onClose();
  };
  return (
    <Modal onClose={props.onClose}>
      <div className={classes.mapcontainer}>
        <div ref={mapContainer} className={classes.map} />
      </div>
      <button disabled={!markerLngLat} className={classes.confirmlocationbtn} onClick={clickHandler}>
        {props.markerPosition ? "Close map":"Confirm location"} 
      </button>
    </Modal>
  );
}

export default ClickableMap;

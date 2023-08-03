import React from "react";
/* import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; */
import "./Map.css";

function Map() {
  const position = [51.505, -0.09]; // Set your initial map center (latitude and longitude)

  return (
    <div className="map-container">

        <label>Availible soon!</label>
{/*       <MapContainer center={position} zoom={13} style={{ height: "400px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            A sample marker at latitude {position[0]} and longitude {position[1]}.
          </Popup>
        </Marker>
      </MapContainer> */}
    </div>
  );
}

export default Map;

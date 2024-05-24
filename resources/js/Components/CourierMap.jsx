import { useRef } from "react";
import { MapContainer } from "react-leaflet";

import { MapDisplay } from "./MapDisplay";
import { Route } from "./Route";

import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

export function CourierMap() {
  const mapRef = useRef(null);
  const CENTER = [34.00501829905671, -4.957129955291749];

  console.log(mapRef.current);
  return (
    <MapContainer
      center={CENTER}
      zoom={16}
      ref={mapRef}
      style={{ height: "600px", width: "100%" }}
    >
      <MapDisplay />
      <MapEvent />
      <Route />
    </MapContainer>
  );
}

function MapEvent() {
  // useMapEvent("click", (e) => {
  // console.log(e);
  // map.setView([50.5, 30.5], map.getZoom());
  // });
  return null;
}

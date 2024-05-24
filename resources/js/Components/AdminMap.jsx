import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import { MapDisplay } from "./MapDisplay";
import courierIcon from "../../../public/courier.png";

import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { echo } from "@/echo";

export function AdminMap() {
  const mapRef = useRef(null);
  const CENTER = [34.00501829905671, -4.957129955291749];
  const [courierCoords, setCourierCoords] = useState({
    lat: 34.00501829905671,
    lng: -4.957129955291749,
  });

  console.log(courierCoords);

  useEffect(() => {
    echo.private("geolocation").listen("CoordinateSent", (payload) => {
      setCourierCoords(payload);
    });
  }, []);

  return (
    <MapContainer
      center={courierCoords ? [courierCoords?.lat, courierCoords?.lng] : CENTER}
      zoom={16}
      ref={mapRef}
      style={{ height: "600px", width: "100%" }}
    >
      <MapDisplay />
      {courierCoords && (
        <Marker
          position={[courierCoords.lat, courierCoords.lng]}
          icon={L.icon({ iconUrl: courierIcon, iconSize: [70, 70] })}
        >
          <Popup>
            Courier Location: {courierCoords.lat}, {courierCoords.lng}
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}

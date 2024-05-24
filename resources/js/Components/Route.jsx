import { useEffect, useState } from "react";
import { Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import courierIcon from "../../../public/courier.png";
import axios from "axios";

L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.9.4/dist/images/";

export const Route = () => {
  const map = useMap();
  const [routeMarker, setRouteMarker] = useState(null);

  const A = [34.00501829905671, -4.957129955291749];
  const B = [34.065156561217115, -5.045428276062013];
  useEffect(() => {
    const routingControl = L.Routing.control({
      waypoints: [L.latLng(A), L.latLng(B)],
      lineOptions: {
        styles: [{ color: "blue", opacity: 0.6, weight: 3 }],
      },
      addWaypoints: false,
      draggableWaypoints: false,
    }).addTo(map);

    routingControl.on("routesfound", async (e) => {
      const routes = e.routes;
      console.log(routes);

      if (routes && routes.length > 0 && routes[0].coordinates) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        routes[0].coordinates.forEach((coord, index) => {
          setTimeout(function () {
            console.log(coord);
            setRouteMarker(coord);
          }, 5000 * index);
        });
      }
    });

    return () => {
      map.removeControl(routingControl);
    };
  }, [map]);

  useEffect(() => {
    const sendCoords = async () => {
      try {
        await axios.post(route("courier.coords"), routeMarker);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    sendCoords();
  }, [routeMarker]);

  return (
    routeMarker && (
      <Marker
        position={routeMarker}
        icon={L.icon({ iconUrl: courierIcon, iconSize: [70, 70] })}
      />
    )
  );
};

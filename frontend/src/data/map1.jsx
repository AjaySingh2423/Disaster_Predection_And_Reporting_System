import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";


import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function MapPage() {
  const [earthquakes, setEarthquakes] = useState([]);

  const position = [30.3165, 78.0322]; // Uttarakhand center

  useEffect(() => {
    fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson")
      .then((res) => res.json())
      .then((data) => {
        const eqData = data.features.map((eq) => ({
          mag: eq.properties.mag,
          place: eq.properties.place,
          time: eq.properties.time,
          lat: eq.geometry.coordinates[1],
          lon: eq.geometry.coordinates[0],
        }));

        setEarthquakes(eqData);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <MapContainer center={position} zoom={5} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
        
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Earthquake Markers */}
        {earthquakes.map((eq, i) => (
          <Marker key={i} position={[eq.lat, eq.lon]}>
            <Popup>
              <strong>{eq.place}</strong> <br />
              Magnitude: {eq.mag} <br />
              Time: {new Date(eq.time).toLocaleString()}
            </Popup>
          </Marker>
        ))}

      </MapContainer>
    </div>
  );
}

export default MapPage;
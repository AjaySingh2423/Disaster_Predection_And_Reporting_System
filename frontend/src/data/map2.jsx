import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";

function MapPage() {
  const [position, setPosition] = useState(null);
  const [type, setType] = useState("");
  const [severity, setSeverity] = useState("");
  const [disasters, setDisasters] = useState([]);

  // 📍 Handle map click
  function LocationMarker() {
    useMapEvents({
      click(e) {
        console.log("Clicked position:", e.latlng); // DEBUG
        setPosition(e.latlng);
      },
    });

    return position ? <Marker position={position} /> : null;
  }

  // ✅ Fetch disasters (verified + active)
  const fetchDisasters = async () => {
    try {
      const res = await fetch("http://localhost:5000/disaster");
      const data = await res.json();
      console.log("Fetched disasters:", data); // DEBUG
      setDisasters(data);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchDisasters();
  }, []);

  // 📤 Submit disaster
  const handleSubmit = async () => {
    if (!position) {
      alert("Please select location on map");
      return;
    }

    if (!type || !severity) {
      alert("Please fill all fields");
      return;
    }

    const token = localStorage.getItem("token");
    console.log("TOKEN:", token); // DEBUG

    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/disaster", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type,
          severity,
          location: {
            lat: position.lat,
            lng: position.lng,
          },
        }),
      });

      const data = await res.json();
      console.log("SERVER RESPONSE:", data); // 🔥 IMPORTANT DEBUG

      if (!res.ok) {
        alert(data.message || "Error submitting");
        return;
      }

      alert("Disaster reported! Waiting for admin approval.");

      // refresh data
      fetchDisasters();

      // reset
      setType("");
      setSeverity("");
      setPosition(null);

    } catch (err) {
      console.log("Submit error:", err);
      alert("Server error");
    }
  };

  return (
    <div>
      {/* 🗺️ MAP */}
      <MapContainer
        center={[30.3165, 78.0322]}
        zoom={10}
        style={{ height: "400px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* 📍 Click marker */}
        <LocationMarker />

        {/* 📍 Existing disasters */}
        {disasters.map((d, i) =>
          d.location?.lat && d.location?.lng ? (
            <Marker key={i} position={[d.location.lat, d.location.lng]}>
              <Popup>
                <b>{d.type}</b> <br />
                Severity: {d.severity} <br />
                Time: {new Date(d.createdAt).toLocaleString()}
              </Popup>
            </Marker>
          ) : null
        )}
      </MapContainer>

      {/* 📝 FORM */}
      {position && (
        <div style={{ marginTop: "10px" }}>
          <h3>Report Disaster</h3>

          <input
            type="text"
            placeholder="Type (flood, earthquake...)"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />

          <br /><br />

          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
          >
            <option value="">Select Severity</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <br /><br />

          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
}

export default MapPage;
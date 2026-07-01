import TopBar from '../components/TopBar';
import BottomBar from '../components/BottomBar';
import { MapContainer, TileLayer, useMapEvents, Marker } from "react-leaflet";
import { useState } from "react";
import axios from "axios";

function ClickHandler({ setPrediction, setPosition }) {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;

      setPosition([lat, lng]);

      try {
        const res = await axios.post("http://localhost:5000/predict", {
          lat,
          lng
        });

        setPrediction(res.data);
      } catch (err) {
        console.log(err);
        alert("Prediction error");
      }
    }
  });

  return null;
}

function Prediction() {

  const [prediction, setPrediction] = useState(null);
  const [position, setPosition] = useState(null);

  return (
    <div className="app-container">
      <TopBar />

      <div className="content" style={{ padding: "20px" }}>
        <h2>Disaster Prediction Map</h2>

        {/* MAP */}
        <MapContainer
          center={[30.3, 78.0]}
          zoom={7}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <ClickHandler
            setPrediction={setPrediction}
            setPosition={setPosition}
          />

          {/* Marker on clicked location */}
          {position && <Marker position={position} />}
        </MapContainer>

        {/* RESULT */}
        {prediction && (
          <div style={{ marginTop: "20px" }}>
            <h3>Prediction Result</h3>

            <p>🌊 Flood: {prediction.flood}%</p>
            <p>🌧 Cloudburst: {prediction.cloudburst}%</p>
            <p>☔ Heavy Rain: {prediction.heavy_rain}%</p>

            <button
              onClick={() => {
                setPrediction(null);
                setPosition(null);
              }}
              style={{
                marginTop: "10px",
                padding: "8px 15px",
                background: "red",
                color: "white",
                border: "none",
                borderRadius: "5px"
              }}
            >
              Clear
            </button>
          </div>
        )}
      </div>

      <BottomBar />
    </div>
  );
}

export default Prediction;
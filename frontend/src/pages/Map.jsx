import TopBar from "../components/TopBar";
import BottomBar from "../components/BottomBar";
import { useEffect } from "react";
import "../css/map.css";
import MapPage from "../data/map2";

function Map() {
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        window.location.href = "/login";
        return;
      }

      const res = await fetch("http://localhost:5000/home", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status !== 200) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    };

    checkAuth();
  }, []);

  return (
    <div className="app-container">
      <TopBar />

      <div className="content">
        <div className="map-page">
          <MapPage />
        </div>
      </div>

      <BottomBar />
    </div>
  );
}

export default Map;
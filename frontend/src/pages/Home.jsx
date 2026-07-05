import TopBar from "../components/TopBar";
import BottomBar from "../components/BottomBar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MapPage from "../data/map1";
import "../css/home.css";

function Home() {
  const [show, setShow] = useState(false);
  const [checking, setChecking] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/home`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status !== 200) {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          navigate("/login", { replace: true });
          return;
        }

        setChecking(false);
      } catch (err) {
        console.log(err);
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login", { replace: true });
      }
    };

    checkAuth();
  }, [navigate]);

  if (checking) {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h2>;
  }

  return (
    <div className="app-container">
      <TopBar />

      <div className="content">
        <div className="hero">
          <h1>Real-Time Disaster Monitoring</h1>
          <p>Track floods, earthquakes and weather risks in Uttarakhand</p>

          <div className="hero-btns">
            <button onClick={() => setShow(!show)}>
              View Real time earthquakes
            </button>
          </div>
        </div>

        {show && <MapPage />}
      </div>

      <BottomBar />
    </div>
  );
}

export default Home;
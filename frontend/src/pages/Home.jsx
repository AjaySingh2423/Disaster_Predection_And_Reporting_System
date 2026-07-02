import TopBar from '../components/TopBar'
import BottomBar from '../components/BottomBar'
import { useState } from "react";
import { useEffect } from "react";
import MapPage from '../data/map1';
import '../css/home.css';
function Home() {
   const [show, setShow] = useState(false);

   useEffect(() => {
  const checkAuth = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    const res = await fetch(`${import.meta.env.VITE_API_URL}/home`, {
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
       
       <div className="hero">
  <h1>Real-Time Disaster Monitoring</h1>
  <p>Track floods, earthquakes and weather risks in Uttarakhand</p>

  <div className="hero-btns">
    <button onClick={() =>{show==true ? setShow(false) : setShow(true)} }>View Real time earthquakes</button>
  </div>
</div>
      {show && <MapPage />}
      </div>
      
      <BottomBar />
    </div>
  )
}

export default Home

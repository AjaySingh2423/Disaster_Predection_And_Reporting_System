import { useState } from "react";
import { Link } from "react-router-dom";
import "./TopBar.css";

function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  //get role from localStorage
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role"); // also remove role
    window.location.href = "/login";
  };

  return (
    <div id="top-bar">
      <p id="p1">Disaster Prediction</p>

      <nav className={menuOpen ? "show" : ""}>
        <Link to="/" onClick={() => setMenuOpen(false)} className="a1">Home</Link>
        <Link to="/map" onClick={() => setMenuOpen(false)} className="a1">Map</Link>
        <Link to="/prediction" onClick={() => setMenuOpen(false)} className="a1">Prediction</Link>
        <Link to="/analytics" onClick={() => setMenuOpen(false)} className="a1">Analytics</Link>
        <Link to="/history" onClick={() => setMenuOpen(false)} className="a1">History</Link>

        {/*show only if admin */}
        {role === "admin" && (
          <Link to="/admin" onClick={() => setMenuOpen(false)}>Admin</Link>
        )}

       
        <a  href="#" className="logout-btn" onClick={handleLogout}>
           Logout
        </a>
      </nav>

      <div id="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
        <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`}></i>
      </div>
    </div>
  );
}

export default TopBar;
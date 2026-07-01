import TopBar from '../components/TopBar';
import BottomBar from '../components/BottomBar';
import { useEffect, useState } from "react";
import axios from "axios";
import '../css/admin.css';

function Admin() {

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  // 🔥 Fetch all reports
  const fetchReports = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:5000/admin",   // ✅ FIXED
        config
      );

      setReports(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // ✅ Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/${id}`,   // ✅ FIXED
        config
      );
      fetchReports();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // ✅ Verify / Unverify
  const handleVerify = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/verify/${id}`,   // ✅ FIXED
        {},
        config
      );
      fetchReports();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // ✅ Active / Inactive
  const handleStatus = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/status/${id}`,   // ✅ FIXED
        {},
        config
      );
      fetchReports();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div className="app-container">
      <TopBar />

      <div className="content">
        <h2>Admin Panel - Disaster Reports</h2>

        {loading && <p>Loading...</p>}

        <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Severity</th>
              <th>Verified</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {reports.length === 0 ? (
              <tr>
                <td colSpan="5">No data available</td>
              </tr>
            ) : (
              reports.map((r) => (
                <tr key={r._id}>
                  <td>{r.type}</td>
                  <td>{r.severity}</td>

                  <td>{r.isVerified ? "✅ Yes" : "❌ No"}</td>
                  <td>{r.isActive ? "🟢 Active" : "🔴 Inactive"}</td>

                 <td>
  <div className="action-buttons">
    <button className="btn verify" onClick={() => handleVerify(r._id)}>
      {r.isVerified ? "Unverify" : "Verify"}
    </button>

    <button className="btn status" onClick={() => handleStatus(r._id)}>
      {r.isActive ? "Deactivate" : "Activate"}
    </button>

    <button className="btn delete" onClick={() => handleDelete(r._id)}>
      Delete
    </button>
  </div>
</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        </div>
      </div>

      <BottomBar />
    </div>
  );
}

export default Admin;
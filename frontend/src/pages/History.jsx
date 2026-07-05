import TopBar from "../components/TopBar";
import BottomBar from "../components/BottomBar";
import { useEffect, useState } from "react";
import axios from "axios";
import "../css/History.css";

function History() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/history`
      );

      setReports(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="app-container">
      <TopBar />

      <div className="content history-container">
        <h1 className="history-title">Disaster History</h1>

        {loading && <p className="loading">Loading...</p>}

        <div className="table-wrapper">
          <table className="history-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Severity</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {reports.length === 0 ? (
                <tr>
                  <td colSpan="4">No history available</td>
                </tr>
              ) : (
                reports.map((r) => (
                  <tr key={r._id}>
                    <td>{r.type}</td>

                    <td>{r.severity}</td>

                    <td>
                      {r.isActive ? "🟢 Active" : "🔴 Inactive"}
                    </td>

                    <td>
                      {new Date(r.createdAt).toLocaleString()}
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

export default History;
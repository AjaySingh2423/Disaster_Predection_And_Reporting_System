import TopBar from '../components/TopBar';
import BottomBar from '../components/BottomBar';
import { useEffect, useState } from "react";
import axios from "axios";


function History() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 Fetch verified reports (both active + inactive)
  const fetchHistory = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:5000/history" // backend route
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
        <h2>Disaster History</h2>

        {loading && <p>Loading...</p>}

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

      <BottomBar />
    </div>
  );
}

export default History;
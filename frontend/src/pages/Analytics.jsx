import TopBar from '../components/TopBar';
import BottomBar from '../components/BottomBar';
import { useState, useEffect } from "react";
import Papa from "papaparse";
import { Line } from "react-chartjs-2";
import '../css/analytics.css';

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function Analytics() {

  const [data, setData] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  useEffect(() => {
    Papa.parse("/data/rainfall.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,

      complete: (result) => {

        // ✅ Filter Uttarakhand
        const uttarakhand = result.data.filter((row) => {
          const state = row.STATE_UT_NAME;
          return (
            state &&
            (
              state.toUpperCase().includes("UTTARAKHAND") ||
              state.toUpperCase().includes("UTTARANCHAL")
            )
          );
        });

        setData(uttarakhand);

        // ✅ Get districts
        const uniqueDistricts = [
          ...new Set(uttarakhand.map((d) => d.DISTRICT?.trim()))
        ];

        setDistricts(uniqueDistricts);

        if (uniqueDistricts.length > 0) {
          setSelectedDistrict(uniqueDistricts[0]);
        }
      },
    });
  }, []);

  // ✅ Selected district data (only 1 row)
  const selectedData = data.find(
    (d) => d.DISTRICT?.trim() === selectedDistrict
  );

  // ✅ Monthly chart data
  const chartData = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ],
    datasets: [
      {
        label: "Monthly Rainfall",
        data: selectedData ? [
          selectedData.JAN,
          selectedData.FEB,
          selectedData.MAR,
          selectedData.APR,
          selectedData.MAY,
          selectedData.JUN,
          selectedData.JUL,
          selectedData.AUG,
          selectedData.SEP,
          selectedData.OCT,
          selectedData.NOV,
          selectedData.DEC,
        ] : [],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="app-container">
     <TopBar />

    <div className="analytics-container">

      <div className="analytics-content">

        <h1>Uttarakhand Rainfall Analysis</h1>

        <div className="select-box">
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
          >
            {districts.map((d, i) => (
              <option key={i} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div className="chart-container">
          {selectedData ? (
            <Line data={chartData} />
          ) : (
            <p>No data available</p>
          )}
        </div>

      </div>

    </div>

    <BottomBar />
  </div>
  );
}

export default Analytics;
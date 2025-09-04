// src/components/StatsTable.jsx
import React from "react";
import "./Stats.css";

const Stats = ({ logs }) => {
  const safeLogs = Array.isArray(logs) ? logs : [];
  return (
    <div className="stats-container">
      <h2 className="stats-heading">Click Logs</h2>
      <div className="stats-table-wrapper">
        <table className="stats-table" aria-label="Click logs table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Source</th>
              <th>Geolocation</th>
            </tr>
          </thead>
          <tbody>
            {safeLogs.length === 0 && (
              <tr className="stats-table-empty">
                <td colSpan={3}>No clicks recorded yet.</td>
              </tr>
            )}
            {safeLogs.map((log, idx) => (
              <tr key={idx}>
                <td>
                  {log.timestamp ? new Date(log.timestamp).toLocaleString() : "N/A"}
                </td>
                <td>{log.source || "N/A"}</td>
                <td>{log.geolocation || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Stats;

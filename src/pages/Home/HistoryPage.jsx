// src/pages/HistoryPage/HistoryPage.jsx
import React from "react";
import UrlTable from "../../components/URLTable/URLTable";
import "./HistoryPage.css";

const HistoryPage = () => {
  return (
    <div className="history-page-container">
      <div className="history-page-header">
        <h1 className="history-page-title">URL History</h1>
        <p className="history-page-subtitle">View, manage, and track your shortened links.</p>
      </div>
      <UrlTable />
    </div>
  );
};

export default HistoryPage;

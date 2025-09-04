import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Stats from "../../components/Stats/Stats";
import { AppContext } from "../../context/Appcontext";
import "./StatsPage.css";

const StatsPage = () => {
  const { shortCode } = useParams();
  const navigate = useNavigate();
  const { state } = useContext(AppContext);

  // Get URL from context
  const urlObj = state.urls.find((u) => u.shortCode === shortCode);

  if (!urlObj) {
    return (
      <div className="stats-page-not-found">
        <h2 className="not-found-title">Stats Not Found</h2>
        <div className="not-found-text">
          No stats found for this shortcode.
        </div>
        <button onClick={() => navigate("/")} className="back-button">
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="stats-page-container">
      <div className="stats-page-header">
        <h2 className="stats-page-title">
          Stats for:{" "}
          <span className="stats-page-short-url">{shortCode}</span>
        </h2>
        <button onClick={() => navigate("/")} className="back-button">
          &larr; Back to Home
        </button>
      </div>
      <Stats logs={urlObj.clickHistory || []} />
    </div>
  );
};

export default StatsPage;

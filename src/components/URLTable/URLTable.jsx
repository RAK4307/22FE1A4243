// src/components/UrlTable.jsx
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./table.css";
import { AppContext } from "../../context/Appcontext";
import { useLogger } from "../../hooks/userLogger";

const UrlTable = () => {
  const { state, dispatch } = useContext(AppContext);
  const { logEvent } = useLogger();
  const navigate = useNavigate();
  const handleDelete = shortCode => {
    if (window.confirm(`Delete link for "${shortCode}"?`)) {
      dispatch({ type: "DELETE_URL", payload: shortCode });
      logEvent("URL Deleted", { shortCode });
      alert("URL Deleted");
    }
  };

  const handleCopy = async shortCode => {
    const url = `${window.location.origin}/${shortCode}`;
    try {
      await navigator.clipboard.writeText(url);
      logEvent("URL Copied", { shortCode });
      alert(`Copied! ${url}`);
    } catch {
      alert("Copy failed");
    }
  };

  return (
    <div className="url-table-container">
      <table className="url-table" aria-label="Shortened URLs table">
        <thead>
          <tr>
            <th>Short URL</th>
            <th>Original URL</th>
            <th>Clicks</th>
            <th>Expires At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {state.urls.length === 0 && (
            <tr>
              <td colSpan={5} className="url-table-empty">No URLs shortened yet.</td>
            </tr>
          )}
          {state.urls.map(url => (
            <tr key={url.shortCode}>
              <td className="url-cell">
                <a
                    href={`${window.location.origin}/${url.shortCode}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="url-short"
                  >
                    {`${window.location.host}/${url.shortCode}`}
                  </a>
              </td>
              <td className="url-cell">
                <span title={url.longUrl} className="url-long">
                  {url.longUrl}
                </span>
              </td>
              <td className="url-clicks">{url.clicks}</td>
              <td>{new Date(url.expiresAt).toLocaleString()}</td>
              <td>
                <div className="url-actions">
                  <button title="Copy Link" onClick={() => handleCopy(url.shortCode)} className="action-btn">
                    {/* Copy SVG */}
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><rect x="3" y="3" width="13" height="13" rx="2"/></svg>
                  </button>
                  <button title="View Stats" onClick={() => navigate(`/stats/${url.shortCode}`)} className="action-btn">
                    {/* Info SVG */}
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="8"/></svg>
                  </button>
                  <button title="Delete" onClick={() => handleDelete(url.shortCode)} className="action-btn delete">
                    {/* Delete SVG */}
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m5 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default UrlTable;

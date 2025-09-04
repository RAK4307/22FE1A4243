// src/pages/RedirectHandler.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/Appcontext";
import "./RedirectHandler.css";

function RedirectHandler() {
  const { shortCode } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [expired, setExpired] = useState(false);
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    // Custom logger (replace with your own if needed)
    const logError = (msg) => {
      try {
        const logs = JSON.parse(localStorage.getItem("clickLogs") || "[]");
        logs.push({ type: "error", message: msg, timestamp: new Date().toISOString() });
        localStorage.setItem("clickLogs", JSON.stringify(logs));
      } catch {}
      console.error(msg);
    };

    if (!shortCode) {
      logError("No shortcode provided in route params.");
      navigate("/", { state: { error: "No shortcode provided." } });
      return;
    }

    // Retrieve URL from context
    const urlObj = state.urls.find((u) => u.shortCode === shortCode);

    if (!urlObj) {
      logError(`Shortcode '${shortCode}' not found.`);
      setError("Short URL not found. You will be redirected shortly.");
      setTimeout(() => {
        navigate("/", { state: { error: "Short URL not found." } });
      }, 3000);
      return;
    }

    // Check expiration
    if (urlObj.expiresAt && new Date() > new Date(urlObj.expiresAt)) {
      setExpired(true);
      logError(`Shortcode '${shortCode}' has expired.`);
      return;
    }

    // Track click
    const clickRecord = {
      timestamp: new Date().toISOString(),
      source: document.referrer || "Direct",
    };

    dispatch({
      type: "LOG_CLICK",
      payload: { shortCode, clickRecord },
    });

    // Redirect
    window.location.href = urlObj.longUrl;
  }, [shortCode, navigate, state.urls, dispatch]);

  const shortUrlDisplay = (
    <div className="short-url-display">
      {window.location.host + window.location.pathname}
    </div>
  );

  if (error) {
    return (
      <div className="redirect-container">
        <div className="message-box error">
          {shortUrlDisplay}
          <h2 className="message-title error">Oops! Invalid Link</h2>
          <div className="message-text error">{error}</div>
        </div>
      </div>
    );
  }

  if (expired) {
    return (
      <div className="redirect-container">
        <div className="message-box expired">
          {shortUrlDisplay}
          <h2 className="message-title expired">This link has expired</h2>
          <div className="message-text expired">
            The link you are trying to access has expired.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="redirect-container">
      <div className="redirect-content">
        {shortUrlDisplay}
        <div className="spinner"></div>
        <div className="redirect-message">Redirecting...</div>
      </div>
    </div>
  );
}

export default RedirectHandler;
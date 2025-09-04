// src/pages/Home.jsx
import React from "react";
import UrlForm from "../../components/URLForm/URLform";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      {/* Decorative background shapes */}
      <div className="home-bg-shape shape1"></div>
      <div className="home-bg-shape shape2"></div>

      <div className="home-content">
        <div className="home-header">
          <h1 className="home-title">Simple & Powerful <span>URL Shortener</span></h1>
          <p className="home-subtitle">
            Enter a long URL to make it short and easy to share.
          </p>
        </div>
        <UrlForm />
      </div>
    </div>
  );
}
export default Home;

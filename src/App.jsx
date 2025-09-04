// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// ...existing code...
import Home from "./pages/Home/Home";
import Navbar from "./pages/Navbar/Navbar";
import RedirectHandler from "./pages/Redirect/RedirectHandler";
import HistoryPage from "./pages/Home/HistoryPage";
import StatsPage from "./pages/StatsPage/StatsPage"; // Updated import path
import { AppProvider } from "./context/Appcontext";
import "./App.css"; // Optional: global styles



function App() {
  return (
    <AppProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stats/:shortCode" element={<StatsPage />} />
          <Route path="/:shortCode" element={<RedirectHandler />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;

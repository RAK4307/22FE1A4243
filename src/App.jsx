// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./pages/Home/Home";
import Stats from "./pages/Stats/stats";
import RedirectHandler from "./pages/Redirect/RedirectHandler";
import { AppProvider } from "./context/Appcontext";

function App() {
  return (
    <ChakraProvider>
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stats/:shortCode" element={<Stats />} />
            <Route path="/:shortCode" element={<RedirectHandler />} />
            {/* Fallback for any unknown routes */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </AppProvider>
    </ChakraProvider>
  );
}
export default App;

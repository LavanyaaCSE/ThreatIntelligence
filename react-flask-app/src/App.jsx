import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ExtractedResults from "./components/ExtractedResults";
import SavedScanResults from "./components/SavedScanResults";
import RecentDownloads from "./components/RecentDownloads"; // Assuming you have a RecentDownloads component
import Home from "./components/Home"; // Assuming you have a Home component

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/extracted-results" element={<ExtractedResults />} />
            <Route path="/saved-scan-results" element={<SavedScanResults />} />
            <Route path="/recent-downloads" element={<RecentDownloads />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";
import "../App.css";

function ExtractedResults() {
  const location = useLocation();
  const data = location.state?.data;
  const [filter, setFilter] = useState("All");
  const [currentResult, setCurrentResult] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    const storedResult = localStorage.getItem("currentResult");
    if (storedResult) {
      setCurrentResult(JSON.parse(storedResult));
    }
  }, []);

  useEffect(() => {
    if (data) {
      setCurrentResult(data);
      localStorage.setItem("currentResult", JSON.stringify(data));
    }
  }, [data]);

  const handleFilterChange = (filterOption) => {
    setFilter(filterOption);
  };

  const saveCurrentResult = () => {
    if (!currentResult) return;

    const timestamp = new Date().toLocaleString().replace(/[/: ]/g, "_");
    const savedResultsCount = (parseInt(localStorage.getItem("savedResultsCount")) || 0) + 1;
    const fileName = `saved_scan_result_${savedResultsCount}_${timestamp}`;

    localStorage.setItem(fileName, JSON.stringify(currentResult));
    localStorage.setItem("savedResultsCount", savedResultsCount);

    const recentResults = JSON.parse(localStorage.getItem("recentResults")) || {};
    recentResults[fileName] = currentResult;
    localStorage.setItem("recentResults", JSON.stringify(recentResults));

    showSuccessPopup();
  };

  const showSuccessPopup = () => {
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const filteredData = () => {
    if (!currentResult) return null;

    switch (filter) {
      case "IoCs":
        return { IoCs: currentResult.IoCs || [] };
      case "TTPs":
        return { TTPs: currentResult.TTPs || [] };
      case "Threat Actors":
        return { "Threat Actors": currentResult["Threat Actors"] || [] };
      case "Malware":
        return { Malware: currentResult.Malware || [] };
      case "Targeted Entities":
        return { "Targeted Entities": currentResult["Targeted Entities"] || [] };
      default:
        return currentResult;
    }
  };

  const saveDownloadInfo = (fileName) => {
    const recentDownloads = JSON.parse(localStorage.getItem("recentDownloads")) || [];
    const timestamp = new Date().toLocaleString();
    recentDownloads.unshift({ fileName, time: timestamp });
    localStorage.setItem("recentDownloads", JSON.stringify(recentDownloads));
  };

  const downloadAsJSON = () => {
    const fileName = "extracted_results.json";
    const blob = new Blob([JSON.stringify(filteredData(), null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    saveDownloadInfo(fileName);
  };

  const downloadAsPDF = () => {
    const fileName = "extracted_results.pdf";
    const doc = new jsPDF();
    const dataString = JSON.stringify(filteredData(), null, 2);
    doc.text(dataString, 10, 10);
    doc.save(fileName);
    saveDownloadInfo(fileName);
  };

  return (
    <div className="extracted-results-page">
      <div className="results-header">
        <h1>Threat Analysis Results</h1>
      </div>

      <div className="results-filter-container">
        <div className="filter-navigation">
          {["All", "IoCs", "TTPs", "Threat Actors", "Malware", "Targeted Entities"].map((option) => (
            <button
              key={option}
              className={`filter-btn ${filter === option ? "active" : ""}`}
              onClick={() => handleFilterChange(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <button className="save-result-btn" onClick={saveCurrentResult}>
          Save Current Result
        </button>
      </div>

      <div className="results-display-container">
        {currentResult ? (
          <div className="results-content">
            <pre className="results-data-pre">
              {JSON.stringify(filteredData(), null, 2)}
            </pre>
          </div>
        ) : (
          <div className="no-results-container">
            <p>No results available. Upload a file to analyze.</p>
          </div>
        )}

        <div className="download-actions">
          <button onClick={downloadAsJSON} className="download-btn json-btn">
            Download JSON
          </button>
          <button onClick={downloadAsPDF} className="download-btn pdf-btn">
            Download PDF
          </button>
        </div>
      </div>

      {showSuccessMessage && (
        <div className="success-notification">
          Current result saved successfully!
        </div>
      )}
    </div>
  );
}

export default ExtractedResults;
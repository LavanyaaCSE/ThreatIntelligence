import React, { useState, useEffect } from "react";
import "../App.css"; // Import the CSS file

function SavedScanResults() {
  const [savedResults, setSavedResults] = useState({});
  const [selectedResult, setSelectedResult] = useState(null);
  const [selectedTimestamp, setSelectedTimestamp] = useState(null);

  // Load saved results from localStorage when the component mounts
  useEffect(() => {
    const storedResults = localStorage.getItem("recentResults");
    if (storedResults) {
      setSavedResults(JSON.parse(storedResults));
    }
  }, []);

  // Handle "View" button click
  const handleView = (timestamp, result) => {
    if (selectedTimestamp === timestamp) {
      // If the same result is clicked again, hide the details
      setSelectedResult(null);
      setSelectedTimestamp(null);
    } else {
      setSelectedResult(result);
      setSelectedTimestamp(timestamp);
    }
  };

  // Handle "Delete" button click
  const handleDelete = (timestamp) => {
    const updatedResults = { ...savedResults };
    delete updatedResults[timestamp];
    setSavedResults(updatedResults);
    localStorage.setItem("recentResults", JSON.stringify(updatedResults));
    if (selectedTimestamp === timestamp) {
      setSelectedResult(null);
      setSelectedTimestamp(null);
    }
  };

  return (
    <div className="saved-scan-results">
      <h1 className="header">Saved Scan Results</h1>

      {/* List of saved scan results with View and Delete buttons */}
      <ul className="results-list">
        {Object.keys(savedResults).length > 0 ? (
          Object.entries(savedResults).map(([timestamp, result]) => (
            <li key={timestamp} className="result-entry">
              <div className="result-info">
                <span className="timestamp">{timestamp}</span>
                <div className="buttons">
                  <button className="view-btn" onClick={() => handleView(timestamp, result)}>
                    {selectedTimestamp === timestamp ? "Hide" : "View"}
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(timestamp)}>
                    Delete
                  </button>
                </div>
              </div>

              {/* Display selected result details below the button */}
              {selectedTimestamp === timestamp && (
                <div className="result-details">
                  <h3 className="result-details-title">Result Details</h3>
                  <pre className="results-data">{JSON.stringify(result, null, 2)}</pre>
                </div>
              )}
            </li>
          ))
        ) : (
          <p className="no-results">No saved scan results available.</p>
        )}
      </ul>
    </div>
  );
}

export default SavedScanResults;

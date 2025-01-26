import React from "react";

function RecentDownloads() {
  // Fetch recent downloads from localStorage
  const recentDownloads = JSON.parse(localStorage.getItem("recentDownloads")) || [];

  return (
    <div className="recent-downloads-container">
      <h2 className="downloads-header">Recent Downloads</h2>
      {recentDownloads.length > 0 ? (
        <ul className="downloads-list">
          {recentDownloads.map((download, index) => (
            <li className="downloads-item" key={index}>
              <span className="file-name">{download.fileName}</span>
              <span className="download-time">{download.time}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-downloads-message">No recent downloads available.</p>
      )}
    </div>
  );
}

export default RecentDownloads;

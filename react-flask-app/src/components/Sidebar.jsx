import React from "react";
import { Link } from "react-router-dom";
import { FaFileAlt, FaClipboardList, FaChartPie, FaFileDownload, FaSave } from "react-icons/fa"; // Import icons

function Sidebar() {
  return (
    <div className="sidebar">
      <img
        src="/Logo.jpeg"
        alt="Company Logo"
        style={{
          width: '150px',
          height: 'auto',
          display: 'block',
          margin: '0 auto 20px'
        }}
      />
      <ul>
        <li>
          <Link to="/">
            <FaFileAlt className="icon" /> Home
          </Link>
        </li>
        <li>
          <Link to="/extracted-results">
            <FaClipboardList className="icon" /> Extracted Results
          </Link>
        </li>
       
        <li>
          <Link to="/recent-downloads">
            <FaFileDownload className="icon" /> Recent Downloads
          </Link>
        </li>
        <li>
          <Link to="/saved-scan-results">
            <FaSave className="icon" /> Saved Scan Results
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;

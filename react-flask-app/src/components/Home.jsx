import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [file, setFile] = useState(null);
  const [popup, setPopup] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setPopup(true);
      setTimeout(() => {
        setPopup(false);
        navigate("/extracted-results", { state: { data: response.data } });
      }, 2000);
    } catch (err) {
      alert("Error uploading file: " + err.response.data.error);
    }
  };

  return (
    <div className="app-container">
      <div className="home-container">
        <div className="file-upload-container">
          <input
            type="file"
            accept=".pdf, .txt, .docx, .png, .jpg, .jpeg"
            onChange={(e) => setFile(e.target.files[0])}
            className="file-input"
          />
          <button onClick={handleFileUpload} className="upload-button">
            Upload and Analyze
          </button>
        </div>

        {popup && (
          <div className="success-popup">
            <p>Scan completed! Redirecting to Extracted Results...</p>
          </div>
        )}

        <div className="feature-cards-container">
          <div className="feature-card">
            <h3>See how safe you are online</h3>
            <p>Check the strength of your protection with a quick assessment.</p>
          </div>
          <div className="feature-card">
            <h3>Fix security weak spots</h3>
            <p>Simple instructions make it easy to set up protection and fix gaps.</p>
          </div>
          <div className="feature-card">
            <h3>Improve your security</h3>
            <p>Personalized feedback helps you achieve and maintain healthy online protection.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
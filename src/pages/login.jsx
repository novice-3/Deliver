import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Set background color of the entire page when the component mounts
    document.body.style.backgroundColor = "#F8B195"; // Light orange color
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    if (password === "deliver") {
      navigate("/today");
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh", // Full screen height
        padding: "20px", // Extra padding for smaller screens
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px", // Restrict the width for larger screens
          padding: "30px",
          backgroundColor: "#F67280", // Light pink background for the form container
          borderRadius: "12px", // Rounded corners
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)", // Soft shadow
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
            fontSize: "24px",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Admin Login
        </h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "20px", position: "relative" }}>
            {/* Input field */}
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              style={{
                width: "100%", // Make it 100% of the parent container
                padding: "12px",
                fontSize: "16px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                outline: "none",
                textAlign: "center",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%", // Full width button for small screens
              padding: "12px",
              fontSize: "16px",
              backgroundColor: "#3490dc", // Blue button
              color: "#fff", // White text
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.3s ease, transform 0.2s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#1d72b8")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#3490dc")}
            onMouseDown={(e) => (e.target.style.transform = "scale(0.98)")}
            onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

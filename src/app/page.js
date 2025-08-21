"use client";
import React, { useState } from "react";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate login API call
    setTimeout(() => {
      if (email === "admin@example.com" && password === "password") {
        alert("Login successful!");
      } else {
        setError("Invalid email or password");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(#cfd2d6, #aeb1b5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: 32,
          borderRadius: 12,
          boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
          minWidth: 320,
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 24 }}>Login</h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: "block", marginBottom: 6 }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: 4,
                border: "1px solid #bbb",
                fontSize: 16,
                background: "#f5f6fa",
              }}
            />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: "block", marginBottom: 6 }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: 4,
                border: "1px solid #bbb",
                fontSize: 16,
                background: "#f5f6fa",
              }}
            />
          </div>
          {error && (
            <div style={{ color: "red", marginBottom: 16, textAlign: "center" }}>{error}</div>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              background: "#2323a9",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              fontSize: 16,
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
              marginTop: 8,
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
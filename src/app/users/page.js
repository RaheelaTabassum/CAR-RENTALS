"use client";
import React, { useEffect, useState } from "react";

const UsersScreen = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUsers([
        { id: 1, name: "Alice Johnson", email: "alice@example.com" },
        { id: 2, name: "Bob Smith", email: "bob@example.com" },
        { id: 3, name: "Charlie Lee", email: "charlie@example.com" },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 40 }}>
        Loading users...
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 24, background: "#fff", borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>Users</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f5f6fa" }}>
            <th style={{ border: "1px solid #ccc", padding: "10px" }}>ID</th>
            <th style={{ border: "1px solid #ccc", padding: "10px" }}>Name</th>
            <th style={{ border: "1px solid #ccc", padding: "10px" }}>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td style={{ border: "1px solid #ccc", padding: "10px" }}>{user.id}</td>
              <td style={{ border: "1px solid #ccc", padding: "10px" }}>{user.name}</td>
              <td style={{ border: "1px solid #ccc", padding: "10px" }}>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersScreen;
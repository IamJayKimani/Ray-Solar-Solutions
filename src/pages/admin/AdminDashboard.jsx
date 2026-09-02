import React, { useState } from "react";
import ManageUsers from "./ManageUsers";
import ManageProviders from "./ManageProviders";
import ManageProducts from "./ManageProducts";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "sans-serif" }}>
      {/* Sidebar Navigation */}
      <aside style={{ width: "240px", backgroundColor: "#1e293b", color: "#fff", padding: "1.5rem" }}>
        <h2 style={{ fontSize: "1.25rem", marginBottom: "2rem", fontWeight: "bold" }}>Admin Portal</h2>
        <nav style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <button
            onClick={() => setActiveTab("users")}
            style={{
              textAlign: "left",
              padding: "0.75rem 1rem",
              borderRadius: "0.375rem",
              border: "none",
              cursor: "pointer",
              backgroundColor: activeTab === "users" ? "#3b82f6" : "transparent",
              color: "#fff",
              fontWeight: activeTab === "users" ? "600" : "400"
            }}
          >
            Users Management
          </button>
          <button
            onClick={() => setActiveTab("providers")}
            style={{
              textAlign: "left",
              padding: "0.75rem 1rem",
              borderRadius: "0.375rem",
              border: "none",
              cursor: "pointer",
              backgroundColor: activeTab === "providers" ? "#3b82f6" : "transparent",
              color: "#fff",
              fontWeight: activeTab === "providers" ? "600" : "400"
            }}
          >
            Providers Management
          </button>
          <button
            onClick={() => setActiveTab("products")}
            style={{
              textAlign: "left",
              padding: "0.75rem 1rem",
              borderRadius: "0.375rem",
              border: "none",
              cursor: "pointer",
              backgroundColor: activeTab === "products" ? "#3b82f6" : "transparent",
              color: "#fff",
              fontWeight: activeTab === "products" ? "600" : "400"
            }}
          >
            Products Moderation
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, backgroundColor: "#f8fafc", padding: "2rem" }}>
        {activeTab === "users" && <ManageUsers />}
        {activeTab === "providers" && <ManageProviders />}
        {activeTab === "products" && <ManageProducts />}
      </main>
    </div>
  );
}
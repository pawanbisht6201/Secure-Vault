import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import PasswordForm from "../components/PasswordForm";
import PasswordCard from "../components/PasswordCard";

const Dashboard = () => {
  const [passwords, setPasswords] = useState([]);
  const [editData, setEditData] = useState(null);
  const [search, setSearch] = useState("");

  // Load all passwords
  const loadPasswords = async () => {
    try {
      const res = await API.get("/passwords");
      setPasswords(res.data.data);
    } catch (err) {
      console.error("Error loading passwords:", err);
    }
  };

  // Load passwords when page opens
  useEffect(() => {
    loadPasswords();
  }, []);

  // Search filter
  const filteredPasswords = passwords.filter((item) => {
    const query = search.toLowerCase();

    return (
      item.website.toLowerCase().includes(query) ||
      item.username.toLowerCase().includes(query) ||
      (item.notes || "").toLowerCase().includes(query)
    );
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
      }}
    >
      <Navbar />

      <div
        style={{
          maxWidth: "1200px",
          margin: "30px auto",
          padding: "20px",
        }}
      >
        <h1>Password Dashboard</h1>

        <PasswordForm
          refresh={loadPasswords}
          editData={editData}
          clearEdit={() => setEditData(null)}
        />

        {/* Search Box */}

        <input
          type="text"
          placeholder="🔍 Search Website / Username / Notes"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "30px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid #334155",
            background: "#1e293b",
            color: "white",
            outline: "none",
            boxSizing: "border-box",
          }}
        />

        <h2>Saved Passwords</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {filteredPasswords.length === 0 ? (
            <p>No passwords found.</p>
          ) : (
            filteredPasswords.map((item) => (
              <PasswordCard
                key={item._id}
                password={item}
                refresh={loadPasswords}
                onEdit={setEditData}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
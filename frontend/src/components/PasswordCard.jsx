import { useState } from "react";
import {
  FiCopy,
  FiEdit,
  FiTrash2,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import API from "../services/api";
import toast from "react-hot-toast";

const PasswordCard = ({ password, refresh, onEdit }) => {
  const [showPassword, setShowPassword] = useState(false);

  // Copy Password
  const copyPassword = () => {
    navigator.clipboard.writeText(password.password);
    toast.success("Password Copied");
  };

  // Delete Password
  const deletePassword = async () => {
    if (!window.confirm("Delete this password?")) return;

    try {
      await API.delete(`/passwords/${password._id}`);
      toast.success("Password Deleted");
      refresh();
    } catch (err) {
      console.error(err);
      toast.error("Delete Failed");
    }
  };

  // Edit Password
  const editPassword = () => {
    onEdit(password);
  };

  return (
    <div
      style={{
        background: "#1e293b",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
      }}
    >
      <h3
        style={{
          color: "#38bdf8",
          marginBottom: "15px",
        }}
      >
        {password.website}
      </h3>

      <p>
        <strong>Username:</strong> {password.username}
      </p>

      <p>
        <strong>Password:</strong>{" "}
        {showPassword ? password.password : "••••••••••"}
      </p>

      <button
        onClick={() => setShowPassword(!showPassword)}
        style={{
          marginBottom: "15px",
          background: "#334155",
          color: "white",
          border: "none",
          padding: "8px 12px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        {showPassword ? <FiEyeOff /> : <FiEye />}
      </button>

      <p
        style={{
          color: "#94a3b8",
          minHeight: "40px",
        }}
      >
        {password.notes || "No Notes"}
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <button
          style={btn}
          onClick={copyPassword}
          title="Copy Password"
        >
          <FiCopy />
        </button>

        <button
          style={btn}
          onClick={editPassword}
          title="Edit Password"
        >
          <FiEdit />
        </button>

        <button
          style={{
            ...btn,
            background: "#ef4444",
          }}
          onClick={deletePassword}
          title="Delete Password"
        >
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
};

const btn = {
  background: "#334155",
  border: "none",
  padding: "10px",
  borderRadius: "8px",
  color: "white",
  cursor: "pointer",
  fontSize: "18px",
};

export default PasswordCard;
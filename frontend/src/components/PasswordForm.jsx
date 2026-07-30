import { useState, useEffect } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

const PasswordForm = ({ refresh, editData, clearEdit }) => {
  const [formData, setFormData] = useState({
    website: "",
    username: "",
    password: "",
    notes: "",
  });

  // Fill form when editing
  useEffect(() => {
    if (editData) {
      setFormData({
        website: editData.website || "",
        username: editData.username || "",
        password: editData.password || "",
        notes: editData.notes || "",
      });
    } else {
      setFormData({
        website: "",
        username: "",
        password: "",
        notes: "",
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editData) {
        await API.put(`/passwords/${editData._id}`, formData);
        toast.success("Password Updated");
        clearEdit();
      } else {
        await API.post("/passwords", formData);
        toast.success("Password Saved");
      }

      setFormData({
        website: "",
        username: "",
        password: "",
        notes: "",
      });

      refresh();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Operation Failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "#1e293b",
        padding: "25px",
        borderRadius: "12px",
      }}
    >
      <h2>{editData ? "Edit Password" : "Add New Password"}</h2>

      <input
        type="text"
        name="website"
        placeholder="Website"
        value={formData.website}
        onChange={handleChange}
        style={inputStyle}
      />

      <input
        type="text"
        name="username"
        placeholder="Username / Email"
        value={formData.username}
        onChange={handleChange}
        style={inputStyle}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        style={inputStyle}
      />

      <textarea
        name="notes"
        placeholder="Notes"
        rows="3"
        value={formData.notes}
        onChange={handleChange}
        style={{
          ...inputStyle,
          resize: "none",
        }}
      />

      <button
        type="submit"
        style={{
          width: "100%",
          marginTop: "15px",
          padding: "12px",
          background: "#38bdf8",
          border: "none",
          borderRadius: "8px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        {editData ? "Update Password" : "Save Password"}
      </button>

      {editData && (
        <button
          type="button"
          onClick={clearEdit}
          style={{
            width: "100%",
            marginTop: "10px",
            padding: "12px",
            background: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      )}
    </form>
  );
};

const inputStyle = {
  width: "100%",
  marginTop: "15px",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #334155",
  background: "#0f172a",
  color: "white",
  boxSizing: "border-box",
};

export default PasswordForm;
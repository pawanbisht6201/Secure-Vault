import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
import API from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", formData);

      toast.success("Registration Successful");

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration Failed"
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0f172a",
      }}
    >
      <form
        onSubmit={handleRegister}
        style={{
          width: "400px",
          background: "#1e293b",
          padding: "35px",
          borderRadius: "12px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#38bdf8",
          }}
        >
          🔐 SecureVault
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
        />

        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={inputStyle}
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "15px",
              top: "18px",
              cursor: "pointer",
              color: "white",
            }}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>

        <button style={buttonStyle}>
          Register
        </button>

        <p
          style={{
            textAlign: "center",
            color: "white",
            marginTop: "20px",
          }}
        >
          Already have an account?
          <Link
            to="/login"
            style={{
              color: "#38bdf8",
              marginLeft: "5px",
            }}
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  marginTop: "20px",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #334155",
  background: "#0f172a",
  color: "white",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  marginTop: "25px",
  padding: "12px",
  border: "none",
  borderRadius: "8px",
  background: "#38bdf8",
  fontWeight: "bold",
  cursor: "pointer",
};

export default Register;
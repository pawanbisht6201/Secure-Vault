import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
import API from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);

      toast.success("Login Successful");

      navigate("/dashboard");

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login Failed"
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: "380px",
          background: "#1e293b",
          padding: "35px",
          borderRadius: "15px",
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
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
        />

        <div
          style={{
            position: "relative",
          }}
        >
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={inputStyle}
          />

          <span
            onClick={() =>
              setShowPassword(!showPassword)
            }
            style={{
              position: "absolute",
              right: "15px",
              top: "18px",
              cursor: "pointer",
            }}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>

        <button style={buttonStyle}>
          Login
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          Don't have an account?
          <Link
            to="/register"
            style={{
              color: "#38bdf8",
              marginLeft: "5px",
            }}
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "20px",
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

export default Login;
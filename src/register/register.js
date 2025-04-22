import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { transform } from "typescript";
import { useUserContext } from "../context/usercontext";
import { BACKEND_ENDPOINT } from "../Utils/constants";
function Register() {
  const {
    loginStatus,
    isLoginFormVisible,
    toggleStatus,
    setLoading,
    userName,
    setUserName,
    userCredentials,
    setUserCredentials,
    navigate,
  } = useUserContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // https://laughing-space-guacamole-v6q7gw4x5j73xv5x-8000.app.github.dev/api/v1/users

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ hasError: false, content: "" });

  const togglePassword = () => setShowPassword(!showPassword);

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage({ ...message, content: "Please wait.." });

    try {
      const response = await fetch("/api/auth/register-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);
      if (!response.ok) {
        throw new Error(result?.detail || "Something went wrong");
      }
      console.log(result);
      setMessage({ hasError: false, content: result?.message });
      setTimeout(() => {
        setUserName(data?.username.trim());
        navigate("/verify-email");
      }, 1000);
    } catch (err) {
      setMessage({ hasError: true, content: err.message });
      console.log(err.message);
    }
  };
  if (loginStatus) {
    navigate("/");
    return;
  }
  return (
    <div style={styles.container} id="frm">
      <h2 style={styles.heading}>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        <input
          type="text"
          placeholder="Username"
          {...register("username", { required: "Username is required" })}
          style={styles.input}
        />
        {errors.username && (
          <p style={styles.error}>{errors.username.message}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
          style={styles.input}
        />
        {errors.email && <p style={styles.error}>{errors.email.message}</p>}

        <div style={{ position: "relative", width: "100%" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            style={styles.input}
          />
          <span onClick={togglePassword} style={styles.toggle}>
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>
        {errors.password && (
          <p style={styles.error}>{errors.password.message}</p>
        )}

        <button type="submit" style={styles.button}>
          Register
        </button>
      </form>

      {message.content && (
        <p style={message.hasError ? styles.error : styles.success}>
          {message.content}
        </p>
      )}

      <p style={styles.link}>
        Already have an account?
        <span onClick={() => navigate("/auth/login")} style={styles.clickable}>
          Login
        </span>
      </p>
    </div>
  );
}

const styles = {
  container: {
    borderRadius: "10px",
    maxWidth: "30%", // Increased width
    width: "95%", // Responsive width
    minWidth: "380px",
    margin: "auto",
    textAlign: "center",
    padding: "30px", // Increased padding
    height: "auto",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "0 0px 15px rgba(0, 0, 0, 0.2)", // Softer shadow
  },
  heading: { fontSize: "28px", marginBottom: "15px" },
  form: { display: "flex", flexDirection: "column", gap: "15px" }, // Increased gap
  input: {
    padding: "12px",
    fontSize: "18px", // Increased font size
    borderRadius: "8px",
    border: "1px solid #bbb",
    width: "100%",
  },
  toggle: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
  },
  button: {
    backgroundColor: "#2ECC71",
    color: "#fff",
    padding: "12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "18px", // Increased font size
  },
  link: { marginTop: "15px", fontSize: "16px" },
  clickable: { color: "#2ECC71", cursor: "pointer", fontWeight: "bold" },
  error: { color: "red", fontSize: "14px" },
  success: { color: "green", fontSize: "16px" },
};
export default Register;

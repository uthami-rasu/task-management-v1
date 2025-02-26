import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { transform } from "typescript";
import { useUserContext } from "../context/usercontext";
import { useEffect } from "react";

function Login() {
  const {
    isLoginFormVisible,
    toggleStatus,
    setLoading,
    userName,
    setUserName,
    userCredentials,
    setUserCredentials,
  } = useUserContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // https://laughing-space-guacamole-v6q7gw4x5j73xv5x-8000.app.github.dev/api/v1/users
  const BASE_URL = "https://backend-fastapi-3qe5.onrender.com";
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ hasError: false, content: "" });
  const navigate = useNavigate();

  useEffect(() => {
    fetch(BASE_URL + "/auth/me", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          navigate("/home");
        }
        return res.json();
      })
      .then((data) => console.log("DATA:  ", data))
      .catch((err) => console.log(err));
  }, []);
  const togglePassword = () => setShowPassword(!showPassword);

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage({ ...message, content: "Please wait.." });

    try {
      const response = await fetch(BASE_URL + "/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.detail || "Something went wrong");
      }
      console.log(result);
      setMessage({ hasError: false, content: result?.message });
      setTimeout(() => {
        toggleStatus();
        navigate("/home");
      }, 1000);
    } catch (err) {
      setMessage({ hasError: true, content: err.message });
      console.log(err.message);
    }
  };

  if (!isLoginFormVisible) return null;
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
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
        </div>
        {errors.password && (
          <p style={styles.error}>{errors.password.message}</p>
        )}

        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>

      {message.content && (
        <p style={message.hasError ? styles.error : styles.success}>
          {message.content}
        </p>
      )}

      <p style={styles.link}>
        Don't have an account?
        <span
          onClick={() => navigate("/auth/register")}
          style={styles.clickable}
        >
          Register
        </span>
      </p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    width: "350px",
    margin: "auto",
    textAlign: "center",
    padding: "20px",
    height: "auto",
    // backgroundColor: "red",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "0 4px 10px grey",
  },
  heading: { fontSize: "24px", marginBottom: "10px" },
  form: { display: "flex", flexDirection: "column", gap: "10px" },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
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
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  link: { marginTop: "10px", fontSize: "14px" },
  clickable: { color: "#2ECC71", cursor: "pointer", fontWeight: "bold" },
  error: { color: "red", fontSize: "12px" },
  success: { color: "green", fontSize: "14px" },
};

export default Login;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BACKEND_ENDPOINT } from "../Utils/constants";
import { useUserContext } from "../context/usercontext";
import { useEffect } from "react";
import useTasks from "../context/usertasks";

import "../login.css";
function Login() {
  const {
    setLoading,
    setUserName,
    setLoginStatus,
    setIsLoginFormVisible,
    loginStatus,
    navigate,
  } = useUserContext();
  const { setIsFormVisible } = useTasks();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ hasError: false, content: "" });

  useEffect(() => {
    setIsFormVisible(false);
    if (!loginStatus) {
      fetchUser();
    }
  }, []);
  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await fetch(BACKEND_ENDPOINT + "/api/auth/me", {
        method: "GET",
        credentials: "include",
        mode: "cors",
      });

      if (res.ok) {
        setLoginStatus(true);
        const data = await res.json();
        setUserName(data?.user || "Buddy");

        navigate("/");
        return;
      }
      setLoginStatus(false);
    } catch (err) {
      setLoginStatus(false);
      console.error("Error fetching user:", err);
    } finally {
      setLoading(false);
    }
  };

  const togglePassword = () => setShowPassword(!showPassword);

  const onSubmit = async (data) => {
    console.log("submit");
    setLoading(true);
    setMessage({ ...message, content: "Please wait.." });

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      console.log(response);
      const result = await response.json();
      console.log(response);
      if (!response.ok) {
        throw new Error(result?.detail || "Something went wrong");
      }
      if (response.status === 202) {
        setMessage({ hasError: false, content: result?.message });
        setTimeout(() => {
          navigate("/verify-email");
        }, 1000);
        return;
      }
      console.log(result);
      setMessage({ hasError: false, content: result?.message });
      setTimeout(() => {
        localStorage.setItem("username", result?.user);
        localStorage.setItem("loginStatus", true);
        setLoginStatus(true);
        setIsLoginFormVisible(false);
      }, 1000);
    } catch (err) {
      setMessage({ hasError: true, content: "Something went wrong!" });
      console.log(err.message);
    }
  };
  if (loginStatus) {
    navigate("/");
    return;
  }

  return (
    <div style={styles.container} id="frm">
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

export default Login;

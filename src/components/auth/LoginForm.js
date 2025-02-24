"use client";
import { useUserContext } from "@/context/userContext";
import React from "react";

function LoginForm() {
  const { loginUser, userState, handlerUserInput } = useUserContext();
  const { email, password } = userState;
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  const styles = {
    form: {
      position: "relative",
      margin: "2rem",
      padding: "14px 40px",
      borderRadius: "8px",
      backgroundColor: "white",
      width: "100%",
      maxWidth: "520px",
    },
    heading: {
      marginBottom: "8px",
      textAlign: "center",
      fontSize: "1.35rem",
      fontWeight: "500",
    },
    paragraph: {
      marginBottom: "8px",
      padding: "0 2rem",
      textAlign: "center",
      color: "#999",
      fontSize: "14px",
    },
    inputContainer: {
      marginTop: "1rem",
      display: "flex",
      flexDirection: "column",
    },
    label: {
      marginBottom: "4px",
      color: "#999",
    },
    input: {
      padding: "12px 16px",
      border: "2px solid #ccc",
      borderRadius: "6px",
      outlineColor: "#2ECC71",
      color: "#333",
      fontSize: "16px",
    },
    passwordContainer: {
      position: "relative",
      marginTop: "1rem",
      display: "flex",
      flexDirection: "column",
    },
    toggleButton: {
      position: "absolute",
      right: "16px",
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: "22px",
      color: "#999",
      opacity: "0.45",
      background: "none",
      border: "none",
      cursor: "pointer",
    },
    forgotPassword: {
      marginTop: "16px",
      textAlign: "right",
      fontWeight: "bold",
      fontSize: "14px",
      color: "#2ECC71",
      textDecoration: "none",
      transition: "color 0.3s",
    },
    button: {
      marginTop: "1.5rem",
      padding: "12px 16px",
      fontWeight: "bold",
      backgroundColor: "#2ECC71",
      color: "white",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.3s",
      width: "100%",
    },
  };

  return (
    <form style={styles.form}>
      <div>
        <h1 style={styles.heading}>Login to Your Account</h1>
        <p style={styles.paragraph}>
          Login Now. Don't have an account?{" "}
          <a
            href="/register"
            style={{
              fontWeight: "bold",
              color: "#2ECC71",
              textDecoration: "none",
            }}
          >
            Register here
          </a>
        </p>

        <div style={styles.inputContainer}>
          <label htmlFor="email" style={styles.label}>
            Email
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => handlerUserInput("email")(e)}
            name="email"
            style={styles.input}
            placeholder="johndoe@gmail.com"
          />
        </div>

        <div style={styles.passwordContainer}>
          <label htmlFor="password" style={styles.label}>
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => handlerUserInput("password")(e)}
            name="password"
            style={styles.input}
            placeholder="***************"
          />
          <button
            type="button"
            style={styles.toggleButton}
            onClick={togglePassword}
          >
            {showPassword ? (
              <i className="fas fa-eye-slash"></i>
            ) : (
              <i className="fas fa-eye"></i>
            )}
          </button>
        </div>

        <div>
          <a href="/forgot-password" style={styles.forgotPassword}>
            Forgot password?
          </a>
        </div>

        <div>
          <button
            type="submit"
            disabled={!email || !password}
            onClick={loginUser}
            style={styles.button}
          >
            Login Now
          </button>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;

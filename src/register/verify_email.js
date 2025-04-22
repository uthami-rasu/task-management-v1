import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUserContext } from "../context/usercontext";
import { useSearchParams } from "react-router-dom";

function VerifyEmail() {
  const {
    register,
    handleSubmit,
    setValue, // ADD THIS TO UPDATE FORM STATE
    formState: { errors },
  } = useForm();

  const { clientToken, setClientToken, toggleStatus, navigate } =
    useUserContext();
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState({ hasError: false, content: "" });

  useEffect(() => {
    const urlToken = searchParams.get("token") || "";
    if (urlToken) {
      setClientToken(urlToken); // Update local state
      setValue("token", urlToken); // UPDATE FORM VALUE
    }
  }, [searchParams, setValue]);

  const onSubmit = async (data) => {
    if (!data || !data?.token.trim()) {
      setMessage({ hasError: true, content: "Please enter a valid token" });
      return;
    }

    try {
      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: data.token.trim() }),
        mode: "cors",
      });
      // console.log("RESPONSE:", response);
      let result;
      try {
        result = await response.json();
        console.log("DEV:", result);
      } catch (err) {
        result = { message: "Something went wrong, try again.." };
      }

      if (!response.ok) {
        throw new Error(result?.detail || "Something went wrong");
      }

      setMessage({
        hasError: false,
        content: result?.message || "Email verified successfully!",
      });
      setTimeout(() => {
        setClientToken("");
        navigate("/");
      }, 500);
    } catch (err) {
      setClientToken("");
      console.log(err);
      setMessage({
        hasError: true,
        content:
          typeof err.message === "string"
            ? err.message
            : "Something went wrong",
      });
    }
  };

  return (
    <div style={styles.container} id="frm">
      <h2 style={styles.heading}>Verify Email</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        <input
          type="text"
          placeholder="Enter OTP here"
          {...register("token", { required: "OTP is required" })}
          style={styles.input}
          value={clientToken}
          onChange={(e) => {
            setClientToken(e.target.value);
            setValue("token", e.target.value); // Update form state
          }}
        />
        {errors.token && <p style={styles.error}>{errors.token.message}</p>}

        <button type="submit" style={styles.button}>
          Verify
        </button>
      </form>

      {message.content && (
        <p style={message.hasError ? styles.error : styles.success}>
          {message.content}
        </p>
      )}
      <p style={styles.link}>
        Redirect to login page?
        <span onClick={() => navigate("/auth/login")} style={styles.clickable}>
          Login
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
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "0 4px 10px grey",
    borderRadius: "0.5rem",
  },
  heading: { fontSize: "24px", marginBottom: "10px" },
  form: { display: "flex", flexDirection: "column", gap: "10px" },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "100%",
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

export default VerifyEmail;

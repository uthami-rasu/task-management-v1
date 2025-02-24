import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useUserContext } from "../context/usercontext";

import { useSearchParams, useNavigate } from "react-router-dom";
function VerifyEmail() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const BASE_ENDPOINT =
    "https://laughing-space-guacamole-v6q7gw4x5j73xv5x-8001.app.github.dev";

  const navigate = useNavigate();
  const { clientToken, setClientToken, toggleStatus } = useUserContext();

  const [searchParams] = useSearchParams();

  const [message, setMessage] = useState("");

  useEffect(() => {
    const urlToken = searchParams.get("token");

    if (urlToken) {
      setClientToken(urlToken);
    }
  }, []);

  const onSubmit = async (data) => {
    if (!data) {
      setMessage("Please enter valid token");
    }

    try {
      const response = await fetch(BASE_ENDPOINT + "/api/auth/verify-token", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setMessage(result.message);
      toggleStatus();
      navigate("/home");
    } catch (err) {
      console.error(err);
    }

    //console.log(data);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Verify Email</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        <input
          type="text"
          placeholder="Enter OTP here"
          {...register("token", { required: "OTP is required" })}
          style={styles.input}
          value={clientToken}
        />
        {errors.token && <p style={styles.error}>{errors.token.message}</p>}

        <button type="submit" style={styles.button}>
          Verify
        </button>
      </form>

      {message && <p style={styles.success}>{message}</p>}
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
  error: { color: "red", fontSize: "12px" },
  success: { color: "green", fontSize: "14px" },
};

export default VerifyEmail;

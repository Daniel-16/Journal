import React, { useState } from "react";
import Axios from "axios";
import { MDBInput } from "mdbreact";
import forgotPassImg from "../Images/forgotPass.png";

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [messageModal, setMessageModal] = useState(false);
  const toggleMessageModal = () => {
    setMessageModal(!messageModal);
  };
  const forgotPasswordHandler = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    Axios.post(
      "https://journal-app123.herokuapp.com/api/auth/forgotPassword",
      { email },
      config
    )
      .then((res) => {
        console.log(res.data);
        setSuccess(
          "A password reset link has been sent to your email. Check your inbox or your spam for the reset link."
        );
        setTimeout(() => {
          setSuccess("");
        }, 10000);
        toggleMessageModal();
      })
      .catch((err) => {
        if (err.toString().includes("404")) {
          setError("There is no account for the email address provided");
          setTimeout(() => {
            setError("");
          }, 8000);
        } else {
          setError("An unknown error occured.");
          setTimeout(() => {
            setError("");
          }, 8000);
        }
        console.error(err);
      });
  };
  return (
    <div className="container">
      <span
        className="fa fa-arrow-left mt-3"
        onClick={() => history.push("/login")}
        style={{
          width: 50,
          height: 50,
          textAlign: "center",
          borderRadius: 15,
          paddingTop: 15,
          cursor: "pointer",
          marginTop: "4rem",
        }}
      ></span>
      <div className="text-center">
        <img
          src={forgotPassImg}
          className="img-fluid w-50 h-50"
          alt="ForgotPassword"
        />
      </div>
      <h1 className="display-5 text-center">Forgot Password?</h1>
      <p className="text-center">
        Don't worry it happens. Please enter the address associated with your
        account
      </p>
      <form onSubmit={forgotPasswordHandler}>
        <MDBInput
          label="Email address"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        {success && (
          <small
            className={
              success
                ? "text-center animated fadeInUp mt-2"
                : "text-center animated fadeOut mt-2"
            }
          >
            {success}
          </small>
        )}
        {error && (
          <small className="text-center animated text-danger fadeIn mt-2">
            {error}
          </small>
        )}
        <button
          className="btn btn-sm w-100"
          type="submit"
          style={{
            textTransform: "none",
            backgroundColor: "#6C63FF",
            color: "white",
            borderRadius: 5,
            fontSize: 17,
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;

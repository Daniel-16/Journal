import React, { useState } from "react";
import ResetPassImg from "../Images/resetPass.png";
import { MDBInput } from "mdbreact";
import Axios from "axios";

const ResetPassword = ({ match }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [toggleIcon, setToggledIcon] = useState(false);
  const [toggleIcon2, setToggledIcon2] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const toggle = () => {
    setToggledIcon(!toggleIcon);
    setShowPassword(!showPassword);
  };
  const toggle2 = () => {
    setToggledIcon2(!toggleIcon2);
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (password === confirmPassword) {
      console.log("Passwords match");
      Axios.put(
        `https://journal-app123.herokuapp.com/api/auth/resetPassword/${match.params.resetToken}`,
        { password },
        config
      )
        .then((res) => {
          console.log(res);
          window.open("/login", "_self");
        })
        .catch((err) => {
          if (err.toString().includes("400")) {
            setError("Bad Request");
          }
          console.error(err);
          setTimeout(() => {
            setError("");
          }, 7000);
        });
    } else {
      console.log("Passwords do not match");
      setError("Passwords do not match");
      setTimeout(() => {
        setError("");
      }, 7000);
    }
  };
  return (
    <div className="container">
      <div className="text-center">
        <img
          src={ResetPassImg}
          className="img-fluid w-50 h-50"
          alt="ResetPassword"
        />
      </div>
      <h1 className="display-5 text-center">Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <MDBInput
          label="New password"
          type={showPassword ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <i
          className={toggleIcon ? "fa fa-eye-slash" : "fa fa-eye"}
          style={{
            position: "relative",
            bottom: 50,
            float: "right",
            cursor: "pointer",
            color: "grey",
          }}
          onClick={toggle}
        ></i>
        <br />
        <div style={{ position: "relative", bottom: 40, marginBottom: "none" }}>
          <MDBInput
            label="Confirm new password"
            type={showConfirmPassword ? "text" : "password"}
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            required
          />
          <i
            className={toggleIcon2 ? "fa fa-eye-slash" : "fa fa-eye"}
            style={{
              position: "relative",
              bottom: 50,
              float: "right",
              cursor: "pointer",
              color: "grey",
            }}
            onClick={toggle2}
          ></i>
          {error && (
            <small
              className={
                error
                  ? "animated fadeIn text-danger"
                  : "animated fadeOut text-danger"
              }
            >
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
            Reset password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;

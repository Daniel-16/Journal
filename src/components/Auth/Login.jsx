import React, { useState } from "react";
import { MDBInput } from "mdbreact";
import { Link } from "react-router-dom";
import Loginimg from "../../Images/login.png";

const Login = () => {
  const [toggleIcon, setToggledIcon] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toggle = () => {
    setToggledIcon(!toggleIcon);
    setShowPassword(!showPassword);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log([email, password]);
    setEmail("");
    setPassword("");
  };
  return (
    <div className="container mb-3">
      <h1 className="display-5 text-center" style={{ marginTop: "2rem" }}>
        Log In
      </h1>
      <div className="text-center">
        <img className="img-fluid w-50 h-50" src={Loginimg} alt="Login" />
      </div>
      <form onSubmit={handleSubmit}>
        <MDBInput
          label="Email address"
          type="email"
          onChange={handleEmail}
          value={email}
          required
        />
        <MDBInput
          label="Password"
          type={showPassword ? "text" : "password"}
          onChange={handlePassword}
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
        <div style={{ marginRight: 12 }}>
          <button
            className="btn shadow-none"
            style={{
              backgroundColor: "#6C63FF",
              color: "white",
              borderRadius: 5,
              width: "100%",
              fontSize: 17,
              textTransform: "none",
            }}
            type="submit"
          >
            Log In
          </button>
        </div>
      </form>
      <div className="text-center">
        <small className="text-muted">
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "#6C63FF" }}>
            Create an Account
          </Link>
        </small>
      </div>
    </div>
  );
};

export default Login;

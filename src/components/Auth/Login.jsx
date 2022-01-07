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
    <div className="container">
      <div className="row">
        <div className="col-lg">
          <img className="img-fluid w-100 h-100" src={Loginimg} alt="Login" />
        </div>
        <div className="col-lg">
          <h2 className="font-weight-bold mt-3">Log In</h2>
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
                Sign up
              </Link>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

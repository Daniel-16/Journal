import React, { useState } from "react";
import { MDBInput } from "mdbreact";
import { Link } from "react-router-dom";
import SignInImage from "../../Images/sign-in.png";
import API from "../../utils/api";

const Auth = () => {
  const [toggleIcon, setToggledIcon] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastname, setLastname] = useState("");
  const toggle = () => {
    setToggledIcon(!toggleIcon);
    setShowPassword(!showPassword);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleLastname = (e) => {
    setLastname(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log([name, lastname, email, password]);
    signupUser(name, lastname, email, password);
    setName("");
    setLastname("");
    setEmail("");
    setPassword("");
  };
  const signupUser = async (name, lastname, email, password) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = {
        name,
        lastname,
        email,
        password,
      };
      const res = await API.post("/signup", body, config);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg">
          <img
            className="img-fluid w-100 h-100"
            src={SignInImage}
            alt="Sign up"
          />
        </div>
        <div className="col-lg">
          <h2 className="font-weight-bold mt-3">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <MDBInput
              label="Firstname"
              type="text"
              onChange={handleName}
              required
              value={name}
            />
            <MDBInput
              label="Lastname"
              type="text"
              onChange={handleLastname}
              required
              value={lastname}
            />
            <MDBInput
              label="Email address"
              type="email"
              onChange={handleEmail}
              required
              value={email}
            />
            <MDBInput
              label="Password"
              type={showPassword ? "text" : "password"}
              onChange={handlePassword}
              required
              value={password}
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
                Sign Up
              </button>
            </div>
          </form>
          <div className="text-center">
            <small className="text-muted">
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#6C63FF" }}>
                Log in
              </Link>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

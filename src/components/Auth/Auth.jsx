import React, { useState } from "react";
import { MDBInput } from "mdbreact";
import { Link } from "react-router-dom";
import SignInImage from "../../Images/sign-in.png";
import Axios from "axios";

const Auth = ({ history }) => {
  const [toggleIcon, setToggledIcon] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toggle = () => {
    setToggledIcon(!toggleIcon);
    setShowPassword(!showPassword);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  // const handleLastname = (e) => {
  //   setLastname(e.target.value);
  // };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    Axios.post("http://localhost:5000/api/auth/register", {
      fullname: name,
      email,
      password,
    })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("authToken", res.data.token);
        history.push("/home");
      })
      .catch((err) => {
        console.error(err);
      });
    console.log([name, email, password]);
    setName("");
    setEmail("");
    setPassword("");
  };

  // try {
  //   const { data } = await axios.post(
  //     "http://localhost:5000/api/auth/register",
  //     {
  //       fullname: name,
  //       email,
  //       password,
  //     },
  //     config
  //   );
  //   localStorage.setItem("authToken", data.token);
  //   history.push("/home");
  // } catch (error) {
  //   console.log(error.response.data.error);
  // }
  const centerForm = {
    margin: "auto",
  };
  return (
    <div className="container mb-3" style={centerForm}>
      <h1 className="display-5 text-center" style={{ marginTop: "2rem" }}>
        Create Account
      </h1>
      <div className="text-center">
        <img
          src={SignInImage}
          className="img-fluid w-50 h-50"
          alt="Create account"
        />
      </div>
      <form onSubmit={handleSubmit} style={{ marginTop: "0rem" }}>
        <MDBInput
          label="Fullname"
          type="text"
          onChange={handleName}
          required
          value={name}
        />
        {/* <MDBInput
              label="Lastname"
              type="text"
              onChange={handleLastname}
              required
              value={lastname}
            /> */}
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
              textTransform: "none",
              fontSize: 17,
            }}
            type="submit"
          >
            Create Account
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
  );
};

export default Auth;

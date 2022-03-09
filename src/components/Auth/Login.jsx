import React, { useState } from "react";
import { MDBInput, MDBModal, MDBModalBody, MDBModalFooter } from "mdbreact";
import { Link } from "react-router-dom";
import Loginimg from "../../Images/login.png";
import Axios from "axios";
// import { CredentialsContext } from "../../App";

const Login = ({ history }) => {
  const [toggleIcon, setToggledIcon] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorModal, setErrorModal] = useState(false);
  const toggle = () => {
    setToggledIcon(!toggleIcon);
    setShowPassword(!showPassword);
  };
  const toggleModal = () => {
    setErrorModal(!errorModal);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("user", res.data.user.fullname);
        localStorage.setItem("authToken", res.data.token);
        history.push("/home");
      })
      .catch((err) => {
        console.error(err);
        localStorage.clear();
        toggleModal();
        if (err.toString().includes("401")) {
          setErrorMessage(
            "Login details are incorrect. Check your login details or create a new account if you don't have one yet."
          );
        } else {
          setErrorMessage("An unknown error occured");
        }
      });
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
      <MDBModal isOpen={errorModal} toggle={toggleModal} size="sm" centered>
        <h5 className="modal-header text-center">Error logging in!</h5>
        <MDBModalBody className="text-center">{errorMessage}</MDBModalBody>
        <div className="flex-center">
          <MDBModalFooter>
            <button className="btn btn-danger btn-sm" onClick={toggleModal}>
              Close
            </button>
          </MDBModalFooter>
        </div>
      </MDBModal>
    </div>
  );
};

export default Login;

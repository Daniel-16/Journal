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
  const [loading, setLoading] = useState(false);
  const [loaderModal, setLoaderModal] = useState(false);

  //The following blocks of code are to just toggle functionality and handle state change
  const toggle = () => {
    setToggledIcon(!toggleIcon);
    setShowPassword(!showPassword);
  };
  const toggleModal = () => {
    setErrorModal(!errorModal);
  };
  const toggleLoaderModal = () => {
    setLoaderModal(!loaderModal);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("https://journal-app123.herokuapp.com/api/auth/login", {
      email,
      password,
    })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("user", res.data.user.fullname);
        localStorage.setItem("authToken", res.data.token);
        localStorage.setItem("userId", res.data.user._id);
        setLoading(true);
        toggleLoaderModal();
        setTimeout(() => {
          history.push("/home");
        }, 3000);
      })
      .catch((err) => {
        console.error(err);
        localStorage.clear();
        toggleModal();
        /*The conditional statement is to check the status code of an error converted to string to determine the error message. 
        400 = Bad request
        401 = Unauthorized
        500 = Server error
        */
        if (err.toString().includes("401")) {
          setErrorMessage(
            "Login details are incorrect. Check your login details or create a new account if you don't have one."
          );
        } else if (err.toString().includes("500")) {
          setErrorMessage("A Server error occured!");
        } else {
          setErrorMessage("An unknown error occured!");
        }
      });
  };
  return (
    <div
      className="container mb-3"
      //The purpose of the style below is to disable pointer events while the loader modal is up to prevent user from closing a loader modal.
      style={loading ? { pointerEvents: "none" } : { pointerEvents: "all" }}
    >
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
      {loading && (
        <MDBModal
          isOpen={loaderModal}
          toggle={toggleLoaderModal}
          size="sm"
          centered
          className="h-100"
        >
          <MDBModalBody className="text-center">
            <div className="spinner-border text-primary mt-4 mb-4"></div>
          </MDBModalBody>
          <div className="flex-center"></div>
        </MDBModal>
      )}
    </div>
  );
};

export default Login;

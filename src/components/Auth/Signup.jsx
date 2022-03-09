import React, { useState } from "react";
import { MDBInput, MDBModal, MDBModalBody, MDBModalFooter } from "mdbreact";
import { Link } from "react-router-dom";
import SignInImage from "../../Images/sign-in.png";
import Axios from "axios";
// import { CredentialsContext } from "../../App";

const Signup = ({ history }) => {
  const [toggleIcon, setToggledIcon] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loaderModal, setLoaderModal] = useState(false);
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
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    Axios.post("http://localhost:5000/api/auth/register", {
      fullname: username,
      email,
      password,
    })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("authToken", res.data.token);
        localStorage.setItem("user", res.data.user.fullname);
        // history.push("/home");
        setLoading(true);
        toggleLoaderModal();
        setTimeout(() => {
          history.push("/home");
        }, 3000);
      })
      .catch((err) => {
        console.error(err);
        toggleModal();
        if (err.toString().includes("400")) {
          console.log("Bad Request");
          setErrorMessage(
            "An error occured while creating an account. Make sure the information given is correct or login if you already have an account."
          );
        } else if (err.toString().includes("500")) {
          setErrorMessage("A Server error occured.");
        } else {
          setErrorMessage("An unknown error occured.");
        }
        localStorage.clear();
      });
  };

  const centerForm = {
    margin: "auto",
  };
  return (
    <div
      className="container mb-3"
      style={
        (centerForm,
        loading ? { pointerEvents: "none" } : { pointerEvents: "all" })
      }
    >
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
          value={username}
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
      <MDBModal isOpen={errorModal} toggle={toggleModal} size="sm" centered>
        {/* <MDBModalHeader toggle={toggleModal}> */}
        <h5 className="modal-header text-center">Error Creating Account!</h5>
        {/* </MDBModalHeader> */}
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

export default Signup;

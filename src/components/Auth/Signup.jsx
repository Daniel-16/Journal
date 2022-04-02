import React, { useState } from "react";
import { MDBInput } from "mdbreact";
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
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  //The function below is to toggle the "see password" icon
  const toggle = () => {
    setToggledIcon(!toggleIcon);
    setShowPassword(!showPassword);
  };
  //The functions below are to handle state change.
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
    //Post the form fields to the database
    Axios.post("https://journal-app123.herokuapp.com/api/auth/register", {
      fullname: username,
      email,
      password,
    })
      .then((res) => {
        setLoading(true);
        console.log(res.data);
        localStorage.setItem("authToken", res.data.token);
        localStorage.setItem("user", res.data.user.fullname);
        localStorage.setItem("userId", res.data.user._id);
        setTimeout(() => {
          history.push("/home");
          setLoading(false);
        }, 3000);
      })
      .catch((err) => {
        console.error(err);
        // toggleModal();
        /*The conditional statement is to check the status code of an error converted to string to determine the error message. 
        400 = Bad request
        401 = Unauthorized
        500 = Server error
        */
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
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
        localStorage.clear();
      });
  };

  const centerForm = {
    margin: "auto",
  };
  return (
    <div
      className="container mb-3"
      //The purpose of the style below is to disable pointer events while the loader modal is up to prevent user from closing a loader modal.
      style={
        (centerForm,
        loading ? { pointerEvents: "none" } : { pointerEvents: "all" })
      }
    >
      <div className="text-center">
        <img
          src={SignInImage}
          className="img-fluid w-50 h-50"
          alt="Create account"
          style={{ marginTop: "2rem" }}
        />
      </div>
      <h1 className="display-5 text-center">Create Account</h1>
      <form onSubmit={handleSubmit} style={{ marginTop: "0rem" }}>
        <MDBInput
          label="Username"
          type="text"
          onChange={handleName}
          required
          value={username}
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
        {errorMessage && (
          <div className="text-center">
            <small className="animated fadeInUp text-danger">
              {errorMessage}
            </small>
          </div>
        )}
        <div style={{ marginRight: 12 }}>
          <button
            className="btn"
            style={{
              backgroundColor: "#6C63FF",
              color: "white",
              borderRadius: 5,
              width: "100%",
              textTransform: "none",
              fontSize: 17,
            }}
            type="submit"
            disabled={loading ? true : false}
          >
            {!loading ? (
              "Create Account"
            ) : (
              <>
                Loading
                <i className="spinner-grow spinner-grow-sm text-white ml-2"></i>
              </>
            )}
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

export default Signup;

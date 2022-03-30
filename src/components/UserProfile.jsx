import React, { useEffect, useState } from "react";
import "../Styles/profile.css";
import Axios from "axios";
import Modal from "./Modal";
import { Link } from "react-router-dom";

const UserProfile = ({ history }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      history.push("/login");
    }
  }, [history]);
  const Logout = () => {
    localStorage.clear();
    history.push("/");
  };
  //Delete user account
  const deleteAccount = () => {
    const userId = localStorage.getItem("userId");
    Axios.delete(`http://localhost:5000/api/auth/deleteUser/${userId}`)
      .then(() => {
        history.push("/signup");
        localStorage.clear();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const toggleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };
  return (
    <div>
      <div className="container">
        <nav className="navbar navbar-expand bg-white shadow-none">
          <span
            className="fa fa-arrow-left mt-3"
            onClick={() => {
              history.push("/home");
            }}
            style={{
              backgroundColor: "lightgrey",
              width: 50,
              height: 50,
              textAlign: "center",
              borderRadius: 15,
              paddingTop: 15,
              cursor: "pointer",
            }}
          ></span>
        </nav>
        <div className="flex-center mt-2">
          <div
            style={{
              cursor: "pointer",
              background: "#6C63FF",
              color: "white",
              width: "270px",
              height: "270px",
              textAlign: "center",
              padding: 7,
              borderRadius: "50%",
            }}
          >
            <h5
              style={{
                textAlign: "center",
                margin: "auto",
                fontWeight: "",
                fontSize: 200,
              }}
            >
              {localStorage.getItem("user").charAt(0).toUpperCase()}
            </h5>
          </div>
        </div>
        <br />
        <h5 className="text-center font-weight-bold">
          {localStorage.getItem("user")}
        </h5>
      </div>
      <div className="card" style={{ borderRadius: "30px 30px 0px 0px" }}>
        <div className="card-body">
          <Link
            to="/privacypolicy"
            style={{ textDecoration: "none" }}
            className="text-dark"
          >
            <button
              className="btn w-100 shadow-none"
              id="userProfiles"
              style={{
                height: 50,
                textTransform: "none",
                fontSize: 18,
                textAlign: "left",
                padding: 5,
              }}
            >
              <i className="fa fa-user-shield mr-2"></i>Privacy Policy
              <i className="fa fa-angle-right float-right"></i>
            </button>
          </Link>
          <button
            onClick={toggleDeleteModal}
            className="btn w-100 shadow-none"
            id="userProfiles"
            style={{
              height: 50,
              textTransform: "none",
              fontSize: 18,
              textAlign: "left",
              padding: 5,
            }}
          >
            <i className="fa fa-trash mr-2"></i>Delete account
            <i className="fa fa-angle-right float-right"></i>
          </button>
          <Modal
            deleteModal={deleteModal}
            toggleDeleteModal={toggleDeleteModal}
            deleteAccount={deleteAccount}
          />
          <button
            onClick={Logout}
            className="btn w-100 shadow-none"
            id="userProfiles"
            style={{
              height: 50,
              textTransform: "none",
              fontSize: 18,
              textAlign: "left",
              padding: 5,
            }}
          >
            <i className="fa fa-arrow-circle-left mr-2"></i>Log out
            <i className="fa fa-angle-right float-right"></i>
          </button>
          <Link
            to="/reportproblem"
            className="text-dark"
            style={{ textDecoration: "none" }}
          >
            <button
              className="btn w-100 shadow-none"
              id="userProfiles"
              style={{
                height: 50,
                textTransform: "none",
                fontSize: 18,
                textAlign: "left",
                padding: 5,
              }}
            >
              <i className="fa fa-exclamation-circle mr-2"></i>Report a problem
              <i className="fa fa-angle-right float-right"></i>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

import React, { useEffect } from "react";
import "../Styles/profile.css";
import Axios from "axios";

const UserProfile = ({ history }) => {
  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      history.push("/login");
    }
  }, [history]);
  const Logout = () => {
    localStorage.clear();
    history.push("/login");
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
            <i className="fa fa-user-shield mr-2"></i>Privacy Policy
            <i className="fa fa-angle-right float-right"></i>
          </button>
          <button
            onClick={deleteAccount}
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
            <i className="fa fa-exclamation-circle mr-2"></i>Report a problem
            <i className="fa fa-angle-right float-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

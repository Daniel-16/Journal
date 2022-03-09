import React, { useState, useEffect } from "react";
import AddnotesImg from "../Images/add-notes.png";
import Axios from "axios";
// import { CredentialsContext } from "../App";
import Header from "./Header";

const Home = ({ history }) => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  // const [credentials] = useContext(CredentialsContext);
  const [username] = useState(localStorage.getItem("user"));
  useEffect(() => {
    //Clears local storage if user is not authorized
    if (!localStorage.getItem("authToken")) {
      history.push("/login");
    }

    //Checks the user's auth token before giving access to private data
    const fetchData = () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      Axios.get("http://localhost:5000/api/private", config)
        .then(() => {
          setPrivateData("Welcome! You can now add your daily Journals");
        })
        .catch((err) => {
          localStorage.removeItem("authToken");
          history.push("/login");
          setError(
            "You are not authorized to use this route. Please login to access this page"
          );
          console.error(err);
        });
    };
    fetchData();
  }, [history]);

  return error ? (
    <div className="container">
      <h3>{error}</h3>
    </div>
  ) : (
    <div>
      <Header username={username} />
      <br />
      <div className="container">
        <p className="text-center lead">{privateData}</p>
        <div className="flex-center">
          <img className="img-fluid" src={AddnotesImg} alt="No notes" />
        </div>
        <h5 className="text-center">
          No record! Records of daily activities would show here once created.
        </h5>
        <button
          className="btn"
          style={{
            borderRadius: "20%",
            color: "white",
            backgroundColor: "#6C63FF",
            width: 57,
            height: 57,
            padding: 10,
            float: "right",
            position: "fixed",
            bottom: 0,
            right: 0,
            marginBottom: "20px",
            marginRight: "20px",
            fontSize: 25,
          }}
        >
          <span className="fa fa-plus"></span>
        </button>
      </div>
    </div>
  );
};

export default Home;

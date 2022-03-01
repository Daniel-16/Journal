import React, { useState, useEffect } from "react";
import AddnotesImg from "../Images/add-notes.png";
import Axios from "axios";

const Home = ({ history }) => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const [username, setUsername] = useState("");
  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      history.push("/login");
    }

    const fetchData = () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      Axios.get("http://localhost:5000/api/private", config)
        .then((res) => {
          setPrivateData(res.data.data);
        })
        .catch((err) => {
          localStorage.removeItem("authToken");
          setError(
            "You are not authorized to use this route. Please login to access this page"
          );
          console.error(err);
        });
    };

    const fetchUser = (id) => {
      Axios.get(`http://localhost:5000/api/auth/getUser/${id}`)
        .then((res) => {
          console.log(res);
          const userData = res.data.user;
          setUsername(userData.fullname);
        })
        .catch((err) => {
          console.error(err);
        });
    };

    fetchData();
    fetchUser("6217f626da7cc85598fd5a9b");
  }, [history]);

  return error ? (
    <div className="container">
      <h3>{error}</h3>
    </div>
  ) : (
    <div>
      <div
        style={{
          background: "#6C63FF",
          color: "white",
          width: "40px",
          height: "40px",
          textAlign: "center",
          borderRadius: "50%",
          display: "flex",
          float: "right",
          marginBottom: "2rem",
          marginTop: "10px",
          marginRight: 20,
        }}
      >
        <h5 style={{ textAlign: "center", margin: "auto" }}>
          {username.charAt(0).toUpperCase()}
        </h5>
      </div>
      <div className="container">
        <br />
        <div style={{ marginTop: "2rem" }}>
          <h2 className="font-weight-bold">Hello {username}!</h2>
          {/* <input
          className="form-control shadow-none"
          type="search"
          placeholder="Search"
          style={{ backgroundColor: "lightgrey", border: "none" }}
        /> */}
        </div>
        {privateData}
        <img
          className="img-fluid w-100 h-100"
          src={AddnotesImg}
          alt="No notes"
        />
        <p className="text-center">
          No record! Records of daily activities would show here once created.
        </p>
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

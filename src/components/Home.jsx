import React from "react";
import AddnotesImg from "../Images/add-notes.png";

const Home = () => {
  return (
    <div className="container">
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
        }}
      >
        <h5 style={{ textAlign: "center", margin: "auto" }}>DO</h5>
      </div>
      <br />
      <div style={{ marginTop: "3rem" }}>
        <h2 className="font-weight-bold">Hello Username</h2>
        <input
          className="form-control shadow-none"
          type="search"
          placeholder="Search"
          style={{ backgroundColor: "lightgrey", border: "none" }}
        />
      </div>
      <img className="img-fluid w-100 h-100" src={AddnotesImg} alt="No notes" />
      <p className="text-center font-weight-bold">
        No record! Records of daily activities would show here once created.
      </p>
      <button
        className="btn fixed-bottom float-right"
        style={{
          borderRadius: "50%",
          color: "white",
          backgroundColor: "#6C63FF",
          width: "50px",
          height: "50px",
        }}
      >
        <i className="fa fa-plus" style={{ width: "10px", height: "10px" }}></i>
      </button>
    </div>
  );
};

export default Home;

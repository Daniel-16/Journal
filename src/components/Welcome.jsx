import React from "react";
import NoteIllustration from "../Images/note-illustration.png";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <a href="/" className="nav-brand text-dark">
          <h4 className="mt-2 font-weight-bold">Journal</h4>
        </a>
      </nav>
      {/* <div className="container">
        <h1 className="font-weight-bold mt-2">Journal</h1>
      </div> */}
      <div className="container" style={{ marginTop: "1rem" }}>
        <div className="row">
          <div className="col-lg-4 col-sm">
            <h3 className="font-weight-bold animated fadeInUp mt-5">
              Welcome!
            </h3>
            <p className="animated fadeInUp" style={{ fontSize: "20px" }}>
              Welcome to Journal, which is your online diary to keep daily
              events of what happens to you. <br />
              Whatever you do inside Journal is secured and can only be seen by
              you.
              <br />
              Just share a little more about yourself and you are all set to use
              Journal.
            </p>
            {/* <div className="flex-center"> */}
            <Link to="/signup">
              <button
                className="btn shadow-none"
                style={{
                  borderRadius: 5,
                  backgroundColor: "#6C63FF",
                  color: "white",
                }}
              >
                Get started <span className="fa fa-arrow-right ml-2"></span>
              </button>
            </Link>
            {/* </div> */}
          </div>
          <div className="col-lg-8 col-sm">
            <img
              src={NoteIllustration}
              className="img-fluid w-100 h-100"
              style={{ marginTop: "1rem" }}
              alt="Journal"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;

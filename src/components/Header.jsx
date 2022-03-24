import React from "react";
import { Link } from "react-router-dom";

const Header = ({ username }) => {
  return (
    //Username is passed from the Home component where username is set to localStorage.getItem("user")
    <div>
      <nav
        className="navbar navbar-light bg-white shadow-sm mt-2"
        style={{ borderRadius: 10 }}
      >
        <h5 className="nav-brand mt-2 d-flex justify-content-start font-weight-bold">
          Welcome {username}!
        </h5>
        <div className="justify-content-end">
          <Link to="/profile">
            <div
              style={{
                cursor: "pointer",
                background: "#6C63FF",
                color: "white",
                width: "40px",
                height: "40px",
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
                  fontSize: 20,
                }}
              >
                {username.charAt(0).toUpperCase()}
              </h5>
            </div>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;

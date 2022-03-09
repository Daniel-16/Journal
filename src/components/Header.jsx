import React from "react";

const Header = ({ username }) => {
  return (
    <div>
      <nav className="navbar navbar-light bg-white shadow-none">
        <h4 className="nav-brand mt-2 d-flex justify-content-start font-weight-bold">
          Hello {username}!
        </h4>
        <div className="justify-content-end">
          <div
            style={{
              background: "#6C63FF",
              color: "white",
              width: "40px",
              height: "40px",
              textAlign: "center",
              padding: 7,
              borderRadius: "50%",
              /*display: "flex",
              float: "right",
              marginBottom: "2rem",
              marginTop: "10px",
              marginRight: 20,
              */
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
        </div>
      </nav>
    </div>
  );
};

export default Header;

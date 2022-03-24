import React from "react";

const Button = ({ handleButtonClick }) => {
  return (
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
      onClick={handleButtonClick}
    >
      <span className="fa fa-plus"></span>
    </button>
  );
};

export default Button;

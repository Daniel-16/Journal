import React, { useState, useEffect } from "react";
import "../Styles/style.css";
import Axios from "axios";

const Journals = ({ history }) => {
  const [title, setTitle] = useState("");
  const [textfield, setTextfield] = useState("");

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
        .then(() => {
          return;
        })
        .catch((err) => {
          localStorage.clear();
          history.push("/login");
          console.error(err);
        });
    };
    fetchData();
  }, [history]);

  //Handle state change functions
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log([title, textfield]);
    setTitle("");
    setTextfield("");
  };
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleTextfield = (e) => {
    setTextfield(e.target.value);
  };
  const cancel = () => {
    history.push("/home");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <header className="navbar navbar-light bg-white sticky-top shadow-none">
          <div className="container">
            <span
              className="fa fa-times"
              style={{
                fontSize: 30,
                color: "grey",
                cursor: "pointer",
              }}
              onClick={cancel}
            ></span>
            <button
              className="fa fa-save"
              type="submit"
              style={{
                fontSize: 30,
                color: "grey",
                cursor: "pointer",
                background: "none",
                border: "none",
                outline: "none",
              }}
            ></button>
          </div>
        </header>
        <div className="container">
          <textarea
            name="title"
            id="title"
            className="form-control"
            placeholder="Title"
            value={title}
            required
            onChange={handleTitle}
          ></textarea>
          <textarea
            name="title"
            id="textarea"
            className="form-control"
            cols="10"
            rows="19"
            placeholder="Today's journal"
            value={textfield}
            required
            onChange={handleTextfield}
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default Journals;

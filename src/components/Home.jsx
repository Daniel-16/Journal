import React, { useState, useEffect } from "react";
import AddnotesImg from "../Images/add-notes.png";
import Axios from "axios";
// import { CredentialsContext } from "../App";
import Header from "./Header";
import { MDBModal, MDBModalBody } from "mdbreact";
import "../Styles/flex.css";
// import { sort } from "fast-sort";

const Home = ({ history }) => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  // const [credentials] = useContext(CredentialsContext);
  const [username] = useState(localStorage.getItem("user"));
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loaderModal, setLoaderModal] = useState(true);
  // const [deleteModal, setDeleteModal] = useState(false);
  const toggleLoaderModal = () => {
    setLoaderModal(false);
  };
  // const toggleDeleteModal = () => {
  //   setDeleteModal(!deleteModal);
  // };
  const cardStyles = {
    display: "flex",
    flexWrap: "wrap",
  };

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
          setPrivateData(
            "Welcome! You can now add journals of your daily activities by clicking on the plus button at the bottom of your screen."
          );
        })
        .catch((err) => {
          localStorage.clear();
          history.push("/login");
          setError(
            "You are not authorized to use this route. Redirecting you to the login page"
          );
          console.error(err);
        });
    };
    Axios.get(
      `http://localhost:5000/api/auth/getJournal/${localStorage.getItem(
        "userId"
      )}`
    )
      .then((res) => {
        // res.data.journal.map((journals) => {
        //   return journals.journals.map((data) => setJournals(data));
        // });
        setJournals(res.data.journal);
        const newJournal = res.data.journal.map((data) =>
          data.journals
            .sort((a, b) => (a.dateOfCreation < b.dateOfCreation ? 1 : -1))
            .map((user) => user.dateOfCreation)
        );
        console.log(newJournal);
        console.log(res.data.journal.map((data) => data.journals));
        setLoading(false);
        setLoaderModal(false);
        toggleLoaderModal();
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
    fetchData();
  }, [history]);

  const deleteJournal = (id) => {
    Axios.delete(
      `http://localhost:5000/api/auth/deleteJournal/${localStorage.getItem(
        "userId"
      )}/${id}`
    )
      .then(() => {
        console.log("success");
        document.location.reload();
      })
      .catch(() => {
        console.error("Couldn't delete");
      });
  };

  const handleButtonClick = () => {
    history.push("/journals");
  };
  if (loading && loaderModal) {
    return (
      <MDBModal
        isOpen={loaderModal}
        toggle={toggleLoaderModal}
        size="sm"
        centered
      >
        <MDBModalBody className="text-center">
          <div className="spinner-border text-primary mt-4 mb-4"></div>
        </MDBModalBody>
      </MDBModal>
    );
  } else if (error) {
    return (
      <div className="container">
        <h3>{error}</h3>
      </div>
    );
  } else if (journals.map((data) => data.journals.length) <= 0) {
    return (
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
            onClick={handleButtonClick}
          >
            <span className="fa fa-plus"></span>
          </button>
        </div>
      </div>
    );
  } else {
    journals.map((data) =>
      data.journals
        .sort((a, b) => (a.dateOfCreaion < b.dateOfCreation ? 1 : -1))
        .map((user) => user.dateOfCreation)
    );
    return (
      <div className="container">
        <Header username={username} />
        <input
          className="form-control mt-2 shadow-none"
          placeholder="Search your journals"
          style={{ backgroundColor: "lightgrey", border: "none" }}
        />
        <p className="lead ml-3">Your Journals</p>
        <div className="row mt-2" style={cardStyles}>
          {journals.map((data) =>
            data.journals.map((user) => (
              <div className="col" key={user._id} style={{ flex: "35%" }}>
                <div
                  className="card mb-3 shadow-sm border"
                  style={{ cursor: "pointer" }}
                >
                  <div className="card-body">
                    <span
                      className="fa fa-times text-muted float-right ml-4"
                      onClick={() => {
                        deleteJournal(user._id);
                      }}
                      style={{ cursor: "pointer" }}
                    ></span>
                    <h5 className="card-title">{user.title}</h5>
                    <p className="card-text">{user.textfield}</p>
                    <small className="text-muted">
                      {new Date(user.dateOfCreation).toDateString()}
                    </small>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
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
      </div>
    );
  }
};

export default Home;

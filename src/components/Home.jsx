import React, { useState, useEffect } from "react";
import AddnotesImg from "../Images/add-notes.png";
import Axios from "axios";
// import { CredentialsContext } from "../App";
import Header from "./Header";
import { MDBModal, MDBModalBody } from "mdbreact";
import "../Styles/flex.css";
import UserJournals from "./UserJournals";
import Button from "./Button";

const Home = ({ history }) => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  // const [credentials] = useContext(CredentialsContext);
  const [username] = useState(localStorage.getItem("user"));
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loaderModal, setLoaderModal] = useState(true);
  const [search, setSearch] = useState("");
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
        setJournals(res.data.journal);
        res.data.journal.map((data) =>
          data.journals
            .sort((a, b) => (a.dateOfCreation < b.dateOfCreation ? -1 : -1))
            .map((user) => user.dateOfCreation)
        );
        // console.log(newJournal);
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
          <Button handleButtonClick={handleButtonClick} />
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
        <span
          className="fa fa-search text-muted"
          style={{ position: "relative", top: 39, left: 10 }}
        ></span>
        <input
          className="form-control mt-2 shadow-none"
          placeholder="Search your journals"
          style={{
            backgroundColor: "lightgrey",
            border: "none",
            borderRadius: 10,
          }}
          type="search"
          id="searchInput"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <p className="lead ml-3">Your Journals</p>
        <UserJournals
          journals={journals}
          search={search}
          deleteJournal={deleteJournal}
          cardStyles={cardStyles}
        />
        <Button handleButtonClick={handleButtonClick} />
      </div>
    );
  }
};

export default Home;

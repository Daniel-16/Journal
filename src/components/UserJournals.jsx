import React from "react";
import { Link } from "react-router-dom";

const UserJournals = ({ journals, search, deleteJournal, cardStyles }) => {
  return (
    <div className="row mt-2" style={cardStyles}>
      {journals.map((data) =>
        data.journals
          .filter((journal) => {
            if (search === "") {
              return true;
            } else if (
              journal.title.toLowerCase().includes(search.toLowerCase())
            ) {
              return true;
            }
            return false;
          })
          .map((user) => (
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
                  <Link to="/updatejournal">
                    <h5 className="card-title" style={{ color: "#283739" }}>
                      {user.title}
                    </h5>
                    <p className="card-text">{user.textfield}</p>
                    <small className="text-muted">
                      {new Date(user.dateOfCreation).toDateString()}
                    </small>
                  </Link>
                </div>
              </div>
            </div>
          ))
      )}
    </div>
  );
};

export default UserJournals;

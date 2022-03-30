import React from "react";
import { Link } from "react-router-dom";

const ReportProblem = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div>
      <div className="jumbotron shadow-none bg-secondary text-white">
        <h1 className="text-center">Report a Problem</h1>
        <p className="text-center">
          Encountered a bug while using our platform? Describe your problem to
          tech support in the email link provided below.
        </p>
      </div>
      <div className="container">
        <h3 className="text-center">
          <i className="fa fa-phone-square mr-2"></i>Contact Support
        </h3>
        <hr />
        <p className="text-center">
          Email support team by clicking on the link{" "}
          <a href="mailto:journalwebapp19@gmail.com">Support team</a>
        </p>
        {/* <h3 className="text-center">Describe your problem</h3> */}
        {/* Todo: Create an describe problem field */}
      </div>
      <footer
        style={{ backgroundColor: "lightgrey", textAlign: "center" }}
        className="fixed-bottom"
      >
        <small className="text-center">&copy; All rights reserved</small>
        <br />
        <small>
          <Link
            to="/privaypolicy"
            className="text-dark"
            style={{ textDecoration: "underline" }}
          >
            Privacy Policy
          </Link>
        </small>
        <br />
        <small>{year} Journals</small>
      </footer>
    </div>
  );
};

export default ReportProblem;

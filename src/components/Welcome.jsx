import React from "react";
import NoteIllustration from "../Images/note-illustration.png";
import { Link } from "react-router-dom";
import Navbar from "./Nav";

const Welcome = () => {
  return (
    <div>
      <Navbar />
      <div className="jumbotron" style={{ marginTop: "0rem" }}>
        <div className="row">
          <div className="col-md">
            <img
              src={NoteIllustration}
              className="img-fluid"
              alt="Illustration"
            />
          </div>
          <div className="col-md">
            <h4 className="text-center">Welcome to Journal</h4>
            <hr />
            <p className="text-center">
              Journal is a web app to help you keep your thoughts orgranized
              thereby also making your thoughts apprehensible.
              <br />
              Journals is also here to help you record your ideas on the go.
            </p>
            <div className="text-center">
              <Link to="/home">
                <button
                  className="btn btn-sm shadow-none"
                  style={{
                    borderRadius: 5,
                    backgroundColor: "#6C63FF",
                    color: "white",
                    textTransform: "none",
                    fontSize: 17,
                  }}
                >
                  Get started <span className="fa fa-arrow-right ml-2"></span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <h4 className="text-center">Why Journal?</h4>
        <hr />
        <div className="row">
          <div className="col-sm">
            <p>
              Having Journals has been proven to help increase our productivity.
              But we do not carry our Journals (book, diary) with us everywhere
              but we do carry our phones so we get to now document our daily
              activities on the go.
            </p>
          </div>
          <div className="col-sm">
            <p>
              Journals is also here to help you easily keep track of your daily
              actvities. You get to search for particular journals and you have
              the power to also edit your journals.
            </p>
          </div>
        </div>
        <h4 className="text-center">Benefits of Journal</h4>
        <hr />
        <p>
          Journal is here to help you; Keep your thoughts organized, Improve
          your writing, Set & achieve your goals, Keep record of your memories,
          Inspire creativity and many more.
          <br />
          Journals created are protected with end-to-end encryption to prevent
          third parties from having access to your privacy.
          <br />
          Now that you know why you need a journal, why not create an account or
          log in to{" "}
          <Link to="/home">
            Get Started <span className="fa fa-arrow-right ml-2"></span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Welcome;

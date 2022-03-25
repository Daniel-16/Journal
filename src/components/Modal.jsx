import React from "react";
import { MDBModal, MDBModalBody, MDBModalFooter } from "mdbreact";

const Modal = ({ deleteModal, toggleDeleteModal, deleteAccount }) => {
  return (
    <MDBModal
      isOpen={deleteModal}
      toggle={toggleDeleteModal}
      size="sm"
      centered
    >
      <h5 className="modal-header text-center">Delete Account</h5>
      <MDBModalBody className="text-center">
        Are you sure you want to delete this account?
      </MDBModalBody>
      <div className="flex-center">
        <MDBModalFooter>
          <button
            className="btn btn-danger btn-sm"
            onClick={deleteAccount}
            style={{ textTransform: "none", fontSize: 13 }}
          >
            Yes
          </button>
          <button
            className="btn btn-sm"
            onClick={toggleDeleteModal}
            style={{
              backgroundColor: "#6C63FF",
              color: "white",
              textTransform: "none",
              fontSize: 13,
            }}
          >
            No
          </button>
        </MDBModalFooter>
      </div>
    </MDBModal>
  );
};

export default Modal;

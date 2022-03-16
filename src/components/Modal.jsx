import React from "react";
import { MDBModal, MDBModalBody, MDBModalFooter } from "mdbreact";

const Modal = ({ toggleDeleteModal, deleteModal, deleteJournal }) => {
  return (
    <MDBModal
      isOpen={deleteModal}
      toggle={toggleDeleteModal}
      size="sm"
      centered
    >
      <h5 className="modal-header text-center">Delete Journal</h5>
      <MDBModalBody className="text-center">
        Are you sure you want to delete this journal?
      </MDBModalBody>
      <div className="flex-center">
        <MDBModalFooter>
          <button className="btn btn-danger btn-sm" onClick={deleteJournal()}>
            Yes
          </button>
          <button
            className="btn btn-sm"
            onClick={toggleDeleteModal}
            style={{ backgroundColor: "#6C63FF", color: "white" }}
          >
            No
          </button>
        </MDBModalFooter>
      </div>
    </MDBModal>
  );
};

export default Modal;

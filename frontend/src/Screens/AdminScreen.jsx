import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import AuthorAdmin from "../Components/Admin/AuthorAdmin";
import FeedbackAdmin from "../Components/Admin/FeedbackAdmin";
import GenreAdmin from "../Components/Admin/GenreAdmin";
import BookAdmin from "../Components/Admin/BookAdmin";
import InteractionAdmin from "../Components/Admin/InteractionAdmin";

function AdminScreen() {
  const [showAuthorAdmin, setShowAuthorAdmin] = useState(false);
  const [showFeedbackAdmin, setShowFeedbackAdmin] = useState(false);
  const [showGenreAdmin, setShowGenreAdmin] = useState(false);
  const [showBookAdmin, setShowBookAdmin] = useState(false);
  const [showInteractionAdmin, setShowInteractionAdmin] = useState(false);

  const handleClose = (setter) => {
    setter(false);
  };

  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    margin: "5px",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <div className="container mt-5 d-flex flex-column align-items-center">
      <h1 className="mb-4">Admin Screen</h1>
      <div className="d-flex flex-wrap">
        <Button
          style={{
            ...buttonStyle,
            backgroundColor: showInteractionAdmin
              ? "#28a745"
              : buttonStyle.backgroundColor,
          }}
          onClick={() => setShowInteractionAdmin(!showInteractionAdmin)}
          className="me-3 mb-3"
        >
          {showInteractionAdmin ? "Hide Interaction Admin" : "Show Interaction Admin"}
        </Button>

        <Button
          style={{
            ...buttonStyle,
            backgroundColor: showAuthorAdmin
              ? "#28a745"
              : buttonStyle.backgroundColor,
          }}
          onClick={() => setShowAuthorAdmin(!showAuthorAdmin)}
          className="me-3 mb-3"
        >
          {showAuthorAdmin ? "Hide Author Admin" : "Show Author Admin"}
        </Button>

        <Button
          style={{
            ...buttonStyle,
            backgroundColor: showGenreAdmin
              ? "#28a745"
              : buttonStyle.backgroundColor,
          }}
          onClick={() => setShowGenreAdmin(!showGenreAdmin)}
          className="me-3 mb-3"
        >
          {showGenreAdmin ? "Hide Genre Admin" : "Show Genre Admin"}
        </Button>

        <Button
          style={{
            ...buttonStyle,
            backgroundColor: showBookAdmin
              ? "#28a745"
              : buttonStyle.backgroundColor,
          }}
          onClick={() => setShowBookAdmin(!showBookAdmin)}
          className="me-3 mb-3"
        >
          {showBookAdmin ? "Hide Book Admin" : "Show Book Admin"}
        </Button>

        <Button
          style={{
            ...buttonStyle,
            backgroundColor: showFeedbackAdmin
              ? "#28a745"
              : buttonStyle.backgroundColor,
          }}
          onClick={() => setShowFeedbackAdmin(!showFeedbackAdmin)}
          className="mb-3"
        >
          {showFeedbackAdmin ? "Hide Feedback Admin" : "Show Feedback Admin"}
        </Button>
      </div>

      <Modal
        show={showInteractionAdmin}
        onHide={() => handleClose(setShowInteractionAdmin)}
        dialogClassName="modal-xl"
      >
        <Modal.Header closeButton style={{ textTransform: "uppercase" }}>
          <Modal.Title>Interaction Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InteractionAdmin />
        </Modal.Body>
      </Modal>

      <Modal
        show={showAuthorAdmin}
        onHide={() => handleClose(setShowAuthorAdmin)}
        dialogClassName="modal-md"
      >
        <Modal.Header closeButton style={{ textTransform: "uppercase" }}>
          <Modal.Title>Author Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AuthorAdmin />
        </Modal.Body>
      </Modal>

      <Modal
        show={showGenreAdmin}
        onHide={() => handleClose(setShowGenreAdmin)}
        dialogClassName="modal-md"
      >
        <Modal.Header closeButton style={{ textTransform: "uppercase" }}>
          <Modal.Title>Genre Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <GenreAdmin />
        </Modal.Body>
      </Modal>

      <Modal
        show={showBookAdmin}
        onHide={() => handleClose(setShowBookAdmin)}
        dialogClassName="modal-lg"
      >
        <Modal.Header closeButton style={{ textTransform: "uppercase" }}>
          <Modal.Title>Book Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BookAdmin />
        </Modal.Body>
      </Modal>

      <Modal
        show={showFeedbackAdmin}
        onHide={() => handleClose(setShowFeedbackAdmin)}
        dialogClassName="modal-md"
      >
        <Modal.Header closeButton style={{ textTransform: "uppercase" }}>
          <Modal.Title>Feedback Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FeedbackAdmin />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AdminScreen;

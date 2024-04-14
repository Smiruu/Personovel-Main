import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaUser, FaComment, FaTags, FaBook, FaCog, FaHistory } from "react-icons/fa"; // Import icons
import AuthorAdmin from "../Components/Admin/AuthorAdmin";
import FeedbackAdmin from "../Components/Admin/FeedbackAdmin";
import GenreAdmin from "../Components/Admin/GenreAdmin";
import BookAdmin from "../Components/Admin/BookAdmin";
import InteractionAdmin from "../Components/Admin/InteractionAdmin";
import LogList from "../Components/LogList";

function AdminScreen() {
  const [showAuthorAdmin, setShowAuthorAdmin] = useState(false);
  const [showFeedbackAdmin, setShowFeedbackAdmin] = useState(false);
  const [showGenreAdmin, setShowGenreAdmin] = useState(false);
  const [showBookAdmin, setShowBookAdmin] = useState(false);
  const [showInteractionAdmin, setShowInteractionAdmin] = useState(false);
  const [showLogHistory, setShowLogHistory] = useState(false);

  const handleClose = (setter) => {
    setter(false);
  };

  const buttonStyle = {
    backgroundColor: "#BC1823",
    color: "white",
    border: "none",
    padding: "10px 20px",
    margin: "5px",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const headingStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
    fontSize: "3rem",
  };
  return (
    <div className="container mt-2">
      <h1 style={headingStyle}>
        <FaCog className="me-2" /> Admin Screen
      </h1>
      <div className="d-flex flex-wrap justify-content-center">
        <Button
          style={{
            ...buttonStyle,
            backgroundColor: showInteractionAdmin ? "#BC1823" : "#002960",
          }}
          onClick={() => setShowInteractionAdmin(!showInteractionAdmin)}
          className="me-3 mb-3"
        >
          {showInteractionAdmin ? (
            <FaCog className="me-2" />
          ) : (
            <FaCog className="me-2" />
          )}
          {showInteractionAdmin
            ? "Hide Interaction Admin"
            : "Show Interaction Admin"}
        </Button>

        <Button
          style={{
            ...buttonStyle,
            backgroundColor: showAuthorAdmin ? "#BC1823" : "#002960",
          }}
          onClick={() => setShowAuthorAdmin(!showAuthorAdmin)}
          className="me-3 mb-3"
        >
          {showAuthorAdmin ? (
            <FaUser className="me-2" />
          ) : (
            <FaUser className="me-2" />
          )}
          {showAuthorAdmin ? "Hide Author Admin" : "Show Author Admin"}
        </Button>

        <Button
          style={{
            ...buttonStyle,
            backgroundColor: showGenreAdmin ? "#BC1823" : "#002960",
          }}
          onClick={() => setShowGenreAdmin(!showGenreAdmin)}
          className="me-3 mb-3"
        >
          {showGenreAdmin ? (
            <FaTags className="me-2" />
          ) : (
            <FaTags className="me-2" />
          )}
          {showGenreAdmin ? "Hide Genre Admin" : "Show Genre Admin"}
        </Button>

        <Button
          style={{
            ...buttonStyle,
            backgroundColor: showBookAdmin ? "#BC1823" : "#002960",
          }}
          onClick={() => setShowBookAdmin(!showBookAdmin)}
          className="me-3 mb-3"
        >
          {showBookAdmin ? (
            <FaBook className="me-2" />
          ) : (
            <FaBook className="me-2" />
          )}
          {showBookAdmin ? "Hide Book Admin" : "Show Book Admin"}
        </Button>

        <Button
          style={{
            ...buttonStyle,
            backgroundColor: showFeedbackAdmin ? "#BC1823" : "#002960",
          }}
          onClick={() => setShowFeedbackAdmin(!showFeedbackAdmin)}
          className="mb-3"
        >
          {showFeedbackAdmin ? (
            <FaComment className="me-2" />
          ) : (
            <FaComment className="me-2" />
          )}
          {showFeedbackAdmin ? "Hide Feedback Admin" : "Show Feedback Admin"}
        </Button>

        <Button
          style={{
            ...buttonStyle,
            backgroundColor: showLogHistory ? "#BC1823" : "#002960",
          }}
          onClick={() => setShowLogHistory(!showLogHistory)}
          className="mb-3"
        >
          {showLogHistory ? (
            <FaHistory className="me-2" />
          ) : (
            <FaHistory className="me-2" />
          )}
          {showLogHistory ? "Hide Log History" : "Show Log HIstory"}
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

      <Modal
        show={showLogHistory}
        onHide={() => handleClose(setShowLogHistory)}
        dialogClassName="modal-md"
      >
        <Modal.Header closeButton style={{ textTransform: "uppercase" }}>
          <Modal.Title>Log History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LogList />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AdminScreen;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeedbacks, deleteFeedback } from "../../actions/feedbackActions";
import { Modal, Button } from "react-bootstrap";
import LogCreate from "../../Components/LogCreate";
const FeedbackAdmin = () => {
  const dispatch = useDispatch();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [feedbackToDelete, setFeedbackToDelete] = useState(null);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);
  const [showLogCreate, setShowLogCreate] = useState(false);
  const [isLogCreateCompleted, setIsLogCreateCompleted] = useState(false);

  const feedbackList = useSelector((state) => state.feedbackList);
  const { loading, error, feedbacks } = feedbackList;

  useEffect(() => {
    dispatch(fetchFeedbacks());
  }, [dispatch]);

  const handleDeleteConfirmation = (id) => {
    setSelectedFeedbackId(id);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteFeedback(selectedFeedbackId))
      .then(() => {
        dispatch(fetchFeedbacks());
        handleShowLogCreate();
      })
      .catch((error) => console.error("Error deleting feedback:", error));
    setShowConfirmation(false);
    setSelectedFeedbackId(null);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
    setSelectedFeedbackId(null);
  };

  const handleShowLogCreate = () => {
    setIsLogCreateCompleted(false);
    setShowLogCreate(true);
  };

  return (
    <div>
      <h1 className="mb-4">Submitted Feedback</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          {feedbacks
            .slice()
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .map((feedback) => (
              <div key={feedback.id} className="mb-3 p-3 border rounded">
                <p>
                  <strong>Email:</strong> {feedback.email}
                </p>
                <p>
                  <strong>Subject:</strong> {feedback.subject}
                </p>
                <p>
                  <strong>Concern:</strong> {feedback.concern}
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(feedback.created_at).toLocaleString()}
                </p>{" "}
                <Button
                  variant="primary"
                  onClick={() => handleDeleteConfirmation(feedback.id)}
                >
                  Delete
                </Button>
              </div>
            ))}
        </div>
      )}

      <Modal show={showConfirmation} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this feedback?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            No
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showLogCreate && !isLogCreateCompleted}
        onHide={() => setShowLogCreate(false)}
        centered
      >
        <Modal.Header>
          <Modal.Title className="text-center">LOG</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10%",
          }}
        >
          <LogCreate onClose={() => setIsLogCreateCompleted(true)} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default FeedbackAdmin;

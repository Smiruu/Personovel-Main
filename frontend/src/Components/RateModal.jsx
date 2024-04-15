import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import {
  createRating,
  updateRating,
  getRatingId,
  deleteRating,
} from "../actions/ratingActions";
import { useDispatch, useSelector } from "react-redux";

const RateModal = ({ show, handleClose, bookId, userId }) => {
  const dispatch = useDispatch();

  const ratingId = localStorage.getItem("ratingId");

  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (!show) {
      setRating(0);
    }
  }, [show]);

  useEffect(() => {
    const fetchRatingId = () => {
      try {
        dispatch(getRatingId(userId, bookId));
      } catch (error) {
        console.error("Error fetching rating ID:", error);
      }
    };

    if (show) {
      fetchRatingId();
    }
  }, [dispatch, show, userId, bookId]);

  useEffect(() => {
    if (!ratingId) {
      setRating(0);
    }
  }, [ratingId]);

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleRateSubmit = () => {
    const ratingData = {
      book: bookId,
      rating: rating,
      user: userId,
    };

    console.log("Rating ID in handleRateSubmit:", ratingId);

    try {
      dispatch(createRating(ratingData));
      window.location.reload();
      handleClose();
    } catch (error) {
      console.error("Error creating rating:", error);
    }
  };

  const handleUpdateRating = () => {
    const updateData = {
      rating: rating,
    };

    console.log("Data being dispatched in updateRating:", updateData);

    dispatch(updateRating(ratingId, updateData));
    handleClose();
    window.location.reload();
  };

  const handleDeleteRating = () => {
    try {
      dispatch(deleteRating(ratingId));
      localStorage.removeItem("ratingId");
      handleClose();
      window.location.reload();
    } catch (error) {
      console.error("Error deleting rating:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Rate</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-center">Rate your experience with this book here.</p>
        <Row className="justify-content-center">
          Your Rating:
          <Col xs="auto">
            <div className="rating">
              {[1, 2, 3, 4, 5].map((index) => (
                <span
                  key={index}
                  onClick={() => handleStarClick(index)}
                  style={{ cursor: "pointer", color: "#ffc107" }}
                >
                  <i
                    className={index <= rating ? "fas fa-star" : "far fa-star"}
                  ></i>
                </span>
              ))}
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {ratingId && (
          <>
            <Button variant="info" onClick={handleUpdateRating}>
              Update Rating
            </Button>
            <Button variant="danger" onClick={handleDeleteRating}>
              Delete Rating
            </Button>
          </>
        )}
        {!ratingId && rating !== 0 && (
          <Button variant="primary" onClick={handleRateSubmit}>
            Submit Rating
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default RateModal;

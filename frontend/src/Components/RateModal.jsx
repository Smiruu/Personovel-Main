import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { createRating, updateRating, getRatingId, deleteRating } from "../actions/ratingActions"; // Import deleteRating action
import { useDispatch, useSelector } from "react-redux";

const RateModal = ({ show, handleClose, bookId, userId }) => {
    const dispatch = useDispatch();
    const createRatingState = useSelector((state) => state.createRating); // Get createRating state from Redux store
    const getRatingIdState = useSelector((state) => state.getRatingId); // Get getRatingId state from Redux store
    const { error } = createRatingState;
    const { ratingId } = getRatingIdState; // Extract ratingId from the getRatingId state
  
    const [rating, setRating] = useState(0);
  
    // Reset rating when modal is closed
    useEffect(() => {
      if (!show) {
        setRating(0);
      }
    }, [show]);
  
    // Effect to fetch ratingId when the modal is opened
    useEffect(() => {
      const fetchRatingId = async () => {
        try {
          // Dispatch the action and await its completion
          await dispatch(getRatingId(userId, bookId));
        } catch (error) {
          console.error("Error fetching rating ID:", error);
        }
      };
  
      // If the modal is shown, fetch the ratingId
      if (show) {
        fetchRatingId();
      }
    }, [dispatch, getRatingId, show, userId, bookId]);
  
    // Effect to update ratingId state when it changes in the Redux store
    useEffect(() => {
      // If ratingId exists in the Redux store, update the local state
      if (ratingId) {
        // Do something with ratingId if needed
        console.log("Rating ID:", ratingId); // Log the ratingId value
      } else {
        console.error("Rating ID not found in Redux store");
        setRating(0); // Reset the rating value to 0 if no ratingId exists
      }
    }, [ratingId]);
  
    const handleStarClick = (value) => {
      setRating(value);
    };
  
    const handleRateSubmit = async () => {
      // Prevent submission if rating is 0
      if (rating === 0) {
        console.error("Rating cannot be 0.");
        return;
      }

      // Create rating data object
      const ratingData = {
        book: bookId,
        rating: rating,
        user: userId,
      };

      console.log("Rating ID in handleRateSubmit:", ratingId); // Log the ratingId value

      try {
        // Check if ratingId exists
        if (!ratingId) {
          // If ratingId doesn't exist, fetch it first
          await dispatch(getRatingId(userId, bookId));
        }
        console.log("Rating ID after fetching:", ratingId); // Log the ratingId value after fetching
        // Dispatch createRating action
        await dispatch(createRating(ratingData));
        handleClose(); // Close modal after rating submission
      } catch (error) {
        console.error("Error creating rating:", error);
      }
    };

    const handleUpdateRating = async () => {
        // Data to be dispatched in updateRating action
        const updateData = {
          rating: rating
        };
      
        console.log("Data being dispatched in updateRating:", updateData);
        
        // Dispatch the updateRating action with the updateData
        await dispatch(updateRating(ratingId, updateData));
        handleClose(); // Close modal after rating update
        window.location.reload(); // Reload the page
      };

    const handleDeleteRating = async () => {
      try {
        await dispatch(deleteRating(ratingId)); // Dispatch deleteRating action
        handleClose(); // Close modal after rating deletion
        window.location.reload(); // Reload the page after deleting rating
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
          <p className="text-center">
            Rate your experience with this book here.
          </p>
          <Row className="justify-content-center">
            Your Rating:
            <Col xs="auto">
              <div className="rating">
                {[1, 2, 3, 4, 5].map((index) => (
                  <span
                    key={index}
                    onClick={() => handleStarClick(index)}
                    style={{ cursor: "pointer", color: "#ffc107" }} // Yellow color for stars
                  >
                    <i
                      className={
                        index <= rating
                          ? "fas fa-star"
                          : "far fa-star"
                      }
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

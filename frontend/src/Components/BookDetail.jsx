import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listBookDetails } from "../actions/bookActions";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { useParams } from "react-router-dom";
import { Button, Container, Row, Col, Modal } from "react-bootstrap"; // Import Modal component
import { Link, useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import {
  createRating,
  deleteRating,
  getRatingId,
  updateRating,
  retrieveRating
} from "../actions/ratingActions";

function BookDetail() {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [book, setBook] = useState({});
  const [rating, setRating] = useState(0);
  const [showModal, setShowModal] = useState(false); // State for showing/hiding the modal
  const userLoginInfo = useSelector((state) => state.userLogin.userInfo);
  const userRegisterInfo = useSelector((state) => state.userRegister.userInfo);
  const userInfo = userLoginInfo || userRegisterInfo;
  const user = userInfo ? userInfo.token.id : null;
  const [showSubmitButton, setShowSubmitButton] = useState(false);

  useEffect(() => {
    dispatch(listBookDetails(_id));
  }, [dispatch, _id]);

  const bookDetails = useSelector((state) => state.bookDetails);
  const { loading, error } = bookDetails || {};

  useEffect(() => {
    if (!loading && !error) {
      setBook(bookDetails.book);
      setRating(bookDetails.book.rating);
    }
  }, [bookDetails, loading, error]);

  useEffect(() => {
    // Check if user has already rated the book
    const checkUserRating = async () => {
      try {
        await dispatch(getRatingId(user, _id));
        const ratingId = localStorage.getItem("ratingId");
        console.log("Rating ID:", ratingId);
        // Dispatch action to retrieve user's rating
        await dispatch(retrieveRating(ratingId)); 
        const response = localStorage.getItem("CurrentRating") // Assuming ratingId is correctly obtained
        if (response) {
          // If user has rated the book, enable submit button and set rating
          setShowSubmitButton(true);
          const parsedRating = parseInt(response); // Parse the rating as an integer
          setRating(parsedRating);
          console.log(parsedRating); // Check if rating is correctly obtained
        } else {
          // If user has not rated the book, disable submit button
          setShowSubmitButton(false);
        }
      } catch (error) {
        console.error("Error fetching user's rating:", error);
      }
    };

    if (user && _id) {
      checkUserRating();
    }
  }, [dispatch, user, _id]);

  const handleReadNow = () => {
    navigate(`/chapters/${_id}`);
  };

  const handleCreateRating = async () => {
    if (rating > 0) { // Check if rating is greater than 0
      try {
        // Check if the user has already rated the book
        await dispatch(getRatingId(user, _id));
        const ratingId = localStorage.getItem("ratingId");
        console.log("Rating ID:", ratingId);
  
        if (ratingId) {
          // If user has already rated the book, update the rating
          await dispatch(updateRating(ratingId, { rating }));
        } else {
          // If user has not rated the book, create a new rating
          await dispatch(createRating({ user, book: _id, rating }));
        }
        setShowModal(false); // Close the modal after rating is created/updated
      } catch (error) {
        console.error("Error creating/updating rating:", error);
      }
    }
  };

  const handleDeleteRating = async () => {
    try {
      // Dispatch action to get rating ID
      await dispatch(getRatingId(user, _id));
      const ratingId = localStorage.getItem("ratingId");
      console.log("Rating ID:", ratingId);
  
      // If rating ID is retrieved successfully, dispatch action to delete rating
      if (ratingId) {
        await dispatch(deleteRating(ratingId));
        localStorage.removeItem("ratingId"); // Remove rating ID from local storage
        setRating(0); // Reset the rating to 0 after deletion
        setShowSubmitButton(false); // Disable the submit button
        setShowModal(false); // Close the modal after rating is deleted
      } else {
        console.error("Rating ID not found");
      }
    } catch (error) {
      console.error("Error deleting rating:", error);
    }
  };

  const renderStarStaticRating = (value) => {
    const stars = [];
    const roundedRating = Math.round(value); // Round the rating to the nearest integer
    for (let i = 0; i < 5; i++) {
      if (i < roundedRating) {
        stars.push(
          <i key={i} className="fas fa-star" style={{ color: "gold" }}></i>
        );
      } else {
        stars.push(
          <i key={i} className="far fa-star" style={{ color: "gold" }}></i>
        );
      }
    }
    return stars;
  };
  const renderStarRating = () => {
    const stars = [];
    const roundedRating = Math.round(rating); // Round the rating to the nearest integer
    for (let i = 0; i < 5; i++) {
      if (i < roundedRating) {
        stars.push(
          <i
            key={i}
            className="fas fa-star"
            style={{ color: "gold", cursor: "pointer" }}
            onClick={() => {
              setRating(i + 1); // Update rating state when a star is clicked
              setShowSubmitButton(i + 1 > 0); // Update button's disabled state
            }}
          ></i>
        );
      } else {
        stars.push(
          <i
            key={i}
            className="far fa-star"
            style={{ color: "gold", cursor: "pointer" }}
            onClick={() => {
              setRating(i + 1); // Update rating state when a star is clicked
              setShowSubmitButton(i + 1 > 0); // Update button's disabled state
            }}
          ></i>
        );
      }
    }
    return stars;
  };

  return (
    <Container fluid>
      <Row className="mt-5 mb-5 h-full w-full">
        <Col md={6} style={{ margin: "0", padding: "0" }}>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Card.Img src={book.image} alt={book.title} fluid />
          )}
        </Col>

        <Col md={5} style={{ backgroundColor: "#FCD5CE" }}>
          <Link
            to="/"
            className="close-button mt-3"
            style={{
              float: "right",
              padding: "1% 2% 1% 2%",
              border: "2px solid #6F1D1B",
              borderColor: "#6F1D1B",
              position: "relative",
            }}
          >
            <i className="fas fa-times" style={{ color: "#6F1D1B" }}></i>
          </Link>

          <h4
            className="mt-4"
            style={{
              textAlign: "left",
              marginLeft: "3%",
              fontFamily: "Protest Guerrilla",
              fontWeight: "1",
              fontSize: "45px",
              color: "#6F1D1B",
            }}
          >
            {book?.title?.toUpperCase()}
          </h4>

          <h5
            className="mt-3"
            style={{
              textAlign: "left",
              marginLeft: "3%",
              fontSize: "25px",
              color: "#6F1D1B",
              marginBottom: "5px",
            }}
          >
            <strong style={{ fontFamily: "Blinker" }}>AUTHOR: </strong>
            <span
              style={{
                fontStyle: "italic",
                fontFamily: "Blinker",
                fontWeight: "1",
              }}
            >
              {book?.author?.toUpperCase()}
            </span>
          </h5>

          <h5
            style={{
              textAlign: "left",
              marginLeft: "3%",
              fontSize: "25px",
              color: "#6F1D1B",
              marginBottom: "5px",
            }}
          >
            <strong style={{ fontFamily: "Blinker" }}>GENRE: </strong>
            <span
              style={{
                fontStyle: "italic",
                fontFamily: "Blinker",
                fontWeight: "1",
              }}
            >
              {book?.genre?.toUpperCase()}
            </span>
          </h5>
          <h5
            style={{
              textAlign: "left",
              marginLeft: "3%",
              fontSize: "25px",
              color: "#6F1D1B",
              marginBottom: "5px",
            }}
          >
            <strong style={{ fontFamily: "Blinker" }}>RATING: </strong>
            {renderStarStaticRating(book.rating)}
          </h5>
          <h5
            style={{
              textAlign: "left",
              marginLeft: "3%",
              fontSize: "25px",
              color: "#6F1D1B",
              marginBottom: "5px",
            }}
          >
            <strong style={{ fontFamily: "Blinker" }}>LANGUAGE: </strong>
            <span
              style={{
                fontStyle: "italic",
                fontFamily: "Blinker",
                fontWeight: "1",
              }}
            >
              {book?.language?.toUpperCase()}
            </span>
          </h5>

          <h5
            style={{
              textAlign: "left",
              marginLeft: "3%",
              fontSize: "25px",
              color: "#6F1D1B",
              marginBottom: "5px",
            }}
          >
            <strong style={{ fontFamily: "Blinker" }}>SYNOPSIS: </strong>
            <p
              className="mt-2"
              style={{
                fontStyle: "italic",
                fontFamily: "Blinker",
                fontWeight: "1",
              }}
            >
              {book.synopsis}
            </p>
          </h5>

          <Button
            className="btn-block customButton mt-3"
            type="button"
            style={{
              fontWeight: "1",
              fontSize: "30px",
              color: "white",
              fontFamily: "Protest Guerrilla",
              borderRadius: "50px",
              backgroundColor: "#6F1D1B",
            }}
            onClick={handleReadNow}
          >
            READ NOW!
          </Button>

          <Button
            className="customButton"
            type="button"
            style={{
              width: "100%",
              fontWeight: "1",
              fontSize: "20px",
              color: "white",
              fontFamily: "Protest Guerrilla",
              borderRadius: "50px",
              backgroundColor: "#6F1D1B",
            }}
            onClick={() => setShowModal(true)} // Open the modal
          >
            Manage Rating
          </Button>
        </Col>
      </Row>

      {/* Rating Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Manage Rating</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>
            <strong style={{ fontFamily: "Blinker" }}>RATING: </strong>
            {renderStarRating()}
          </h5>

          <div className="d-flex justify-content-between mt-3">
          <Button
  className="customButton"
  type="button"
  style={{
    width: "45%",
    fontWeight: "1",
    fontSize: "20px",
    color: "white",
    fontFamily: "Protest Guerrilla",
    borderRadius: "50px",
    backgroundColor: "#6F1D1B",
    opacity: showSubmitButton ? 1 : 0.6,
    cursor: showSubmitButton ? "pointer" : "not-allowed",
  }}
  onClick={handleCreateRating}
  disabled={!showSubmitButton}
>
  Submit Rating
</Button>
            <Button
              className="customButton"
              type="button"
              style={{
                width: "45%",
                fontWeight: "1",
                fontSize: "20px",
                color: "white",
                fontFamily: "Protest Guerrilla",
                borderRadius: "50px",
                backgroundColor: "#6F1D1B",
              }}
              onClick={handleDeleteRating} // Call handleDeleteRating function on button click
            >
              Delete Rating
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default BookDetail;

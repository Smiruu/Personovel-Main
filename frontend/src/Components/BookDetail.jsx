import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listBookDetails } from "../actions/bookActions";
import { fetchMeanRatings, retrieveRating } from "../actions/ratingActions";
import { getRatingId } from "../actions/ratingActions";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { useParams } from "react-router-dom";
import { Button, Container, Row, Col, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import RateModal from "./RateModal";

function BookDetail() {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [book, setBook] = useState({});
  const [meanRating, setMeanRating] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [ratingId, setRatingId] = useState(localStorage.getItem("ratingId"));

  const userLoginInfo = useSelector((state) => state.userLogin.userInfo);
  const userRegisterInfo = useSelector((state) => state.userRegister.userInfo);
  const userInfo = userLoginInfo || userRegisterInfo;
  const userId = userInfo?.token?.id ?? null;

  const bookDetails = useSelector((state) => state.bookDetails);
  const { loading, error, book: bookData } = bookDetails || {};

  const fetchedMeanRating = useSelector(
    (state) => state.fetchMeanRatings.ratings.meanRating
  );
  const numReviews = useSelector(
    (state) => state.fetchMeanRatings.ratings.numReviews
  );

  const userRating = useSelector((state) => state.fetchRating.userRating);

  useEffect(() => {
    if (!loading && !error) {
      setBook(bookData);
    }
  }, [bookData, loading, error]);

  useEffect(() => {
    if (fetchedMeanRating !== null) {
      setMeanRating(fetchedMeanRating);
    }
  }, [fetchedMeanRating]);

  useEffect(() => {
    dispatch(listBookDetails(_id));
    dispatch(fetchMeanRatings(_id));
    if (userInfo) {
      dispatch(getRatingId(userId, _id));
    }
  }, [dispatch, _id, userId, userInfo]);

  useEffect(() => {
    const storedRatingId = localStorage.getItem("ratingId");
    if (storedRatingId) {
      setRatingId(storedRatingId);
      dispatch(retrieveRating(storedRatingId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (ratingId) {
      dispatch(retrieveRating(ratingId));
    }
  }, [dispatch, ratingId]);

  useEffect(() => {
    if (!ratingId) {
      dispatch({ type: "SET_USER_RATING", payload: 0 });
    }
  }, [dispatch, ratingId]);

  useEffect(() => {
    return () => {
      localStorage.removeItem("ratingId");
      localStorage.removeItem("userRating");
    };
  }, []);

  const handleReadNow = () => {
    navigate(`/chapters/${_id}`);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
              marginBottom: "15px",
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
              marginBottom: "15px",
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
              marginBottom: "15px",
            }}
          >
            <strong style={{ fontFamily: "Blinker" }}>RATING: </strong>
            <span
              style={{
                fontStyle: "italic",
                fontFamily: "Blinker",
                fontWeight: "1",
              }}
            >
              <Rating
                value={meanRating}
                text={numReviews + " reviews"}
                color="#f8e825"
              />
            </span>
          </h5>

          <h5
            style={{
              textAlign: "left",
              marginLeft: "3%",
              fontSize: "25px",
              color: "#6F1D1B",
              marginBottom: "15px",
            }}
          >
            <strong style={{ fontFamily: "Blinker" }}>USER RATINGS: </strong>
            <Rating value={userRating} color="#f8e825" />
          </h5>

          <h5
            style={{
              textAlign: "left",
              marginLeft: "3%",
              fontSize: "25px",
              color: "#6F1D1B",
              marginBottom: "15px",
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
              marginBottom: "15px",
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
          
          <Row className="justify-content-center mb-3">
            <Col>
              <Button
                className="btn-block customButton"
                type="button"
                style={{
                  width: "100%",
                  fontWeight: "1",
                  fontSize: "30px",
                  color: "white",
                  fontFamily: "Protest Guerrilla",
                  borderRadius: "50px",
                  backgroundColor: "#6F1D1B",
                  marginTop: "20px",
                }}
                onClick={handleReadNow}
              >
                READ NOW!
              </Button>
            </Col>
            <Col>
              <Button
                className="customButton"
                type="button"
                style={{
                  width: "100%",
                  fontWeight: "1",
                  fontSize: "30px",
                  color: "white",
                  fontFamily: "Protest Guerrilla",
                  borderRadius: "50px",
                  backgroundColor: "#6F1D1B",
                  marginTop: "20px",
                }}
                onClick={() => setShowModal(true)}
                disabled={!userInfo || !userInfo.token.is_paid}
              >
                RATE
              </Button>
            </Col>
          </Row>
        </Col>{" "}
      </Row>
      <RateModal
        show={showModal}
        handleClose={handleCloseModal}
        bookId={_id}
        userId={userId}
      />
    </Container>
  );
}

export default BookDetail;

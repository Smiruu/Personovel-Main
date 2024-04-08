import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listBookDetails } from "../actions/bookActions";
import { fetchMeanRatings, retrieveRating } from "../actions/ratingActions";
import { getRatingId } from "../actions/ratingActions";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { useParams } from "react-router-dom";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Rating from "./Rating";
import RateModal from "./RateModal";
import { createComment, getCommentsForBook, createReply } from "../actions/commentActions";
import CommentSection from "./CommentSection";
import { addToReadingHistory } from "../actions/preferenceActions";
import { addToFavorites, removeFromFavorites } from "../actions/favoriteActions";

function BookDetail() {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [book, setBook] = useState({});
  const [meanRating, setMeanRating] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [ratingId, setRatingId] = useState(localStorage.getItem("ratingId"));
  const userLoginInfo = useSelector((state) => state.userLogin.userInfo);
  const userRegisterInfo = useSelector((state) => state.userRegister.userInfo);
  const userInfo = userLoginInfo || userRegisterInfo;
  const userId = userInfo ? userInfo.token.id : null;
  const currentBookId = _id;

  const bookDetails = useSelector((state) => state.bookDetails);
  const { loading: bookLoading, error: bookError, book: bookData } = bookDetails;

  const fetchedMeanRating = useSelector(
    (state) => state.fetchMeanRatings.ratings.meanRating
  );
  const numReviews = useSelector(
    (state) => state.fetchMeanRatings.ratings.numReviews
  );

  const userRating = useSelector((state) => state.fetchRating.userRating);

  const commentList = useSelector((state) => state.comment);
  const { loading: loadingComments, error: commentsError, comments } = commentList || {};

  const [isFavorite, setIsFavorite] = useState(false); // Initialize isFavorite to false

  useEffect(() => {
    dispatch(listBookDetails(_id));
    dispatch(fetchMeanRatings(_id));
    dispatch(getRatingId(userId, _id));
    dispatch(getCommentsForBook(_id));
    setIsFavorite(false); // Initialize isFavorite to false
  }, [dispatch, _id, userId]);

  useEffect(() => {
    if (!loadingComments && !commentsError) {
      console.log("Comments:", comments); // Log comments data
    }
  }, [comments, loadingComments, commentsError]);

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
      dispatch({ type: "SET_USER_RATING", payload: 0 }); // Dispatch action to set userRating to 0
    }
  }, [dispatch, ratingId]);

  useEffect(() => {
    return () => {
      localStorage.removeItem("ratingId");
      localStorage.removeItem("userRating");
    };
  }, []);

  useEffect(() => {
    const storedFavoriteStatus = localStorage.getItem(`favorite_${userId}_${_id}`);
    setIsFavorite(storedFavoriteStatus === "true" ? true : false);
  }, [userId, _id]);

  const handleReadNow = () => {
    dispatch(addToReadingHistory(_id, userId));
    navigate(`/chapters/${_id}`);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    dispatch(createComment({ book_id: _id, user_id: userId, comment: commentText }));
    setCommentText("");
    window.location.reload();
  };

  const handleReply = (comment_id, reply, user_id) => {
    dispatch(createReply(comment_id, reply, user_id));
    window.location.reload();
  };

  const handleCommentTextChange = (text) => {
    setCommentText(text);
  };

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(userId, _id));
      localStorage.setItem(`favorite_${userId}_${_id}`, "false"); // Update local storage
    } else {
      dispatch(addToFavorites(userId, _id));
      localStorage.setItem(`favorite_${userId}_${_id}`, "true"); // Update local storage
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <Container fluid>
      <Row className="mt-5 mb-5 h-full w-full">
        <Col md={6} style={{ margin: "0", padding: "0" }}>
          {bookLoading ? (
            <Loader />
          ) : bookError ? (
            <Message variant="danger">{bookError}</Message>
          ) : (
            <Card.Img src={bookData.image} alt={bookData.title} fluid />
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
            {bookData?.title?.toUpperCase()}
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
              {bookData?.author?.toUpperCase()}
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
              {bookData?.genre?.toUpperCase()}
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
            <strong style={{ fontFamily: "Blinker" }}>Rating: </strong>
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
              {bookData?.language?.toUpperCase()}
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
              {bookData && bookData.synopsis ? (
                bookData.synopsis
              ) : (
                "Synopsis not available"
              )}
            </p>
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
            <strong style={{ fontFamily: "Blinker" }}>User Rating: </strong>
            <span
              style={{
                fontStyle: "italic",
                fontFamily: "Blinker",
                fontWeight: "1",
              }}
            >
              <Rating value={userRating} color="#f8e825" />
            </span>
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
            <Button
            className="customButton"
            type="button"
            style={{
              width: "90%",
              fontWeight: "1",
              fontSize: "20px",
              fontFamily: "Protest Guerrilla",
              borderRadius: "50px",
              backgroundColor: "transparent",
              border: "none",
              marginTop: "20px",
            }}
            onClick={handleToggleFavorite}
            disabled={!userInfo || !userInfo.token.is_paid} // Open the modal
          >
            <i
              className={`fas fa-heart${isFavorite ? " text-danger" : ""}`}
              style={{ fontSize: "30px" }}
            ></i>
          </Button>
          </Row>
        </Col>
      </Row>
      <RateModal
        show={showModal}
        handleClose={handleCloseModal}
        bookId={_id}
        userId={userId}
      />
      <Row className="mt-3">
        <Col md={12}>
          <CommentSection
            comments={comments.comments}
            replies={comments.replies}
            loading={loadingComments}
            commentsError={commentsError}
            handleCommentSubmit={handleCommentSubmit}
            handleReply={handleReply}
            setCommentText={handleCommentTextChange}
            commentText={commentText}
            userId={userId}
            userInfo={userInfo}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default BookDetail;

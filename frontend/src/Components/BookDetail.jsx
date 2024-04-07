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
import { createComment, getCommentsForBook, createReply, getRepliesForComment } from "../actions/commentActions";
import CommentSection from "./CommentSection";

function BookDetail() {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [book, setBook] = useState({});
  const [meanRating, setMeanRating] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [ratingId, setRatingId] = useState(localStorage.getItem("ratingId"));
  const userLoginInfo = useSelector((state) => state.userLogin.userInfo);
  const userRegisterInfo = useSelector((state) => state.userRegister.userInfo);
  const userInfo = userLoginInfo || userRegisterInfo;
  const userId = userInfo ? userInfo.token.id : null;
  const [showModal, setShowModal] = useState(false);
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

  useEffect(() => {
    dispatch(listBookDetails(_id));
    dispatch(fetchMeanRatings(_id));
    dispatch(getRatingId(userId, _id));
    dispatch(getCommentsForBook(_id));
  }, [dispatch, _id, userId]);

  useEffect(() => {
    console.log("Comments:", comments); // Log comments data
    // Fetch replies for each comment
    if (comments && comments.length > 0) {
      comments.forEach((comment) => {
        dispatch(getRepliesForComment(comment.comment_id));
      });
    }
  }, [dispatch, comments])

  useEffect(() => {
    console.log("Comments:", comments); // Log comments data
  }, [comments]);

  useEffect(() => {
    const storedRatingId = localStorage.getItem("ratingId");
    if (storedRatingId) {
      setRatingId(storedRatingId);
      dispatch(retrieveRating(storedRatingId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    // Update userRating when ratingId changes
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

  const handleReadNow = () => {
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
  };

  const handleReply = (comment_id, reply, user_id) => {
    console.log("Comment ID:", comment_id);
    console.log("Reply Text:", reply);
    dispatch(createReply(comment_id, reply, user_id));
  };

  const handleCommentTextChange = (text) => {
    setCommentText(text);
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
          <Col>
            <Button
              className="btn-block customButton"
              type="button"
              style={{
                width: "90%",
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
            <Button
              className="customButton"
              type="button"
              style={{
                width: "90%",
                fontWeight: "1",
                fontSize: "20px",
                color: "white",
                fontFamily: "Protest Guerrilla",
                borderRadius: "50px",
                backgroundColor: "#6F1D1B",
                marginTop: "20px",
              }}
              onClick={() => setShowModal(true)}
              disabled={!userInfo.token.is_paid}
            >
              RATE
            </Button>
          </Col>
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
            comments={comments}
            loading={loadingComments}
            commentsError={commentsError}
            handleCommentSubmit={handleCommentSubmit}
            handleReply={handleReply} // Pass the handleReply function directly
            setCommentText={handleCommentTextChange}
            commentText={commentText}
            userId = {userId}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default BookDetail;
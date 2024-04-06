import React, { useState, useEffect } from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import Book from "../Components/Book";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { checkUserPaidStatus } from "../actions/userActions";
import { getPreferredGenre } from "../actions/preferenceActions";
import { getUserDetails } from "../actions/profileActions";

function LandingScreen() {
  const [preferredBooks, setPreferredBooks] = useState([]);
  const [popularBooks, setPopularBooks] = useState([]);
  const [latestBooks, setLatestBooks] = useState([]);
  const [recommendedIndex, setRecommendedIndex] = useState(0);
  const [popularIndex, setPopularIndex] = useState(0);
  const [latestIndex, setLatestIndex] = useState(0);
  const [hasClickedNext, setHasClickedNext] = useState(false);
  const userLoginInfo = useSelector((state) => state.userLogin.userInfo);
  const userRegisterInfo = useSelector((state) => state.userRegister.userInfo);
  const userInfo = userLoginInfo || userRegisterInfo;
  const dispatch = useDispatch();
  const booksInPreferredGenre = useSelector((state) => state.preference.booksInPreferredGenre);
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  
  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  // Update preferredBooks state when booksInPreferredGenre changes
  useEffect(() => {
    if (booksInPreferredGenre) {
      setPreferredBooks(booksInPreferredGenre);
    }
  }, [booksInPreferredGenre]);

  useEffect(() => {
    async function fetchBooks() {
      const { data } = await axios.get("http://127.0.0.1:8000/api/books/");
      // Sort the books by popularity (assuming 'mean_rating' is a property of each book)
      const sortedPopularBooks = [...data].sort((a, b) => b.mean_rating - a.mean_rating);
      setPopularBooks(sortedPopularBooks);
      // Sort the books by latest date
      const sortedLatestBooks = [...data].sort((a, b) => new Date(b.date_added) - new Date(a.date_added));
      setLatestBooks(sortedLatestBooks);
    }
    fetchBooks();

    if (userInfo) {
      dispatch(checkUserPaidStatus(userInfo.token.id));
      dispatch(getPreferredGenre(userInfo.token.id));
    }
  }, [userInfo, dispatch]);

  const handleNext = (setIndex) => {
    setIndex((prevIndex) => prevIndex + 1);
    setHasClickedNext(true);
  };

  const handlePrev = (setIndex) => {
    setIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const hasPrevBooks = (index) => index > 0;
  const hasNextBooks = (index, books) => index + 4 < books.length;

  if (!userInfo) {
    return <Navigate to="/login" />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <Container fluid>
      <Row className="mt-3">
        <Col md={5} className="text-center">
          <h1
            style={{
              color: "#002960",
              fontSize: "80px",
              textAlign: "center",
              marginBlockStart: "50px",
              fontFamily: "Dancing Script",
            }}
          >
            WELCOME,
          </h1>
          <h1
            style={{
              color: "#BC1823",
              fontSize: "80px",
              fontWeight: "1",
              textAlign: "center",
              marginBlockStart: "50px",
              fontFamily: "Dancing Script",
              margin: "0",
            }}
          >
            {user.name}!
          </h1>
          <Card.Img
            src="/images/home-flower.png"
            className="logo_book"
            style={{ maxWidth: "100%", height: "auto", marginTop: "5%" }}
          />
        </Col>

        <Col md={7}>
          <h1
            className="mt-5"
            style={{
              textAlign: "center",
              marginTop: "2%",
              fontWeight: "bold",
              fontFamily: "Permanent Marker",
              color: "#6F1D1B",
              textDecoration: "underline",
            }}
          >
            Recommended For You
          </h1>
          <div style={{ overflowX: "auto" }}>
            <Row className="g-2">
              {preferredBooks
                .slice(recommendedIndex, recommendedIndex + 4)
                .map((book) => (
                  <Col key={book._id} sm={12} md={6} lg={4} xl={3}>
                    <Book book={book} />
                  </Col>
                ))}
            </Row>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "1rem",
            }}
          >
            {hasPrevBooks(recommendedIndex) && hasClickedNext && (
              <button
                onClick={() => handlePrev(setRecommendedIndex)}
                style={{
                  borderRadius: "50%",
                  backgroundColor: "rgba(111, 29, 27, 0.7)",
                  color: "white",
                  padding: "0.5rem 1rem",
                  border: "none",
                  marginRight: "auto",
                }}
              >
                {"<"}
              </button>
            )}
            {hasNextBooks(recommendedIndex, preferredBooks) && (
              <button
                onClick={() => handleNext(setRecommendedIndex)}
                style={{
                  marginLeft: "auto",
                  borderRadius: "50%",
                  backgroundColor: "rgba(111, 29, 27, 0.7)",
                  color: "white",
                  padding: "0.5rem 1rem",
                  border: "none",
                }}
              >
                {">"}
              </button>
            )}
          </div>
        </Col>
      </Row>

      <Col>
        <Link to="/popular" className="link-no-underline">
          <h1
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color: "#00669B",
              fontFamily: "Permanent Marker",
              textDecoration: "underline",
              marginTop: "5rem",
            }}
          >
            Popular Novels
          </h1>
        </Link>
        <div style={{ overflowX: "auto" }}>
          <Row className="g-2">
            {popularBooks.slice(popularIndex, popularIndex + 4).map((book) => (
              <Col key={book._id} sm={12} md={6} lg={4} xl={3}>
                <Book book={book} />
              </Col>
            ))}
          </Row>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          {hasPrevBooks(popularIndex) && hasClickedNext && (
            <button
              onClick={() => handlePrev(setPopularIndex)}
              style={{
                borderRadius: "50%",
                backgroundColor: "rgba(0, 102, 155, 0.7)",
                color: "white",
                padding: "0.5rem 1rem",
                border: "none",
                marginRight: "auto",
              }}
            >
              {"<"}
            </button>
          )}
          {hasNextBooks(popularIndex, popularBooks) && (
            <button
              onClick={() => handleNext(setPopularIndex)}
              style={{
                marginLeft: "auto",
                borderRadius: "50%",
                backgroundColor: "rgba(0, 102, 155, 0.7)",
                color: "white",
                padding: "0.5rem 1rem",
                border: "none",
              }}
            >
              {">"}
            </button>
          )}
        </div>
      </Col>

      <Col style={{ marginBottom: "10%" }}>
        <section id="Latest">
          <Link to="/latest" className="link-no-underline">
            <h1
              style={{
                textAlign: "center",
                marginTop: "2rem",
                fontWeight: "bold",
                color: "#BC1823",
                fontFamily: "Permanent Marker",
                textDecoration: "underline",
              }}
            >
              Latest Novels
            </h1>
          </Link>
          <div style={{ overflowX: "auto" }}>
            <Row className="g-2">
              {latestBooks.slice(latestIndex, latestIndex + 4).map((book) => (
                <Col key={book._id} sm={12} md={6} lg={4} xl={3}>
                  <Book book={book} />
                </Col>
              ))}
            </Row>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "1rem",
            }}
          >
            {hasPrevBooks(latestIndex) && hasClickedNext && (
              <button
                onClick={() => handlePrev(setLatestIndex)}
                style={{
                  borderRadius: "50%",
                  backgroundColor: "rgba(188, 24, 35, 0.7)",
                  color: "white",
                  padding: "0.5rem 1rem",
                  border: "none",
                  marginRight: "auto",
                }}
              >
                {"<"}
              </button>
            )}
            {hasNextBooks(latestIndex, latestBooks) && (
              <button
                onClick={() => handleNext(setLatestIndex)}
                style={{
                  marginLeft: "auto",
                  borderRadius: "50%",
                  backgroundColor: "rgba(188, 24, 35, 0.7)",
                  color: "white",
                  padding: "0.5rem 1rem",
                  border: "none",
                }}
              >
                {">"}
              </button>
            )}
          </div>
        </section>
      </Col>
    </Container>
  );
}

export default LandingScreen;

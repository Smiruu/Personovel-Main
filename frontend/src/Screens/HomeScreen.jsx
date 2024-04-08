import React, { useState, useEffect } from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import Book from "../Components/Book";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { checkUserPaidStatus } from "../actions/userActions";
import { getPreferredGenre } from "../actions/preferenceActions";
import { getUserDetails } from "../actions/profileActions";
import Loader from "../Components/Loader"; // Import your Loader component

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
      dispatch(getUserDetails());
      dispatch(checkUserPaidStatus(userInfo.token.id));
      dispatch(getPreferredGenre(userInfo.token.id));
    }
  }, [userInfo, dispatch]);

  if (!userInfo) {
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
            {user ? user.name : <Loader />}!
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
          </div>
        </section>
      </Col>
    </Container>
  );
}

export default LandingScreen;

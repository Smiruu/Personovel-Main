import React, { useState, useEffect } from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import Book from "../Components/Book"; // Updated import
import { Link, Navigate } from "react-router-dom";
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { checkUserPaidStatus } from '../actions/userActions'

function LandingScreen() {
  const [books, setBooks] = useState([]); // Updated state name
  const userLoginInfo = useSelector((state) => state.userLogin.userInfo);
  const userRegisterInfo = useSelector((state) => state.userRegister.userInfo);
  const userInfo = userLoginInfo || userRegisterInfo;
  const dispatch = useDispatch();
  
  useEffect(() => {
    async function fetchBooks() {
      const { data } = await axios.get('http://127.0.0.1:8000/api/books/');
      setBooks(data);
    }
    fetchBooks();

    // Check user's paid status when component mounts
    if (userInfo) {
      dispatch(checkUserPaidStatus(userInfo.token.id)); // Replace userInfo.userId with the appropriate user ID property
    }
  }, [userInfo, dispatch]); // useEffect dependencies

  

  const [recommendedIndex, setRecommendedIndex] = useState(0);
  const [popularIndex, setPopularIndex] = useState(0);
  const [latestIndex, setLatestIndex] = useState(0);
  const [hasClickedNext, setHasClickedNext] = useState(false);

  const handleNext = (setIndex) => {
    setIndex((prevIndex) => prevIndex + 1);
    setHasClickedNext(true);
  };

  const handlePrev = (setIndex) => {
    setIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const hasPrevBooks = (index) => index > 0;
  const hasNextBooks = (index) => index + 4 < books.length;

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
            {userInfo.token.name}!
          </h1>

          <Card.Img
            src="/images/home-flower.png"
            className="logo_book"
            style={{ maxWidth: "100%", height: "auto", marginTop: "5%" }}
          />
        </Col>

        <Col md={7}>
          <h1 className="mt-5"
            style={{
              textAlign: "center",
              marginTop: "2%",
              fontWeight: "1",
              fontFamily: "Permanent Marker",
              color: "#6F1D1B",
              textDecoration: "underline",
            }}
          >
            Recommended For You
          </h1>

          <div
            style={{
              height: "600px",
              width: "100%",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Row className="g-2">
              {books
                .slice(recommendedIndex, recommendedIndex + 4)
                .map((book) => (
                  <Col key={book._id} sm={12} md={6} lg={4} xl={3}>
                    <Book book={book} />
                  </Col>
                ))}
            </Row>
            <div
              style={{
                position: "absolute",
                top: "33%",
                margin: "2%",
                display: "flex",
                justifyContent: "flex-start",
                width: "95%",
                padding: "0 1% 0 3%",
              }}
            >
              {hasPrevBooks(recommendedIndex) && hasClickedNext && (
                <button
                  onClick={() => handlePrev(setRecommendedIndex)}
                  style={{
                    borderRadius: "50%",
                    backgroundColor: "rgba(111, 29, 27, 0.7)",
                    color: "white",
                    padding: "20px",
                    border: "none",
                    marginRight: "auto",
                  }}
                >
                  {"<"}
                </button>
              )}
              {hasNextBooks(recommendedIndex) && (
                <button
                  onClick={() => handleNext(setRecommendedIndex)}
                  style={{
                    marginLeft: "auto",
                    borderRadius: "50%",
                    backgroundColor: "rgba(111, 29, 27, 0.7)",
                    color: "white",
                    padding: "20px",
                    border: "none",
                  }}
                >
                  {">"}
                </button>
              )}
            </div>
          </div>
        </Col>
      </Row>

      <Col>
        <Link to="/popular" className="link-no-underline">
          <h1
            style={{
              textAlign: "center",
              marginTop: "10%",
              fontWeight: "1",
              color: "#00669B",
              fontFamily: "Permanent Marker",
              textDecoration: "underline",
            }}
          >
            Popular Novels
          </h1>
        </Link>

        <div
          style={{
            height: "500px",
            overflow: "hidden",
            margin: "2%",
            position: "relative",
            width: "100%",
          }}
        >
          <Row className="g-2">
            {books.slice(popularIndex, popularIndex + 4).map((book) => (
              <Col key={book._id} sm={12} md={6} lg={4} xl={3}>
                <Book book={book} />
              </Col>
            ))}
          </Row>
          <div
            style={{
              position: "absolute",
              top: "50%",
              display: "flex",
              justifyContent: "flex-start",
              width: "100%",
              padding: "0 2%",
            }}
          >
            {hasPrevBooks(popularIndex) && hasClickedNext && (
              <button
                onClick={() => handlePrev(setPopularIndex)}
                style={{
                  borderRadius: "50%",
                  backgroundColor: "rgba(0, 102, 155, 0.7)",
                  color: "white",
                  padding: "20px",
                  border: "none",
                  marginRight: "auto",
                }}
              >
                {"<"}
              </button>
            )}
            {hasNextBooks(popularIndex) && (
              <button
                onClick={() => handleNext(setPopularIndex)}
                style={{
                  marginLeft: "auto",
                  borderRadius: "50%",
                  backgroundColor: "rgba(0, 102, 155, 0.7)",
                  color: "white",
                  padding: "20px",
                  border: "none",
                }}
              >
                {">"}
              </button>
            )}
          </div>
        </div>
      </Col>

      <Col style={{ marginBottom: "10%" }}>
        <section id="Latest">
          <Link to="/latest" className="link-no-underline">
            <h1
              style={{
                textAlign: "center",
                marginTop: "10%",
                fontWeight: "1",
                color: "#BC1823",
                fontFamily: "Permanent Marker",
                textDecoration: "underline",
              }}
            >
              Latest Novels
            </h1>
          </Link>
          <div
            style={{
              height: "500px",
              overflow: "hidden",
              margin: "2%",
              position: "relative",
              width: "100%",
            }}
          >
            <Row className="g-2">
              {books.slice(latestIndex, latestIndex + 4).map((book) => (
                <Col key={book._id} sm={12} md={6} lg={4} xl={3}>
                  <Book book={book} />
                </Col>
              ))}
            </Row>
            <div
              style={{
                position: "absolute",
                top: "50%",
                display: "flex",
                justifyContent: "flex-start",
                width: "100%",
                padding: "0 2%",
              }}
            >
              {hasPrevBooks(latestIndex) && hasClickedNext && (
                <button
                  onClick={() => handlePrev(setLatestIndex)}
                  style={{
                    borderRadius: "50%",
                    backgroundColor: "rgba(188, 24, 35, 0.7)",
                    color: "white",
                    padding: "20px",
                    border: "none",
                    marginRight: "auto",
                  }}
                >
                  {"<"}
                </button>
              )}
              {hasNextBooks(latestIndex) && (
                <button
                  onClick={() => handleNext(setLatestIndex)}
                  style={{
                    marginLeft: "auto",
                    borderRadius: "50%",
                    backgroundColor: "rgba(188, 24, 35, 0.7)",
                    color: "white",
                    padding: "20px",
                    border: "none",
                  }}
                >
                  {">"}
                </button>
              )}
            </div>
          </div>
        </section>
      </Col>
    </Container>
  );
}

export default LandingScreen;

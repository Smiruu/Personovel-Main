import React, { useState, useEffect } from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import Book from "../Components/Book";
import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { checkUserPaidStatus } from "../actions/userActions";
import { getRandomBooks, getRecommendedBooks } from "../actions/preferenceActions";
import { getUserDetails } from "../actions/profileActions";
import Loader from "../Components/Loader";
import { listBooks } from "../actions/bookActions";

function LandingScreen() {
  const [recommendedIndex, setRecommendedIndex] = useState(0);
  const [popularIndex, setPopularIndex] = useState(0);
  const [latestIndex, setLatestIndex] = useState(0);
  const [genreBooksIndex, setGenreBooksIndex] = useState(0);

  const userLoginInfo = useSelector((state) => state.userLogin.userInfo);
  const userRegisterInfo = useSelector((state) => state.userRegister.userInfo);
  const userInfo = userLoginInfo || userRegisterInfo;
  const dispatch = useDispatch();
  const booksInRecommendedBooks = useSelector(
    (state) => state.preference.booksInRecommendedBooks
  );
  const { recommended_books } = booksInRecommendedBooks;
  console.log("Recommended:", recommended_books);
  const randomBooks= useSelector((state) => state.randomBooks);
  console.log("Got",randomBooks)
  const {genre_books, genre} = randomBooks
  console.log("Got Genre", genre)
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const bookList = useSelector((state) => state.bookList);
  const { books } = bookList;
  const [genreBooks, setGenreBooks] = useState([]);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [popularBooks, setPopularBooks] = useState([]);
  const [latestBooks, setLatestBooks] = useState([]);


  useEffect(() => {
    if (!userInfo) {
      return; // Exit early if userInfo is not available
    }

    dispatch(getUserDetails());
    dispatch(checkUserPaidStatus(userInfo.token.id));
    dispatch(getRecommendedBooks(userInfo.token.id));
    dispatch(listBooks());
    dispatch(getRandomBooks(userInfo.token.id));
  }, [userInfo, dispatch]);

  useEffect(() => {
    if (recommended_books) {
      setRecommendedBooks(recommended_books);
    }
    if(genre_books){
      setGenreBooks(genre_books);
    }
  }, [recommended_books, genre_books]);

  useEffect(() => {
    if (books.length > 0) {
      const sortedPopularBooks = [...books].sort(
        (a, b) => b.mean_rating - a.mean_rating
      );
      setPopularBooks(sortedPopularBooks);

      const sortedLatestBooks = [...books].sort(
        (a, b) => new Date(b.date_added) - new Date(a.date_added)
      );
      setLatestBooks(sortedLatestBooks);
    }
  }, [books]);

  if (!userInfo) {
    return <Navigate to="/login" />;
  }

  return (
    <Container fluid>
      <Row>
        <Col md={4} className="order-2 order-md-1 text-start">
          <div
            className="mt-5"
            style={{
              backgroundColor: "#FCD5CE",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              padding: "20px",
            }}
          >
            <h1
              style={{
                textAlign: "center",
                marginTop: "2%",
                fontWeight: "bold",
                fontFamily: "Permanent Marker",
                color: "#6F1D1B",
                textDecoration: "underline",
                textTransform: "uppercase",
              }}
            >
              Recommended Novels
            </h1>
            <div>
              <Row
                className="g-1 d-flex justify-content-center"
                style={{ marginBottom: "10px" }}
              >
                {recommendedBooks
                  .slice(recommendedIndex, recommendedIndex + 4)
                  .map((book) => (
                    <Col key={book._id} sm={12} md={6} lg={4} xl={3}>
                      <Book book={book} />
                    </Col>
                  ))}
              </Row>
            </div>
          </div>
        </Col>

        <Col md={4} className="order-1 order-md-2 text-center">
          {" "}
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
            {user ? user.name : <Loader />}!! ^-^
          </h1>
          <Card.Img
            src="/images/home-flower.gif"
            className="logo_book"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Col>

        <Col md={4} className="order-3 order-md-3 text-end">
          <div
            className="mt-5"
            style={{
              backgroundColor: "#FCD5CE",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              padding: "20px",
            }}
          >
            <h1
              style={{
                textAlign: "center",
                marginTop: "2%",
                fontWeight: "bold",
                fontFamily: "Permanent Marker",
                color: "#6F1D1B",
                textDecoration: "underline",
                textTransform: "uppercase",
              }}
            >
              Preferred Genres: {genre ? genre.name : ""}
            </h1>
            <div>
              <Row
                className="g-1 d-flex justify-content-center"
                style={{ marginBottom: "10px" }}
              >
                {genreBooks
                  .slice(genreBooksIndex, genreBooksIndex + 4)
                  .map((book) => (
                    <Col key={book._id} sm={12} md={6} lg={4} xl={3}>
                      <Book book={book} />
                    </Col>
                  ))}
              </Row>
            </div>
          </div>
        </Col>
      </Row>

      <Col>
        <div
          className="mt-5"
          style={{
            backgroundColor: "#FCD5CE",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "20px",
          }}
        >
          <Link to="/popular" className="link-no-underline">
            <h1
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: "#00669B",
                fontFamily: "Permanent Marker",
                textDecoration: "underline",
              }}
            >
              Popular Novels
            </h1>
          </Link>
          <div>
            <Row className="g-1">
              {popularBooks
                .slice(popularIndex, popularIndex + 4)
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
          ></div>
        </div>
      </Col>

      <Col style={{ marginBottom: "5%" }}>
        <div
          className="mt-5"
          style={{
            backgroundColor: "#FCD5CE",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "20px",
          }}
        >
          <section id="Latest">
            <Link to="/latest" className="link-no-underline">
              <h1
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#BC1823",
                  fontFamily: "Permanent Marker",
                  textDecoration: "underline",
                }}
              >
                Latest Novels
              </h1>
            </Link>
            <div>
              <Row className="g-1">
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
            ></div>
          </section>
        </div>
      </Col>
    </Container>
  );
}

export default LandingScreen;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchBooks } from "../actions/searchActions";
import Book from "../Components/Book";
import Message from "../Components/Message";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

const SearchPage = () => {
  const [query, setQuery] = useState(localStorage.getItem("searchQuery") || "");
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [loadingTimeout, setLoadingTimeout] = useState(null);
  const { loading, books, error } = useSelector((state) => state.search);
  const [searchedBooks, setSearchedBooks] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("searchQuery", query);
  }, [query]);
  const handleSearch = () => {
    clearTimeout(loadingTimeout);
    setShowSortOptions(true);
    const timeout = setTimeout(() => {
      dispatch(searchBooks({ query }));
    }, 300);
    setLoadingTimeout(timeout);
  };

  const handleSort = (sortBy) => {
    let sorted = [];

    switch (sortBy) {
      case "A-Z":
        sorted = [...searchedBooks].sort((a, b) => {
          const titleA = (a.title || "").toUpperCase();
          const titleB = (b.title || "").toUpperCase();
          return titleA.localeCompare(titleB);
        });
        break;
      case "Latest":
        sorted = [...searchedBooks].sort(
          (a, b) => new Date(b.date_added) - new Date(a.date_added)
        );
        break;
      case "Popularity":
        sorted = [...searchedBooks].sort(
          (a, b) => b.mean_rating - a.mean_rating
        );
        break;
      default:
        sorted = [...searchedBooks];
        break;
    }

    setSearchedBooks(sorted);
  };

  useEffect(() => {
    setSearchedBooks(books);
  }, [books]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    handleSearch();
  };

  return (
    <Container>
      <h1
        style={{
          textAlign: "center",
          marginTop: "20px",
          fontWeight: "bold",
          color: "#002960",
          fontFamily: "Protest Guerrilla",
          fontSize: "60px",
          textDecoration: "underline",
        }}
      >
        Search Results
      </h1>

      <Row>
        <Col md={{ span: 6, offset: 3 }} className="mb-3 d-flex">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex-grow-1 me-2"
          >
            <Form.Group controlId="searchQuery" className="mb-0">
              <Form.Control
                type="text"
                placeholder="Enter search query"
                value={query}
                onChange={handleInputChange}
                style={{
                  borderRadius: "50px",
                  border: "3px solid #002960",
                  color: "#002960",
                }}
              />
            </Form.Group>
          </Form>
          <Button
            type="submit"
            variant="info"
            style={{
              borderRadius: "50px",
              fontSize: "20px",
              fontWeight: "bold",
              backgroundColor: "#002960",
              border: "3px solid #002960",
              color: "#FFFFFF",
            }}
            onClick={handleSearch}
          >
            Search
          </Button>
        </Col>
      </Row>

      <div
        style={{
          borderTop: "3px solid #002960",
          margin: "20px 0",
          width: "100%",
        }}
      ></div>

      {showSortOptions && (
        <Col className="mt-4 mb-3">
          <div>
            <h2
              style={{
                textAlign: "left",
                fontWeight: "1",
                color: "#002960",
                fontFamily: "Protest Guerrilla",
                fontSize: "50px",
                marginLeft: "30px",
              }}
            >
              <strong>
                <i
                  className="bi bi-sort-up-alt"
                  style={{
                    color: "#002960",
                    marginRight: "8px",
                  }}
                ></i>
                SORT BY
              </strong>
            </h2>
            <div
              style={{
                display: "flex",
                marginLeft: "70px",
                marginBottom: "20px",
              }}
            >
              <div
                onClick={() => handleSort("A-Z")}
                className="me-2"
                style={{
                  color: "#002960",
                  fontFamily: "Montserrat",
                  fontWeight: "bold",
                  marginRight: "8px",
                  padding: "10px 20px",
                  transition: "background-color 0.3s, color 0.3s",
                  cursor: "pointer",
                  textDecoration: "underline",
                  fontSize: "20px",
                }}
              >
                A-Z
              </div>

              <div
                onClick={() => handleSort("Latest")}
                className="me-2"
                style={{
                  color: "#002960",
                  fontFamily: "Montserrat",
                  fontWeight: "bold",
                  marginRight: "8px",
                  padding: "10px 20px",
                  transition: "background-color 0.3s, color 0.3s",
                  cursor: "pointer",
                  textDecoration: "underline",
                  fontSize: "20px",
                }}
              >
                LATEST
              </div>

              <div
                onClick={() => handleSort("Popularity")}
                style={{
                  color: "#002960",
                  fontFamily: "Montserrat",
                  fontWeight: "bold",
                  marginRight: "8px",
                  padding: "10px 20px",
                  transition: "background-color 0.3s, color 0.3s",
                  cursor: "pointer",
                  textDecoration: "underline",
                  fontSize: "20px",
                }}
              >
                POPULARITY
              </div>
            </div>
          </div>

          <Row className="g-3">
            {loading ? null : error ? (
              <Message variant="danger">{error}</Message>
            ) : searchedBooks.length > 0 ? (
              searchedBooks.map((book) => (
                <Col
                  key={book.id}
                  sm={12}
                  md={6}
                  lg={4}
                  xl={3}
                  className="mb-4"
                >
                  <Book book={book} searchQuery={query} />
                </Col>
              ))
            ) : (
              <Col md={{ span: 6, offset: 3 }}>
                <Message>No books found.</Message>
              </Col>
            )}
          </Row>
        </Col>
      )}
    </Container>
  );
};

export default SearchPage;

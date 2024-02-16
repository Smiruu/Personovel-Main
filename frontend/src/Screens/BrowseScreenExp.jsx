import React, { useState, useEffect } from "react";
import { Col, Button, Collapse, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Product from "../Components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listGenres } from "../actions/genreActions";
import Message from "../Components/Message";
import Loader from "../Components/Loader";

function BrowseScreenExp() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortedBooks, setSortedBooks] = useState([]);
  const [originalBooks, setOriginalBooks] = useState([]);
  const dispatch = useDispatch();
  const bookList = useSelector((state) => state.bookList);
  const { books } = bookList;
  const genreList = useSelector((state) => state.genreList);
  const { genres } = genreList;
  useEffect(() => {
    dispatch(listGenres());
  }, []);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  useEffect(() => {
    setOriginalBooks(books);
    setSortedBooks(books);
  }, []);

  const handleSort = (sortBy) => {
    let sorted = [];

    switch (sortBy) {
      case "A-Z":
        sorted = [...sortedBooks].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Latest":
        sorted = [...originalBooks].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        break;
      case "Popularity":
        break;
      default:
        sorted = [...originalBooks];
        break;
    }

    setSortedBooks(sorted);
  };

  return (
    <div className="mb-5">
      <h1
        style={{
          textAlign: "center",
          marginTop: "20px",
          fontWeight: "1",
          color: "#6F1D1B",
          fontFamily: "Permanent Marker",
          textDecoration: "underline",
          fontSize: "60px",
        }}
      >
        Browse Novels
      </h1>

      <div
        style={{
          borderTop: "3px solid #FCD5CE",
          margin: "20px 0",
          width: "100%",
        }}
      ></div>

      <Col className="mt-3 mb-3">
        <div
          style={{
            border: "3px solid #E8A598",
            borderRadius: "5px",
            justifyContent: "space-between",
            padding: "10px",
          }}
        >
          <Button
            variant="secondary"
            onClick={toggleFilter}
            aria-controls="filter-collapse"
            aria-expanded={isFilterOpen}
            className="me-2"
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "#6F1D1B",
              fontFamily: "Protest Guerrilla",
              fontWeight: "1",
              fontSize: "50px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <i
              className="bi bi-sliders"
              style={{ fontSize: "3rem", color: "#6F1D1B", marginRight: "8px" }}
            />
            FILTER
          </Button>

          <Collapse in={isFilterOpen}>
            <div
              id="filter-collapse"
              style={{
                marginLeft: "50px",
                backgroundColor: "transparent",
              }}
            >
              <Form>
                <Form.Group controlId="formGenres">
                  <Form.Label
                    style={{
                      fontFamily: "Montserrat",
                      color: "#6F1D1B",
                      fontSize: "30px",
                    }}
                  >
                    <strong>GENRES</strong>
                  </Form.Label>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      marginLeft: "40px",
                    }}
                  >
                    {genres.map(
                      (genre) =>
                        genre && (
                          <Button
                            key={genre.id}
                            variant="outline-secondary"
                            className="me-2 mb-2"
                            style={{
                              color: "#6F1D1B",
                              borderColor: "#6F1D1B",
                              borderRadius: "50px",
                              fontFamily: "Blinker",
                              fontWeight: "1",
                              marginRight: "8px",
                              marginBottom: "8px",
                              padding: "10px 20px",
                              transition: "background-color 0.3s, color 0.3s",
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = "#6F1D1B";
                              e.target.style.color = "#fff";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = "transparent";
                              e.target.style.color = "#6F1D1B";
                            }}
                          >
                            {genre.name.toUpperCase()}
                          </Button>
                        )
                    )}
                  </div>
                </Form.Group>
              </Form>
            </div>
          </Collapse>

          {isFilterOpen && (
            <i
              className="bi bi-dash-circle-fill"
              style={{
                fontSize: "2rem",
                cursor: "pointer",
                color: "#6F1D1B",
              }}
              onClick={toggleFilter}
            />
          )}
        </div>
      </Col>

      <Col className="mt-4 mb-3">
        <div>
          <h2
            style={{
              textAlign: "left",
              fontWeight: "1",
              color: "#6F1D1B",
              fontFamily: "Protest Guerrilla",
              fontSize: "50px",
              marginLeft: "30px",
            }}
          >
            <strong>
              <i
                className="bi bi-sort-up-alt"
                style={{
                  color: "#6F1D1B",
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
                color: "#6F1D1B",
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

            <Link
              to="/latest"
              onClick={() => handleSort("Latest")}
              className="me-2"
              style={{
                color: "#6F1D1B",
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
            </Link>

            <Link
              to="/popular"
              onClick={() => handleSort("Popularity")}
              style={{
                color: "#6F1D1B",
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
            </Link>
          </div>
        </div>

        <Row className="g-3">
          {sortedBooks.map((book) => (
            <Col key={book._id} sm={12} md={6} lg={4} xl={3} className="mb-4">
              <Product book={book} />
            </Col>
          ))}
        </Row>
      </Col>
    </div>
  );
}

export default BrowseScreenExp;

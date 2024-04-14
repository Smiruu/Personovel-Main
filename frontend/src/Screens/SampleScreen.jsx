// SampleScreen.js

import React, { useState, useEffect } from "react";
import { Row, Col, Container, Nav, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

function SampleScreen() {
  const [books, setBooks] = useState([]);
  const [hoveredBook, setHoveredBook] = useState(null);

  useEffect(() => {
    async function fetchBooks() {
      const { data } = await axios.get("http://127.0.0.1:8000/api/books/");
      setBooks(data);
    }
    fetchBooks();
  }, []);

  const limitedBooks = books.slice(0, 6);

  return (
    <Container fluid>
        <Col style={{ backgroundColor: "#FCD5CE", padding: "20px" }}>
          <section id="Popular">
            <h1
              style={{
                textAlign: "center",
                color: "#AB0043",
                fontFamily: "Indie Flower",
                marginBottom: "2%",
                marginTop: "2%",
              }}
            >
              Ever wondered what secrets the night holds and whether they could
              change the course of your destiny?
            </h1>

            <div style={{ margin: "20px", marginBottom: "20px" }}>
              <Row className="g-2">
                {limitedBooks.map((book) => (
                  <Col key={book._id}>
                    <Card
                      className="my-3 rounded"
                      style={{
                        border: "2px solid #6F1D1B",
                        borderRadius: "10px",
                        padding: "10px",
                        backgroundColor: "#F5F5F5",
                        transition: "transform 0.3s ease-in-out",
                        transform:
                          hoveredBook === null || hoveredBook._id !== book._id
                            ? "scale(1)"
                            : "scale(1.1)",
                        zIndex:
                          hoveredBook === null || hoveredBook._id !== book._id
                            ? "0"
                            : "100",
                        height: "500px",
                      }}
                      onMouseEnter={() => setHoveredBook(book)}
                      onMouseLeave={() => setHoveredBook(null)}
                    >
                      <Link to={`/books/${book._id}`}>
                        <Card.Img
                          src={book.image}
                          style={{ width: "100%", borderRadius: "10px" }}
                        />
                      </Link>
                      <Card.Body style={{ overflow: "auto" }}>
                        <Card.Title
                          as="div"
                          style={{
                            color: "#333",
                            fontSize: "18px",
                            textAlign: "center",
                            fontFamily: "Blinker",
                            textTransform: "uppercase",
                          }}
                        >
                          <strong>{book.title}</strong>
                          <div className="mt-3">
                            <strong>Author:</strong> {book.author}
                          </div>
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>

            <h1
              style={{
                textAlign: "center",
                fontFamily: "Indie Flower",
                color: "#AB0043",
                marginBottom: "2%",
              }}
            >
              What if the key to unlocking your wildest dreams lies hidden
              within the pages of a novel, waiting for you to turn them?
            </h1>
          </section>
        </Col>

        <Col
          style={{
            backgroundColor: "#FCD5CE",
            padding: "20px",
            marginTop: "5%",
            marginBottom: "10%",
          }}
        >
          <section id="Latest">
            <h1
              style={{
                textAlign: "center",
                marginRight: "20px",
                marginLeft: "20px",
                marginTop: "20px",
                color: "#AB0043",
                fontFamily: "Indie Flower",
              }}
            >
              Are you ready to embark on an adventure that transcends reality
              and immerses you in a world where every question leads to a
              revelation?
            </h1>

            <div style={{ margin: "20px" }}>
              <Row className="g-2">
                {limitedBooks.map((book) => (
                  <Col key={book._id}>
                    <Card
                      className="my-3 rounded"
                      style={{
                        border: "2px solid #6F1D1B",
                        borderRadius: "10px",
                        padding: "10px",
                        backgroundColor: "#F5F5F5",
                        transition: "transform 0.3s ease-in-out",
                        transform:
                          hoveredBook === null || hoveredBook._id !== book._id
                            ? "scale(1)"
                            : "scale(1.1)",
                        zIndex:
                          hoveredBook === null || hoveredBook._id !== book._id
                            ? "0"
                            : "100",
                        height: "500px",
                      }}
                      onMouseEnter={() => setHoveredBook(book)}
                      onMouseLeave={() => setHoveredBook(null)}
                    >
                      <Link to={`/books/${book._id}`}>
                        <Card.Img
                          src={book.image}
                          style={{ width: "100%", borderRadius: "10px" }}
                        />
                      </Link>
                      <Card.Body style={{ overflow: "auto" }}>
                        <Card.Title
                          as="div"
                          style={{
                            color: "#333",
                            fontSize: "18px",
                            textAlign: "center",
                            fontFamily: "Blinker",
                            textTransform: "uppercase",
                          }}
                        >
                          <strong>{book.title}</strong>
                          <div className="mt-3">
                            <strong>Author:</strong> {book.author}
                          </div>
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </section>

          <h1
            className="mt-5"
            style={{
              textAlign: "center",
              marginRight: "20px",
              marginLeft: "20px",
              marginBlockEnd: "40px",
              color: "#AB0043",
              fontFamily: "Montserrat",
            }}
          >
            Unlock a world of exclusive content and personalized experiences –
            register now and be part of a community where every page turned
            reveals new connections and possibilities.
          </h1>
          <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
            <Nav.Link as={Link} to="/register">
              <Button
                style={{
                  fontSize: "35px",
                  fontWeight: "1",
                  width: "300px",
                  height: "65px",
                  textAlign: "center",
                  fontFamily: "Protest Guerrilla",
                  backgroundColor: "#BC1823",
                  borderRadius: "50px",
                }}
                variant="primary"
              >
                GET STARTED
              </Button>
            </Nav.Link>
          </h1>
        </Col>
    </Container>
  );
}

export default SampleScreen;

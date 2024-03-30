import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Book from "../Components/Book"; // Import Book component
import axios from "axios";

function PopularScreen() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const { data } = await axios.get("http://127.0.0.1:8000/api/books/");
        // Sort the books based on mean_rating in descending order
        const sortedBooks = data.sort((a, b) => b.mean_rating - a.mean_rating);
        setBooks(sortedBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }
    fetchBooks();
  }, []);

  return (
    <div className="mb-5">
      <h1
        style={{
          textAlign: "center",
          marginTop: "20px",
          fontWeight: "1",
          color: "#00669B",
          fontFamily: "Permanent Marker",
          textDecoration: "underline",
          fontSize: "60px",
        }}
      >
        Popular Novels
      </h1>
      <Row className="mx-2 g-2">
        {books.map((book) => (
          <Col key={book._id} sm={12} md={6} lg={4} xl={3} className="mb-4">
            <Book book={book} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default PopularScreen;
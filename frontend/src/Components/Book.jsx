import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import Highlighter from "react-highlight-words";

function Book({ book, searchQuery }) {
  const [isHovered, setIsHovered] = useState(false);

  console.log(searchQuery)

  const bookContainerStyle = {
    border: "2px solid #6F1D1B",
    borderRadius: "10px",
    padding: "10px",
    backgroundColor: "#F5F5F5",
    transition: "transform 0.3s ease-in-out",
    transform: isHovered ? "scale(1.1) translateY(-10px)" : "scale(1)",
    height: "100%",
    zIndex: isHovered ? "100" : "0",
  };

  const imageStyle = {
    width: "100%",
    borderRadius: "10px",
  };

  const textStyle = {
    color: "#333",
    fontSize: "18px",
    textAlign: "center",
    fontFamily: "Blinker",
  };

  const ratingStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <Card
      className="my-3 rounded"
      style={bookContainerStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/books/${book._id}`}>
        <Card.Img src={book.image} style={imageStyle} />
      </Link>

      <Card.Body style={{ height: "150px", overflow: "auto" }}>
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
          <strong>
            <Highlighter
              searchWords={[searchQuery]}
              autoEscape={true}
              textToHighlight={book.title}
            />
          </strong>
        </Card.Title>

        <Card.Text as="div" style={textStyle}>
          <div className="">
            <strong>Author:</strong>{" "}
            <Highlighter
              searchWords={[searchQuery]}
              autoEscape={true}
              textToHighlight={book.author}
            />
          </div>
        </Card.Text>

        <Card.Text as="div" style={textStyle}>
          <div className="">
            <strong>Genre:</strong>{" "}
            <Highlighter
              searchWords={[searchQuery]}
              autoEscape={true}
              textToHighlight={book.genre}
            />
          </div>
        </Card.Text>

        <Card.Text as="div" style={textStyle}>
          <div className="">
            <strong>Language:</strong>{" "}
            <Highlighter
              searchWords={[searchQuery]}
              autoEscape={true}
              textToHighlight={book.language}
            />
          </div>
        </Card.Text>

        <Card.Text as="div" style={ratingStyle}>
          <strong className="me-1">Rating:</strong>{" "}
          <Rating value={book.mean_rating} color="#f8e825" />
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Book;

import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from './Rating'

function Book({ book }) {
  const bookContainerStyle = {
    border: "2px solid #6F1D1B",
    borderRadius: "10px",
    padding: "15px",
    backgroundColor: "#F5F5F5",
  };

  const imageStyle = {
    width: "100%",
    borderRadius: "10px",
    marginBottom: "15px",
  };

  const textStyle = {
    color: "#333",
    fontSize: "18px",
    textAlign: "center",
    fontFamily: "Blinker",
  };

  return (
    <Card className="my-3 rounded" style={bookContainerStyle}>
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
          <strong>{book.title}</strong>
        </Card.Title>

        <Card.Text as="div" style={textStyle}>
          <div className="">
            <strong>Author:</strong> {book.author}
          </div>
        </Card.Text>

        <Card.Text as="div" style={textStyle}>
          <div className="">
            <strong>Genre:</strong> {book.genre}
          </div>
        </Card.Text>

        <Card.Text as="div" style={textStyle}>
          <div className="">
            <strong>Rating:</strong> <Rating
                value={book.mean_rating}
                color="#f8e825"
              />
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Book;

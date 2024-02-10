import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";



function Book({ book }) {
  const bookContainerStyle = {
    border: '5px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    borderColor: 'red',
  };
  return (
    <Card className="my-3 p-3 rounded" style={bookContainerStyle}>
      <Link to={`/books/${book._id}`}>
        <Card.Img src={book.image} />
      </Link>

       <Card.Body style={{ height: '150px', overflow: 'auto' }}> 
          <Card.Title as="div" className="text-center" style={{ fontSize: '24px' }}>
            <strong>{book.title}</strong>
          </Card.Title>
       
       {/*
        <Card.Text as="div">
          <div className="my-3">
           Author: {book.author}
          </div>
        </Card.Text>
        <Card.Text as="div">
          <div className="my-3">
           Genre: {book.genre}
          </div>
        </Card.Text>
  */}
      </Card.Body>
    </Card>
  


  );
}

export default Book;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listBookDetails } from '../actions/bookActions';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import { useParams } from 'react-router-dom';
import { Button, Modal, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { Card } from 'react-bootstrap';

function BookDetail() {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate
  const [book, setBook] = useState({});

  useEffect(() => {
    dispatch(listBookDetails(_id));
  }, [dispatch, _id]);

  const bookDetails = useSelector(state => state.bookDetails);
  const { loading, error } = bookDetails || {};

  useEffect(() => {
    if (!loading && !error) {
      setBook(bookDetails.book);
    }
  }, [bookDetails, loading, error]);

  const handleReadNow = () => {
    navigate(`/chapters/${_id}`); // Navigate to ChapterByBook component with book id
  };

  return (
    <Container fluid>
      <Row className="mt-5 mb-5 h-full w-full">
        <Col md={6} style={{ margin: "0", padding: "0" }}>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
                <Card.Img src={book.image} alt={book.title} fluid />
          )}
        </Col>

        <Col md={5} style={{ backgroundColor: "#FCD5CE" }}>
          <Link
            to="/"
            className="close-button mt-3"
            style={{
              float: "right",
              padding: "1% 2% 1% 2%",
              border: "2px solid #6F1D1B",
              borderColor: "#6F1D1B",
              position: 'relative'
            }}
          >
            <i className="fas fa-times" style={{ color: "#6F1D1B" }}></i>
          </Link>

          <h4
            className="mt-4"
            style={{
              textAlign: "left",
              marginLeft: "3%",
              fontFamily: "Protest Guerrilla",
              fontWeight: "1",
              fontSize: "45px",
              color: "#6F1D1B",
            }}
          >
            {book?.title?.toUpperCase()}
          </h4>

          <h5
            className="mt-3"
            style={{
              textAlign: "left",
              marginLeft: "3%",
              fontSize: "25px",
              color: "#6F1D1B",
              marginBottom: "5px",
            }}
          >
            <strong style={{ fontFamily: "Blinker" }}>AUTHOR: </strong>
            <span
              style={{
                fontStyle: "italic",
                fontFamily: "Blinker",
                fontWeight: "1",
              }}
            >
              {book?.author?.toUpperCase()}
            </span>
          </h5>

          <h5
            style={{
              textAlign: "left",
              marginLeft: "3%",
              fontSize: "25px",
              color: "#6F1D1B",
              marginBottom: "5px",
            }}
          >
            <strong style={{ fontFamily: "Blinker" }}>GENRE: </strong>
            <span
              style={{
                fontStyle: "italic",
                fontFamily: "Blinker",
                fontWeight: "1",
              }}
            >
              {book?.genre?.toUpperCase()}
            </span>
          </h5>

          <h5
            style={{
              textAlign: "left",
              marginLeft: "3%",
              fontSize: "25px",
              color: "#6F1D1B",
              marginBottom: "5px",
            }}
          >
            <strong style={{ fontFamily: "Blinker" }}>LANGUAGE: </strong>
            <span
              style={{
                fontStyle: "italic",
                fontFamily: "Blinker",
                fontWeight: "1",
              }}
            >
              {book?.language?.toUpperCase()}
            </span>
          </h5>

          <h5
            style={{
              textAlign: "left",
              marginLeft: "3%",
              fontSize: "25px",
              color: "#6F1D1B",
              marginBottom: "5px",
            }}
          >
            <strong style={{ fontFamily: "Blinker" }}>SYNOPSIS: </strong>
            <p
              className="mt-2"
              style={{
                fontStyle: "italic",
                fontFamily: "Blinker",
                fontWeight: "1",
              }}
            >
              {book.synopsis}
            </p>
          </h5>

          <Button
            className="btn-block customButton"
            type="button"
            style={{
              width: "90%",
              fontWeight: "1",
              fontSize: "30px",
              color: "white",
              fontFamily: "Protest Guerrilla",
              borderRadius: "50px",
              backgroundColor: "#6F1D1B",
            }}
            onClick={handleReadNow} // Call handleReadNow function on button click
          >
            READ NOW!
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default BookDetail;

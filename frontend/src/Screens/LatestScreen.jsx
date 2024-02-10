import React, { useState, useEffect} from "react";
import { Row, Col} from 'react-bootstrap'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { listBooks } from '../actions/bookActions'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import Book from '../Components/Book'


function LatestScreen() {
  const dispatch = useDispatch();
  const bookList = useSelector((state) => state.bookList);
  const { loading, error, books } = bookList;
  useEffect(() => {
    dispatch(listBooks());
  }, []);



  return (
    <div className="mb-5">
      <h1 style={{ 
        textAlign: "center", 
        fontWeight: "1",
        color: "#BC1823",
        fontFamily: "Permanent Marker",
        textDecoration: "underline",
        fontSize: "60px",
        marginTop: "20px",
      }}>
        Latest Novels
      </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
      
        {[...books].reverse().map((book) => (
          <Col key={book._id} sm={12} md={6} lg={4} xl={3}>
            <Book book={book} />
          </Col>
        ))}
      </Row>
      
      )}
    </div>
  );
}

export default LatestScreen;

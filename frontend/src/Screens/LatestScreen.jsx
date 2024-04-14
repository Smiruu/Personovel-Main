import React, { useEffect } from "react";
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listBooks } from '../actions/bookActions';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import Book from '../Components/Book';
import { Link, Navigate } from "react-router-dom";
function LatestScreen() {
  const dispatch = useDispatch();
  const bookList = useSelector((state) => state.bookList);
  const { loading, error, books } = bookList;

  const userLoginInfo = useSelector((state) => state.userLogin.userInfo);
  const userRegisterInfo = useSelector((state) => state.userRegister.userInfo);
  const userInfo = userLoginInfo || userRegisterInfo;

  useEffect(() => {
    dispatch(listBooks());
  }, [dispatch]);

  // Sort books by date_added in descending order
  const sortedBooks = [...books].sort((a, b) => new Date(b.date_added) - new Date(a.date_added));

  if (!userInfo) {
    return <Navigate to="/login" />;
  }

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
      <Row>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          sortedBooks.map((book) => (
            <Col key={book._id} sm={12} md={6} lg={4} xl={3}>
              <Book book={book} />
            </Col>
          ))
        )}
      </Row>
    </div>
  );
}

export default LatestScreen;

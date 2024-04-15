import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listBooks } from "../actions/bookActions";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import Book from "../Components/Book";
import { Link, Navigate } from "react-router-dom";
function PopularScreen() {
  const dispatch = useDispatch();
  const bookList = useSelector((state) => state.bookList);
  const { loading, error, books } = bookList;

  const userLoginInfo = useSelector((state) => state.userLogin.userInfo);
  const userRegisterInfo = useSelector((state) => state.userRegister.userInfo);
  const userInfo = userLoginInfo || userRegisterInfo;

  useEffect(() => {
    dispatch(listBooks());
  }, [dispatch]);

  if (!userInfo) {
    return <Navigate to="/login" />;
  }
  const sortedBooks = [...books].sort((a, b) => b.mean_rating - a.mean_rating);

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
      <Row>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          sortedBooks.map((books) => (
            <Col key={books._id} sm={12} md={6} lg={4} xl={3}>
              <Book book={books} />
            </Col>
          ))
        )}
      </Row>
    </div>
  );
}

export default PopularScreen;

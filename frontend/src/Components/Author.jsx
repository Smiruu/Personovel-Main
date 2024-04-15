import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listAuthors } from "../actions/authorActions";
import Loader from "../Components/Loader";
import Message from "../Components/Message";

function Author() {
  const dispatch = useDispatch();
  const authorList = useSelector((state) => state.authorList);
  const { loading, error, authors } = authorList;
  useEffect(() => {
    dispatch(listAuthors());
  }, []);
  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <h1>Author</h1>
          {authors.map((author) => (
            <Col key={author.id} sm={12} md={6} lg={4} xl={3}>
              <div className="my-3">
                <h2>{author.name}</h2>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default Author;

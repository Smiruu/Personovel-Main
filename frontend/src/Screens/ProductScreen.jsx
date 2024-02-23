import React, { useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import axios from 'axios'

function ProductScreen() {
  const { id } = useParams();
  const [product, setProduct] = useState([])

  useEffect(() => {
    async function fetchProduct() {
      const {data} = await axios.get(`http://127.0.0.1:8000/api/products/${id}`)
      setProduct(data)
    }
    fetchProduct()
  }, [])
  return (
    <Container fluid>
      <Row className="mt-5 mb-5 h-full w-full">
        <Col md={6} style={{ margin: "0", padding: "0" }}>
          <Card.Img src={product.image} alt={product.name} fluid />
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
            {product.name.toUpperCase()}
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
              {product.author.toUpperCase()}
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
              {product.genre.toUpperCase()}
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
              {product.language.toUpperCase()}
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
            <strong style={{ fontFamily: "Blinker" }}>RATINGS: </strong>
            <span
              style={{
                fontStyle: "italic",
                fontFamily: "Blinker",
                fontWeight: "1",
              }}
            >
              {product.rating}
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
              {product.synopsis}
            </p>
          </h5>

          <Link
            to="/chapter"
            className="d-flex justify-content-center"
            style={{ textDecoration: "none" }}
          >
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
            >
              READ NOW!
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductScreen;

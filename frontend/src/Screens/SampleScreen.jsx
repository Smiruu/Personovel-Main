import React, { useState, useEffect} from "react";
import Product from "../Components/Product";
import { Row, Col, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from 'axios'

function SampleScreen() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function fetchProducts() {
      const {data} = await axios.get('http://127.0.0.1:8000/api/products/')
      setProducts(data)
    }
    fetchProducts()
  }, [])
  return (
    <Container fluid>
      <div>
        <Col style={{ backgroundColor: "#FCD5CE", padding: "20px" }}>
          <section id="Popular">
            <h1
              style={{
                textAlign: "center",
                color: "#AB0043",
                fontFamily: "Indie Flower",
              }}
            >
              Ever wondered what secrets the night holds and whether they could
              change the course of your destiny?
            </h1>

            <div
              style={{ height: "450px", overflow: "hidden", margin: "10px" }}
            >
              <Row className="g-2">
                {products.map((product) => (
                  <Col key={product._id}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
            </div>
            <h1
              style={{
                textAlign: "center",
                fontFamily: "Indie Flower",
                color: "#AB0043",
                marginBottom: '2%'
              }}
            >
              What if the key to unlocking your wildest dreams lies hidden
              within the pages of a novel, waiting for you to turn them?
            </h1>
          </section>
        </Col>

        <Col
          style={{
            backgroundColor: "#FCD5CE",
            padding: "20px",
            marginTop: "10%",
            marginBottom: "10%",
          }}
        >
          <section id="Latest">
            <h1
              style={{
                textAlign: "center",
                marginRight: "20px",
                marginLeft: "20px",
                marginTop: "40px",
                color: "#AB0043",
                fontFamily: "Indie Flower",
              }}
            >
              Are you ready to embark on an adventure that transcends reality
              and immerses you in a world where every question leads to a
              revelation?
            </h1>
            <div
              style={{ height: "450px", overflow: "hidden", margin: "10px" }}
            >
              <Row className="g-2">
                {products.map((product) => (
                  <Col key={product._id}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
            </div>
          </section>
          <h1
            className="mt-5"
            style={{
              textAlign: "center",
              marginRight: "20px",
              marginLeft: "20px",
              marginBlockEnd: "40px",
              color: "#AB0043",
              fontFamily: "Montserrat",
            }}
          >
            Unlock a world of exclusive content and personalized experiences –
            register now and be part of a community where every page turned
            reveals new connections and possibilities.
          </h1>
          <h1 style={{ textAlign: "center", marginBottom: "60px" }}>
            <Nav.Link as={Link} to="/register">
              <Button
                style={{
                  fontSize: "35px",
                  fontWeight: "1",
                  width: "300px",
                  height: "65px",
                  textAlign: "center",
                  fontFamily: "Protest Guerrilla",
                  backgroundColor: "#BC1823",
                  borderRadius: "50px",
                }}
                variant="primary"
              >
                GET STARTED
              </Button>
            </Nav.Link>
          </h1>
        </Col>
      </div>
    </Container>
  );
}

export default SampleScreen;

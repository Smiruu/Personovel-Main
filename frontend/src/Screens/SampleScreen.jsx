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
    <Container>
    
      <div>
        <Col style={{ backgroundColor: "#FCD5CE", marginBottom:'80px'}}>
            <section id="Popular">
            
          <h1
            style={{
              textAlign: "center",
              marginRight: "20px",
              marginLeft: "20px",
              marginBlockStart: "40px",
              color: '#bc5350',
              
            }}
          >
            Ever wondered what secrets the night holds and whether they could
            change the course of your destiny?
          </h1>

          <div style={{ height: "400px", overflow: "scroll", margin: "30px" }}>
            <Row>
              {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          </div>
          <h1
           style={{
            textAlign: "center",
            marginRight: "20px",
            marginLeft: "20px",
           
            color: '#bc5350',
          }}
          >
            What if the key to unlocking your wildest dreams lies hidden within
            the pages of a novel, waiting for you to turn them?
            
          </h1>
          
          </section>
        </Col>

        <Col style={{ backgroundColor: "#FCD5CE", }}>
          <section id="Latest">
            <h1
              style={{
                textAlign: "center",
                marginRight: "20px",
                marginLeft: "20px",
                marginTop: "40px",
                color: '#bc5350'
              }}
            >
              Are you ready to embark on an adventure that transcends reality
              and immerses you in a world where every question leads to a
              revelation?
            </h1>
            <div
              style={{ height: "400px", overflow: "scroll", margin: "30px" }}
            >
              <Row>
                {products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
            </div>
          </section>
          <h1
            style={{
              textAlign: "center",
              marginRight: "20px",
              marginLeft: "20px",
              marginBlockEnd: "40px",
              color: '#bc5350'
            }}
          >
            Unlock a world of exclusive content and personalized experiences –
            register now and be part of a community where every page turned
            reveals new connections and possibilities.
          </h1>
          <h1 style={{ textAlign: "center", marginBottom:'60px' ,}}>
            <Nav.Link as={Link} to="/register">
              <Button
                style={{ fontSize: "24px", width: "300px", height: "60px", marginBlockEnd: "40px",}}
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

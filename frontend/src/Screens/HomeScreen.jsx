import React, { useState, useEffect} from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../Components/Product";
import axios from 'axios'
function HomeScreen() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function fetchProducts() {
      const {data} = await axios.get('http://127.0.0.1:8000/api/products/')
      setProducts(data)
    }
    fetchProducts()
  }, [])
  return (
    <div>
      
      <Col>
      <h1 style={{ textAlign: "center" }}>Recommended For You</h1>

      <div style={{ height: "400px", overflow: "scroll", margin: "30px" }} >
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      </div>

      
      <h1 style={{ textAlign: "center" }}>Popular Novels</h1>
      <div style={{ height: "400px", overflow: "scroll", margin: "30px" }}>
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      </div>

      <section id="Latest">
        <h1 style={{ textAlign: "center" }}>Latest Novels</h1>
        <div style={{ height: "400px", overflow: "scroll", margin: "30px" }}>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </div>
      </section></Col>
    </div>
  );
}

export default HomeScreen;

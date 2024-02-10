import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

function Product({ product }) {
  const productContainerStyle = {
    border: "2px solid #dee2e6",
    borderRadius: "10px",
    overflow: "hidden",
    backgroundColor: "transparent",
    height: "95%",
    fontFamily: "Montserrat",
  };

  const imageStyle = {
    width: "100%",
    objectFit: "cover",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#000",
  };

  return (
    <Card className="my-3 rounded" style={productContainerStyle}>
      <Link to={`/product/${product._id}`} style={linkStyle}>
        <Card.Img src={product.image} style={imageStyle} />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`} style={linkStyle}>
          <Card.Title as="div" className="text-center mb-3">
            <strong>{product.name.toUpperCase()}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <div>
            <strong>AUTHOR:</strong> {product.author}
          </div>
        </Card.Text>

        <Card.Text as="div">
          <div>
            <strong>GENRE:</strong> {product.genre}
          </div>
        </Card.Text>

        <Card.Text as="div">
          <div className="mt-3 mb-0">
            <Rating
              value={product.rating}
              text={`${product.numReviews} review`}
              color="#BC1823"
            />
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;

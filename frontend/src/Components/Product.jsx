import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

function Product({ product }) {
  const productContainerStyle = {
    border: '5px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    borderColor: 'red',
  };
  return (
    <Card className="my-3 p-3 rounded" style={productContainerStyle}>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className="text-center">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <div className="my-3">
           Author: {product.author}
          </div>
        </Card.Text>

        <Card.Text as="div">
          <div className="my-3">
            <Rating
              value={product.rating}
              text={`${product.numReviews} review`}
            />
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;

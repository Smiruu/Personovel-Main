import React from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  Button,
  Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";


function Navbar() {
  return (

        <Navbar expand="lg" style={{ backgroundColor: "#F9DCC4" }}>
          <Container fluid>
            <Link to="/" className="link-no-underline">
              <Navbar.Brand>
                <Image
                  src="/PERSONOVEL.png"
                  className="logo img-fluid"
                  style={{ width: "200px", height: "50px" }}
                  alt="Brand Logo"
                />
              </Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="mb-2 mb-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Link to="/" className="link-no-underline">
                  <Nav.Link style={{ color: '#002960' }} href="#action2">Home</Nav.Link>
                </Link>
                
                  <Nav.Link style={{ color: '#BC1823' }} >Browse</Nav.Link>
                
                <Link to="/popular" className="link-no-underline">
                  <Nav.Link  style={{ color: '#BC1823' }} href="#action">Popular</Nav.Link>
                </Link>
                <Link to="/latest" className="link-no-underline">
                  <Nav.Link style={{ color: '#BC1823' }} className="custom-link" href="#action">Latest</Nav.Link>
                </Link>
                <Link to="/" className="link-no-underline">
                  <Nav.Link style={{ color: '#BC1823' }} href="#action2">Logout</Nav.Link>
                </Link>
              </Nav>
              <Form className="d-flex ms-auto">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button class="btn btn-lg btn-info">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
  )
}

export default Navbar
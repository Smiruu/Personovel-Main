import React from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";

function Start() {
  return (
    <Navbar expand="lg" style={{ backgroundColor: "#F9DCC4" }}>
      <Container fluid>
        <Link to="/" className="link-no-underline">
          <Navbar.Brand> 
            <Link to="/landing">
            <Image
              src="/PERSONOVEL.png"
              className="logo img-fluid"
              style={{ width: "200px", height: "50px" }}
              alt="Brand Logo"
            />
             </Link>
             
          </Navbar.Brand >
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto"
            style={{ maxHeight: "100px" }}
            navbarScroll>
          </Nav>
          <Nav.Link as={Link} to="/register">
  <Button variant="info" style={{ marginRight: '20px' }}>Register</Button>
</Nav.Link>

<Nav.Link as={Link} to="/login">
  <Button variant="primary" style={{ marginRight: '10px' }}>Login</Button>
</Nav.Link>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Start
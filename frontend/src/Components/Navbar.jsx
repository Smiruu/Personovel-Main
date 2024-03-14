import React, { useState } from "react";
import { Navbar, Nav, Container, Form, Button, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchBooks } from "./actions";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log("Search Query:", searchQuery); // Debugging: Log the search query
    dispatch(searchBooks({ title: searchQuery }));
    navigate("/search");
  };

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
            {/* Add your Nav links here */}
          </Nav>
          <Form onSubmit={handleSearch} className="d-flex ms-auto">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" className="btn btn-lg btn-info">
              Search
            </Button>
            {/* Debugging: Display current search query */}
            <div style={{ marginLeft: "10px" }}>
              <small>Search Query: {searchQuery}</small>
            </div>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbar;

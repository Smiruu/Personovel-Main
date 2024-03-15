import React, { useState } from "react";
import { Navbar, Nav, Container, Button, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchBooks } from "./actions";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = () => {
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
          </Nav>
          <div className="d-flex ms-auto align-items-center">
            <input
              type="search"
              placeholder="Search"
              className="form-control me-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              variant="info"
              className="btn-lg"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbar;

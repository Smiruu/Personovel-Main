import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  Button,
  Image,
  NavDropdown,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { searchBooks } from "../actions/searchActions";
import { logout } from "../actions/userActions";

function Header() {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Define searchQuery state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSearchToggle = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };
  const logoutButtonStyle = {
    cursor: "pointer",
  };

  const navLinkStyle = {
    color: "#BC1823",
    transition: "color 0.3s",
  };

  const customNavbarToggleStyle = {
    marginLeft: "32%",
    border: "2px solid #002960",
    backgroundColor: "transparent",
    borderRadius: "10px",
    borderColor: "#002960",
    boxShadow: "none",
  };

  const userLoginInfo = useSelector((state) => state.userLogin.userInfo);
  const userRegisterInfo = useSelector((state) => state.userRegister.userInfo);
  const userInfo = userLoginInfo || userRegisterInfo;

  const logoutHandler = () => {
    dispatch(logout());
    localStorage.removeItem("userInfo"); // Remove user info from localStorage
    navigate("/login"); // Redirect the user to the login page
  };

  const handleSearch = (e) => {
    navigate("/search");
  };

  return (
    <Navbar expand="lg" style={{ backgroundColor: "#F9DCC4" }}>
      <Container fluid>
        <Link to="/" className="link-no-underline">
          <Navbar.Brand>
            <Link to="/landing">
              <Image
                src="/PERSONOVEL.png"
                className="logo img-fluid"
                style={{ width: "200px", height: "50px", marginLeft: "70px" }}
                alt="Brand Logo"
              />
            </Link>
          </Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="mb-2 mb-lg-0"
            style={{
              maxHeight: "100px",
              marginLeft: "50px",
              fontFamily: "Fira Mono",
              display: "flex",
              alignItems: "center",
            }}
            navbarScroll
          >
            {userInfo ? (
              <>
                <Link to="/" className="link-no-underline">
                  <Nav.Link
                    style={navLinkStyle}
                    href="#action2"
                    onMouseEnter={(e) => (e.target.style.color = "#002960")}
                    onMouseLeave={(e) => (e.target.style.color = "#BC1823")}
                  >
                    HOME
                  </Nav.Link>
                </Link>

                <span style={{ color: "#BC1823", margin: "0 10px" }}>|</span>

                <Link to="/browse" className="link-no-underline">
                  <Nav.Link
                    style={navLinkStyle}
                    href="#action2"
                    onMouseEnter={(e) => (e.target.style.color = "#002960")}
                    onMouseLeave={(e) => (e.target.style.color = "#BC1823")}
                  >
                    BROWSE
                  </Nav.Link>
                </Link>

                <span style={{ color: "#BC1823", margin: "0 10px" }}>|</span>

                <Link to="/popular" className="link-no-underline">
                  <Nav.Link
                    style={navLinkStyle}
                    href="#action2"
                    onMouseEnter={(e) => (e.target.style.color = "#002960")}
                    onMouseLeave={(e) => (e.target.style.color = "#BC1823")}
                  >
                    POPULAR
                  </Nav.Link>
                </Link>

                <span style={{ color: "#BC1823", margin: "0 10px" }}>|</span>

                <Link to="/latest" className="link-no-underline">
                  <Nav.Link
                    style={navLinkStyle}
                    href="#action2"
                    onMouseEnter={(e) => (e.target.style.color = "#002960")}
                    onMouseLeave={(e) => (e.target.style.color = "#BC1823")}
                  >
                    LATEST
                  </Nav.Link>
                </Link>

                <span style={{ color: "#BC1823", margin: "0 10px" }}>|</span>

                <Nav title={userInfo.name} id="username">
                  <Nav.Item
                    href="#action2"
                    onClick={logoutHandler}
                    style={logoutButtonStyle}
                    onMouseEnter={(e) => (e.target.style.color = "#002960")}
                    onMouseLeave={(e) => (e.target.style.color = "#BC1823")}
                  >
                    LOGOUT
                  </Nav.Item>
                </Nav>
              </>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link
                    href="#action2"
                    onMouseEnter={(e) => (e.target.style.color = "#002960")}
                    onMouseLeave={(e) => (e.target.style.color = "#BC1823")}
                  >
                    LOGIN
                  </Nav.Link>
                </LinkContainer>

                <span style={{ color: "#BC1823", margin: "0 10px" }}>|</span>

                <LinkContainer to="/login">
                  <Nav.Link
                    href="#action2"
                    onMouseEnter={(e) => (e.target.style.color = "#BC1823")}
                    onMouseLeave={(e) => (e.target.style.color = "#002960")}
                  >
                    REGISTER
                  </Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>

          <Button
            class="btn btn-lg btn-info"
            onClick={handleSearch}
            style={{
              backgroundColor: "#002960",
              border: "none",
              borderRadius: "50px",
            }}
          >
            <i className="fa-solid fa-magnifying-glass" />
          </Button>

          <Link to="/Profile" className="link-no-underline">
            <Nav.Link
              style={{ color: "#002960", marginLeft: "10px" }}
              href="#action2"
            >
              <Image
                src="/Icon.png"
                className="me-1"
                alt="User Icon"
                style={{ width: "45px", height: "45px" }}
              />
            </Nav.Link>
          </Link>
      </Container>
    </Navbar>
  );
}

export default Header;
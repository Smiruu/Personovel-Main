import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button, Image, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";
import { getUserDetails } from "../actions/profileActions";

function Header() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  const handleShowLogoutModal = () => setShowLogoutModal(true);
  const handleCloseLogoutModal = () => setShowLogoutModal(false);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleSearch = () => {
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
                style={{ width: "200px", height: "50px", marginLeft: "20px" }}
                alt="Brand Logo"
              />
            </Link>
          </Navbar.Brand>
        </Link>

        {user && (
          <>
            <Navbar.Toggle aria-controls="navbarScroll" />

            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="mb-2 mb-lg-0"
                style={{
                  maxHeight: "100px",
                  marginLeft: "30px",
                  fontFamily: "Fira Mono",
                  display: "flex",
                  alignItems: "center",
                }}
                navbarScroll
              >
                <Link to="/" className="link-no-underline">
                  <Nav.Link
                    style={{ color: "#BC1823", transition: "color 0.3s" }}
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
                    style={{ color: "#BC1823", transition: "color 0.3s" }}
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
                    style={{ color: "#BC1823", transition: "color 0.3s" }}
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
                    style={{ color: "#BC1823", transition: "color 0.3s" }}
                    href="#action2"
                    onMouseEnter={(e) => (e.target.style.color = "#002960")}
                    onMouseLeave={(e) => (e.target.style.color = "#BC1823")}
                  >
                    LATEST
                  </Nav.Link>
                </Link>

                <span style={{ color: "#BC1823", margin: "0 10px" }}>|</span>

                <Nav title={user.name} id="username">
                  <Nav.Item
                    href="#action2"
                    onClick={handleShowLogoutModal}
                    style={{ cursor: "pointer" }}
                    onMouseEnter={(e) => (e.target.style.color = "#002960")}
                    onMouseLeave={(e) => (e.target.style.color = "#BC1823")}
                  >
                    LOGOUT
                  </Nav.Item>
                </Nav>
              </Nav>
            </Navbar.Collapse>
          </>
        )}

        <Button
          className="me-2"
          onClick={handleSearch}
          style={{
            backgroundColor: "#002960",
            border: "none",
            borderRadius: "50px",
          }}
        >
          <i className="fa-solid fa-magnifying-glass" />
        </Button>

        {user ? (
          <Link to="/Profile" className="link-no-underline">
            <Nav.Link
              style={{ color: "#002960", marginLeft: "10px" }}
              href="#action2"
            >
              {user.image && (
                <Image
                  src={user.image}
                  className="me-2"
                  alt="User Icon"
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                    border: "3px solid black",
                  }}
                />
              )}
            </Nav.Link>
          </Link>
        ) : (
          <>
            <Nav className="ms-auto">
              <div className="d-flex flex-row">
                {" "}
                <Link
                  to="/login"
                  style={{
                    fontFamily: "Blinker, san-serif",
                    fontWeight: "bold",
                    color: "white",
                    textDecoration: "none",
                  }}
                >
                  <Button
                    className="custom-button me-2"
                    style={{ borderColor: "black", backgroundColor: "#BC1823" }}
                    onMouseEnter={(e) => (
                      (e.target.style.color = "white"),
                      (e.target.style.backgroundColor = "#BC1823"),
                      (e.target.style.textDecoration = "none")
                    )}
                    onMouseLeave={(e) => (
                      (e.target.style.color = "white"),
                      (e.target.style.backgroundColor = "#002960"),
                      (e.target.style.textDecoration = "none")
                    )}
                  >
                    LOGIN
                  </Button>
                </Link>
                <Link
                  to="/login"
                  style={{
                    fontFamily: "Blinker, san-serif",
                    fontWeight: "bold",
                    color: "white",
                    textDecoration: "none",
                  }}
                >
                  <Button
                    className="custom-button"
                    style={{ borderColor: "black", backgroundColor: "#002960" }}
                    onMouseEnter={(e) => (
                      (e.target.style.color = "white"),
                      (e.target.style.backgroundColor = "#002960"),
                      (e.target.style.textDecoration = "none")
                    )}
                    onMouseLeave={(e) => (
                      (e.target.style.color = "white"),
                      (e.target.style.backgroundColor = "#BC1823"),
                      (e.target.style.textDecoration = "none")
                    )}
                  >
                    REGISTER
                  </Button>
                </Link>
              </div>
            </Nav>
          </>
        )}
      </Container>
      <Modal show={showLogoutModal} onHide={handleCloseLogoutModal}>
        <Modal.Header closeButton>
          <Modal.Title>Logout Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLogoutModal}>
            No
          </Button>
          <Button variant="primary" onClick={logoutHandler}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
}

export default Header;

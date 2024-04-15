import React, { useState, useEffect } from "react";
import { Container, Row, Col, Nav, Modal, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../actions/profileActions";
import { logout } from "../actions/userActions";

function Footer() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;
  const navigate = useNavigate();

  const navLinkStyle = {
    color: "#BC1823",
    transition: "color 0.3s",
    fontFamily: "Fira Mono",
    fontWeight: "bold",
    fontSize: "1.2rem",
  };

  const redirectToPDF = (pdfPath) => {
    window.open(pdfPath, "_blank");
  };

  const handleShowLogoutModal = () => setShowLogoutModal(true);
  const handleCloseLogoutModal = () => setShowLogoutModal(false);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
    setShowLogoutModal(false);
  };

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  return (
    <footer style={{ backgroundColor: "#F9DCC4" }}>
      <Container>
        <Row className="text-center py-4">
          <Col xs={12} md={1} className="mb-3 mb-md-0 mx-auto">
            <Link to="/about" className="link-no-underline">
              <Nav.Link
                style={navLinkStyle}
                href="#action1"
                onMouseEnter={(e) => (e.target.style.color = "#002960")}
                onMouseLeave={(e) => (e.target.style.color = "#BC1823")}
              >
                ABOUT
              </Nav.Link>
            </Link>
          </Col>
          <Col xs={12} md={1} className="mb-3 mb-md-0 mx-auto">
            <span className="d-none d-md-inline" style={{ color: "#BC1823" }}>
              {" "}
              |{" "}
            </span>
          </Col>

          <Col xs={12} md={2} className="mb-3 mb-md-0 mx-auto">
            <Link to="/contact" className="link-no-underline">
              <Nav.Link
                style={navLinkStyle}
                href="#action2"
                onMouseEnter={(e) => (e.target.style.color = "#002960")}
                onMouseLeave={(e) => (e.target.style.color = "#BC1823")}
              >
                CONTACT US
              </Nav.Link>
            </Link>
          </Col>
          <Col xs={12} md={1} className="mb-3 mb-md-0 mx-auto">
            <span className="d-none d-md-inline" style={{ color: "#BC1823" }}>
              {" "}
              |{" "}
            </span>
          </Col>

          <Col xs={12} md={1} className="mb-3 mb-md-0 mx-auto">
            <Nav.Link
              style={navLinkStyle}
              href="#action2"
              onClick={() => redirectToPDF("./Terms_Of_use.pdf")}
              onMouseEnter={(e) => (e.target.style.color = "#002960")}
              onMouseLeave={(e) => (e.target.style.color = "#BC1823")}
            >
              TERMS
            </Nav.Link>
          </Col>

          <Col xs={12} md={1} className="mb-3 mb-md-0 mx-auto">
            <span className="d-none d-md-inline" style={{ color: "#BC1823" }}>
              {" "}
              |{" "}
            </span>
          </Col>

          <Col xs={12} md={1} className="mb-3 mb-md-0 mx-auto">
            <Nav.Link
              style={navLinkStyle}
              href="#action2"
              onClick={() => redirectToPDF("./Policy_Privacy.pdf")}
              onMouseEnter={(e) => (e.target.style.color = "#002960")}
              onMouseLeave={(e) => (e.target.style.color = "#BC1823")}
            >
              POLICY
            </Nav.Link>
          </Col>

          {user && (
            <>
              <Col xs={12} md={1} className="mb-3 mb-md-0 mx-auto">
                <span
                  className="d-none d-md-inline"
                  style={{ color: "#BC1823" }}
                >
                  {" "}
                  |{" "}
                </span>
              </Col>

              <Col
                xs={12}
                md={1}
                className="mb-md-0 mx-auto"
                title={user.name}
                id="username"
              >
                <Nav.Link
                  style={navLinkStyle}
                  href="#action2"
                  onClick={handleShowLogoutModal}
                  onMouseEnter={(e) => (e.target.style.color = "#002960")}
                  onMouseLeave={(e) => (e.target.style.color = "#BC1823")}
                >
                  LOGOUT
                </Nav.Link>
              </Col>
            </>
          )}
        </Row>

        <Row className="text-center">
          <Col xs={12} className="mb-4 d-flex justify-content-center">
            <img
              src={process.env.PUBLIC_URL + "/PERSONOVEL.png"}
              alt="PERSONOVEL"
              style={{ maxWidth: "350px", height: "auto" }}
            />
          </Col>
        </Row>
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
    </footer>
  );
}

export default Footer;

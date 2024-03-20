import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./CSS/Footer.css";

function Footer() {
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

          <Col xs={12} md={1} className="mb-3 mb-md-0 mx-auto">
            <span className="d-none d-md-inline" style={{ color: "#BC1823" }}>
              {" "}
              |{" "}
            </span>
          </Col>

          <Col xs={12} md={1} className="mb-md-0 mx-auto">
            <Link to="/" className="link-no-underline">
              <Nav.Link
                style={navLinkStyle}
                href="#action2"
                onMouseEnter={(e) => (e.target.style.color = "#002960")}
                onMouseLeave={(e) => (e.target.style.color = "#BC1823")}
              >
                LOGOUT
              </Nav.Link>
            </Link>
          </Col>
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
    </footer>
  );
}

export default Footer;

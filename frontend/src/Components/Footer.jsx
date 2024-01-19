import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";





function Footer() {
  return (
    <footer style={{ backgroundColor: "#F9DCC4" }}>
      <Container>
        <Row>
          <Col className="text-center py-5 d-flex justify-content-center" style={{ paddingTop: "20px", paddingBottom: "30px" }} >
            <Link
            
              to="/about"
              className="mb-3 link-no-underline"
              style={{
                marginRight: "15vh",
                color: "#BC1823",
                fontFamily: "Arial",
                fontSize: "18px",
              }}
              // Add hover effect
              onMouseEnter={(e) => {
                e.target.style.color = "#002960";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#BC1823";
              }}
            >
              ABOUT
            </Link>
            {/* Repeat the same for other links */}
            <Link
              to="/contact"
              className="mb-3 link-no-underline"
              style={{
                marginRight: "15vh",
                color: "#BC1823",
                fontFamily: "Arial",
                fontSize: "18px",
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#002960";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#BC1823";
              }}
            >
              CONTACT
            </Link>
            {/* Repeat the same for other links */}
            <Link
              to="/terms"
              className="mb-3 link-no-underline"
              style={{
                marginRight: "15vh",
                color: "#BC1823",
                fontFamily: "Arial",
                fontSize: "18px",
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#002960";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#BC1823";
              }}
            >
              TERMS
            </Link>
            {/* Repeat the same for other links */}
            <Link
              to="/policy"
              className="mb-3 link-no-underline"
              style={{
                marginRight: "15vh",
                color: "#BC1823",
                fontFamily: "Arial",
                fontSize: "18px",
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#002960";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#BC1823";
              }}
            >
              POLICY
            </Link>
            <div
              className="mb-3"
              style={{
                marginRight: "15vh",
                color: "#BC1823",
                fontFamily: "Arial",
                fontSize: "18px",
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#002960";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#BC1823";
              }}
            >
              LOGOUT
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="text-center py-1 d-flex justify-content-center">
              <img
              src={process.env.PUBLIC_URL + "/PERSONOVEL.png"}
              alt="PERSONOVEL"
              style={{ width: "250px", height: "auto", marginTop: "-50px" }}
            />
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
export default Footer;
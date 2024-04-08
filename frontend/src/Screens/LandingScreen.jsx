import React from "react";
import { Nav, Container, Button } from "react-bootstrap";
import { Row, Col, Card } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SampleScreen from "./SampleScreen";


function LandingScreen() {
  const userLoginInfo = useSelector((state) => state.userLogin.userInfo);
  const userRegisterInfo = useSelector((state) => state.userRegister.userInfo);
  const userInfo = userLoginInfo || userRegisterInfo;

  // If user is logged in, redirect to home page
  if (userInfo) {
    return <Navigate to="/home" />;
  }

  return (
    <Container fluid>
      <Card className="border-0">
        <Card.Body className="color">
          <Row>
            {/* Image Column - Order in Mobile: 1, Desktop: 2 */}
            <Col md={6} className="text-center order-1 order-md-2">
              <Card.Img
                src="/images/books.png"
                className="logo_book"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </Col>

            {/* Text Column - Order in Mobile: 2, Desktop: 1 */}
            <Col md={6} className="text-center order-2 order-md-1">
              <h1
                style={{
                  color: "darkblue",
                  fontSize: "60px",
                  fontWeight: "1",
                  lineHeight: "1.2",
                  textAlign: "center",
                  marginBlockStart: "50px",
                  fontFamily: "Bevan",
                }}
              >
                CAN'T DECIDE WHERE AND WHAT TO READ?
              </h1>

              <h4
                style={{
                  fontSize: "25px",
                  fontWeight: "1",
                  lineHeight: "1.8",
                  fontFamily: "Indie Flower",
                }}
              >
                Unlock the gateway to boundless adventures and untold wonders!
                Let the stories find you. Your next great adventure is just a
                subscription away!
              </h4>

              <h1 style={{ marginBlockEnd: "160px" }}>
                <Nav.Link as={Link} to="/login">
                  <Button
                    style={{
                      fontSize: "24px",
                      fontWeight: "1",
                      width: "300px",
                      height: "60px",
                      textAlign: "center",
                      margin: "20px auto",
                      fontFamily: "Protest Guerrilla",
                      backgroundColor: "#BC1823",
                      borderRadius: '50px',
                    }}
                    variant="primary"
                  >
                    GET STARTED
                  </Button>
                </Nav.Link>
              </h1>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Col>
        <SampleScreen />
      </Col>
    </Container>
  );
}

export default LandingScreen;
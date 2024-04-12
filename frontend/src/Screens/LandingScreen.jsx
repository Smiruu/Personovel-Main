import React from "react";
import { Container, Button } from "react-bootstrap";
import { Row, Col, Card } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SampleScreen from "./SampleScreen";

function LandingScreen() {
  const userLoginInfo = useSelector((state) => state.userLogin.userInfo);
  const userRegisterInfo = useSelector((state) => state.userRegister.userInfo);
  const userInfo = userLoginInfo || userRegisterInfo;

  if (userInfo) {
    return <Navigate to="/home" />;
  }

  return (
    <Container fluid>
      <Row>
        <Col md={6} className="text-center order-1 order-md-2">
          <Card.Img
            src="/images/book.gif"
            className="logo_book"
            style={{ maxWidth: "85%", height: "85%", marginTop: "5%"}}
          />
        </Col>

        <Col md={6} className="text-center order-2 order-md-1">
          <h1
            style={{
              color: "darkblue",
              fontSize: "60px",
              fontWeight: "1",
              lineHeight: "1.2",
              textAlign: "center",
              marginTop: "15%",
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
            Unlock the gateway to boundless adventures and untold wonders! Let
            the stories find you. Your next great adventure is just a
            subscription away!
          </h4>

          <h1 style={{ marginBlockEnd: "160px" }}>
            <Link as={Link} to="/register">
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
                  borderRadius: "50px",
                }}
                variant="primary"
              >
                GET STARTED
              </Button>
            </Link>
          </h1>
        </Col>
      </Row>

      <SampleScreen />
    </Container>
  );
}

export default LandingScreen;

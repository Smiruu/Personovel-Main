import React from "react";
import {
  Nav,
  Container,
  Button,
} from "react-bootstrap";
import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Start from "../Components/Start";
import SampleScreen from "./SampleScreen";

function LandingScreen() {
  return (

    <Container fluid>


  <Card className="border-0">
      <Card.Body className="color" >
        <Row>
          <Col md={6} className="text-center py-3">
            <h1 style={{ color: "darkblue", fontSize: "60px", lineHeight: "1.2", textAlign: "center", marginBlockStart: "80px" }}>
              CAN’T DECIDE WHERE AND WHAT TO READ?
            </h1>

            <h4 style={{ fontSize: "25px", lineHeight: "1.8" }}>
              Unlock the gateway to boundless adventures and untold wonders! Let
              the stories find you. Your next great adventure is just a
              subscription away!
            </h4>

            <h1 style={{ marginBlockEnd: "160px" }}>
              <Nav.Link as={Link} to="/register">
                <Button
                  style={{
                    fontSize: "24px",
                    width: "300px",
                    height: "60px",
                    textAlign: "center",
                    margin: "20px auto",
                  }}
                  variant="primary"
                >
                  GET STARTED
                </Button>
              </Nav.Link>
            </h1>
          </Col>

          <Col md={6} className="text-center py-3">
            <Card.Img
              src="/images/books.png"
              className="logo_book"
              style={{ maxWidth: "100%", height: "auto" }}
            />
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

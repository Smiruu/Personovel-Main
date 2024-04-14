import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import { Link, useNavigate } from "react-router-dom";
import { Row, Container, Button, Col, Image, Modal } from "react-bootstrap";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginFailedModal, setShowLoginFailedModal] = useState(false);
  const [showEmptyFieldsModal, setShowEmptyFieldsModal] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setShowEmptyFieldsModal(true);
      return;
    }
    const success = await dispatch(login(email, password));
    if (!success) {
      setShowLoginFailedModal(true);
    } else {
      console.log(success);
      navigate("/home");
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/home");
    }
  }, [navigate, userInfo]);

  const handleCloseModal = () => {
    setShowLoginFailedModal(false);
    setShowEmptyFieldsModal(false);
  };

  return (
    <Container fluid>
      <Row
        style={{
          marginTop: "50px",
          marginBottom: "50px",
          marginLeft: "0",
          backgroundColor: "#FCD5CE",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "10px",
          height: "auto",
          boxShadow:
            "0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)",
        }}
      >
        <Col
          xs={12}
          md={6}
          style={{
            backgroundColor: "transparent",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ marginBottom: "20px", textAlign: "center" }}>
            <div
              style={{
                fontFamily: "Tilt Neon",
                marginBottom: "20px",
                margin: "20px",
                fontSize: "45px",
                fontWeight: "bold",
              }}
            >
              <FaSignInAlt style={{ marginBottom: "7px" }} /> SIGN IN
            </div>
            <form
              style={{
                backgroundColor: "#fcd5ce",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                padding: "0 20px",
                height: "100%",
                textAlign: "center",
              }}
              onSubmit={submitHandler}
            >
              <div
                style={{
                  marginBottom: "20px",
                  fontSize: "20px",
                  width: "150%",
                }}
              >
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    backgroundColor: "white",
                    border: "none",
                    borderRadius: "10px",
                    padding: "12px 15px",
                    width: "100%",
                  }}
                />
              </div>

              <div
                style={{
                  marginBottom: "20px",
                  fontSize: "20px",
                  width: "150%",
                }}
              >
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    backgroundColor: "white",
                    border: "none",
                    borderRadius: "10px",
                    padding: "12px 15px",
                    width: "100%",
                  }}
                />
              </div>

              <Link
                to="/reset-password"
                style={{
                  fontSize: "20px",
                  color: "#333",
                  textDecoration: "none",
                }}
              >
                Forgot your password?
              </Link>
              <br />
              <button
                variant="primary"
                type="submit"
                style={{
                  borderRadius: "20px",
                  backgroundColor: "maroon",
                  color: "white",
                  fontSize: "18px",
                  fontWeight: "bold",
                  padding: "12px 45px",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  transition: "transform 80ms ease-in",
                  fontFamily: "Blinker",
                }}
              >
                <FaSignInAlt /> LOGIN
              </button>
            </form>
          </div>
        </Col>

        <Col
          xs={12}
          md={{ span: 6, order: "last" }}
          style={{
            backgroundColor: "#FFB5A7",
            height: "100%",
            borderRadius: "10px",
            boxShadow:
              "0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "50px",
          }}
        >
          <div style={{ marginBottom: "20px", textAlign: "center" }}>
            <Link to="/">
              <Image
                src="/PERSONOVEL.png"
                alt=""
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  marginBottom: "10px",
                }}
              />
            </Link>
          </div>

          <div
            style={{
              textAlign: "center",
              fontFamily: "Coming Soon",
              fontSize: "20px",
            }}
          >
            <p>
              Step into a realm of endless stories tailored just for you, where
              every login welcomes you to a sanctuary of literary delights,
              awaiting the turn of each digital page to transport you to worlds
              unknown—your personalized escape into the extraordinary begins
              now.
            </p>
          </div>
          <div>
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Button
                variant="primary"
                style={{
                  marginTop: "5px",
                  borderRadius: "20px",
                  backgroundColor: "maroon",
                  color: "white",
                  fontSize: "15px",
                  fontWeight: "bold",
                  padding: "12px 45px",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  transition: "transform 0.2s ease-in-out",
                }}
              >
                <FaUserPlus /> Sign Up
              </Button>
            </Link>
          </div>
        </Col>
      </Row>

      <Modal
        show={showLoginFailedModal}
        onHide={() => setShowLoginFailedModal(false)}
        style={{
          fontFamily: "Arial, sans-serif",
        }}
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#343a40", color: "#ffffff" }}
        >
          <Modal.Title style={{ fontFamily: "Arial, sans-serif" }}>
            Login Failed
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontFamily: "Arial, sans-serif" }}>
          Please input the correct credentials.
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#f8f9fa" }}>
          <Button
            variant="secondary"
            onClick={() => setShowLoginFailedModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showEmptyFieldsModal}
        onHide={() => setShowEmptyFieldsModal(false)}
        style={{
          fontFamily: "Arial, sans-serif",
        }}
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#343a40", color: "#ffffff" }}
        >
          <Modal.Title style={{ fontFamily: "Arial, sans-serif" }}>
            Empty Fields Warning
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontFamily: "Arial, sans-serif" }}>
          Please fill up all the fields.
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#f8f9fa" }}>
          <Button
            variant="secondary"
            onClick={() => setShowEmptyFieldsModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default LoginScreen;

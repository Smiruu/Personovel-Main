import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/registerActions";
import { Link, useNavigate } from "react-router-dom";
import { Row, Container, Button, Col, Image, Modal } from "react-bootstrap";
import { FaUserPlus, FaSignInAlt } from "react-icons/fa";

function RegistrationScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showEmptyFieldsModal, setShowEmptyFieldsModal] = useState(false);
  const [showRegistrationErrorsModal, setShowRegistrationErrorsModal] =
    useState(false);
  const userRegister = useSelector((state) => state.userRegister.userInfo);

  const signupHandler = async (e) => {
    e.preventDefault();
    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !password2.trim()
    ) {
      setShowEmptyFieldsModal(true);
      return;
    }
    // Password requirements without special characters
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setShowRegistrationErrorsModal(true);
      return;
    }
    if (/\s/.test(name)) {
      setShowRegistrationErrorsModal(true);
      return;
    }
    if (password !== password2) {
      setShowRegistrationErrorsModal(true);
      return;
    }
    try {
      const success = await dispatch(
        register(name, email, password, password2)
      );
      if (success) {
        navigate("/otp");
      } else {
        alert("This email has already been taken.");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("User with this email already exists. Please log in instead.");
      } else {
        alert(
          "An error occurred while processing your registration. Please try again later."
        );
        console.error("Registration error:", error);
      }
    }
  };

  const handleCloseModal = () => {
    setShowEmptyFieldsModal(false);
    setShowRegistrationErrorsModal(false);
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
          md={{ span: 6, order: 1 }}
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
              to="/login"
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
                <FaSignInAlt /> SIGN IN
              </Button>
            </Link>
          </div>
        </Col>

        <Col
          xs={12}
          md={{ span: 6, order: "last" }}
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
              <FaUserPlus style={{ marginBottom: "7px" }} /> REGISTER
            </div>
            <form
              onSubmit={signupHandler}
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
            >
              <div
                style={{
                  marginBottom: "20px",
                  fontSize: "20px",
                  width: "150%",
                }}
              >
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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

              <div
                style={{
                  marginBottom: "20px",
                  fontSize: "20px",
                  width: "150%",
                }}
              >
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  style={{
                    backgroundColor: "white",
                    border: "none",
                    borderRadius: "10px",
                    padding: "12px 15px",
                    width: "100%",
                  }}
                />
              </div>

              <button
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
                <FaUserPlus /> REGISTER
              </button>
            </form>
          </div>
        </Col>
      </Row>

      <Modal
        show={showRegistrationErrorsModal}
        onHide={handleCloseModal}
        style={{
          fontFamily: "Arial, sans-serif",
        }}
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#343a40", color: "#ffffff" }}
        >
          <Modal.Title style={{ fontFamily: "Arial, sans-serif" }}>
            Registration Error
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontFamily: "Arial, sans-serif" }}>
          {showRegistrationErrorsModal && (
            <>
              {/\s/.test(name) && (
                <p style={{ color: "#dc3545" }}>
                  - No spaces allowed in the name field.
                </p>
              )}
              {!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password) && (
                <p style={{ color: "#dc3545" }}>
                  - Password must contain at least 8 characters, including
                  uppercase, lowercase, and number.
                </p>
              )}
              {password !== password2 && (
                <p style={{ color: "#dc3545" }}>- Passwords do not match.</p>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#f8f9fa" }}>
          <Button variant="secondary" onClick={handleCloseModal}>
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

export default RegistrationScreen;

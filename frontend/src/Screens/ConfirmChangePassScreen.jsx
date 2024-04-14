import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Form, Button, Alert, Modal } from "react-bootstrap";
import { FaLock, FaExclamationCircle } from "react-icons/fa";

function ConfirmChangePass() {
  const { uid, token } = useParams();
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [warnings, setWarnings] = useState([]);
  const navigate = useNavigate();

  const handleCloseModal = () => setShowModal(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    const newWarnings = [];

    // Check if passwords match
    if (password !== password2) {
      newWarnings.push("Passwords do not match");
    }

    // Check if password fields are empty or contain spaces
    if (!password.trim() || !password2.trim() || password.includes(" ")) {
      newWarnings.push("No spaces allowed in the password field");
    }

    // Check password requirements
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      newWarnings.push("Password must contain at least 8 characters, including uppercase, lowercase, and number");
    }

    // Show modal if there are any warnings
    if (newWarnings.length > 0) {
      setWarnings(newWarnings);
      setShowModal(true);
      return;
    }

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/user/reset-password/${uid}/${token}/`,
        {
          password,
          password2,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handle the response as needed
      console.log("Confirm Reset Password Response:", response.data);

      // Show success message
      setSuccessMessage("Password changed successfully");

      // Redirect to the login page after successful confirmation
      navigate("/login");
    } catch (error) {
      // Handle errors
      console.error("Error confirming reset password:", error.message);
    }
  };

  useEffect(() => {
    // Optional: You can add additional logic here if needed when the component mounts
    // For example, check if uid and token are present in the URL
    // and take appropriate actions
  }, [navigate]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Card
        style={{
          width: "400px",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1 style={{ textAlign: "center", color: "#002960", marginBottom: "30px" }}>
          <FaLock style={{ marginRight: "10px" }} />
          CONFIRM CHANGE PASSWORD
        </h1>

        {successMessage && (
          <Alert variant="success" style={{ marginBottom: "15px" }}>
            {successMessage}
          </Alert>
        )}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="password" style={{ marginBottom: "20px" }}>
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password2">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            block
            style={{
              marginTop: "15px",
              backgroundColor: "#007bff",
              borderColor: "#007bff",
            }}
          >
            Confirm
          </Button>
        </Form>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            <FaExclamationCircle style={{ marginRight: "10px", color: "#ff6b6b" }} />
            Warning
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {warnings.map((warning, index) => (
              <li key={index}>{warning}</li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ConfirmChangePass;

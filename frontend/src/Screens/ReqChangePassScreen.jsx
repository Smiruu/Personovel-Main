import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Modal } from "react-bootstrap";
import {
  FaEnvelope,
  FaSpinner,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

function RequestChangePass() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disableResend, setDisableResend] = useState(false);
  const [remainingTime, setRemainingTime] = useState(60);
  const [showEmailWarning, setShowEmailWarning] = useState(false);

  const handleCloseModal = () => setShowEmailWarning(false);

  useEffect(() => {
    let timer;
    if (disableResend && remainingTime > 0) {
      timer = setTimeout(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (remainingTime === 0) {
      setDisableResend(false);
      setRemainingTime(60);
    }

    return () => clearTimeout(timer);
  }, [disableResend, remainingTime]);

  useEffect(() => {
    let timer;
    if (emailSent) {
      timer = setTimeout(() => {
        setEmailSent(false);
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [emailSent]);

  const handleRequestPass = async (e) => {
    if (e) {
      e.preventDefault();
    }

    if (!email.trim()) {
      setShowEmailWarning(true);
      return;
    } else {
      setShowEmailWarning(false);
    }

    setLoading(true);

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/user/send-reset-password-email/",
        {
          email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setEmailSent(true);
      setLoading(false);
      setDisableResend(true);
      setRemainingTime(60);
    } catch (error) {
      console.error("Error making request password API call:", error.message);
      setLoading(false);
    }
  };

  const handleResendClick = () => {

    if (!email.trim()) {
      setShowEmailWarning(true);
      return;
    }

    setEmailSent(false);
    setDisableResend(true);
    handleRequestPass();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form
        onSubmit={handleRequestPass}
        style={{ width: "50%", textAlign: "center" }}
      >
        <h1
          style={{
            fontFamily: "Arial, sans-serif",
            color: "#002960",
          }}
        >
          REQUEST CHANGE PASSWORD
        </h1>

        <Form.Group controlId="email">
          <Form.Label
            style={{ fontFamily: "Arial, sans-serif", color: "#002960" }}
          ></Form.Label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FaEnvelope style={{ marginRight: "10px", color: "#002960" }} />
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </Form.Group>

        {loading && (
          <p
            style={{
              fontFamily: "Arial, sans-serif",
              color: "#002960",
              marginTop: "10px",
            }}
          >
            <FaSpinner className="fa-spin" style={{ marginRight: "5px" }} />
            Loading...
          </p>
        )}
        {emailSent && (
          <p
            style={{
              fontFamily: "Arial, sans-serif",
              color: "green",
              marginTop: "10px",
            }}
          >
            <FaCheckCircle style={{ marginRight: "5px" }} />
            The link has been sent to your inbox.
          </p>
        )}
        <Button
          type="submit"
          variant="primary"
          disabled={loading}
          style={{ width: "100%", marginTop: "10px" }}
        >
          Request Change Password
        </Button>
      </Form>

      <div style={{ marginTop: "10px", width: "50%" }}>
        <Button
          variant="secondary"
          onClick={handleResendClick}
          disabled={disableResend || loading}
          style={{ width: "100%" }}
        >
          Resend{" "}
          {disableResend && remainingTime > 0
            ? `(${remainingTime} seconds)`
            : ""}
        </Button>
      </div>

      <Modal show={showEmailWarning} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please input email.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default RequestChangePass;

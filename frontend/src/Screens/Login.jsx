import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import { register } from "../actions/registerActions";
import { Button, Modal } from "react-bootstrap";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Container = styled.div`
  background-color: #fcd5ce;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 75%;
  min-height: 400px;
  margin-left: 175px;

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
  }
`;

const SignUpContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  ${(props) =>
    props.signIn !== true
      ? `
        transform: translateX(100%);
        opacity: 1;
        z-index: 5;
    `
      : null}

  @media (max-width: 768px) {
    width: 100%;
    opacity: 1;
    z-index: 5;
    transform: translateX(0%);
  }
`;

const SignInContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
  ${(props) => (props.signIn !== true ? `transform: translateX(100%);` : null)}

  @media (max-width: 768px) {
    width: 100%;
    transform: translateX(0%);
  }
`;

const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
  ${(props) => (props.signIn !== true ? `transform: translateX(-100%);` : null)}

  @media (max-width: 768px) {
    width: 100%;
    left: 0;
    transform: translateX(0%);
  }
`;

const Overlay = styled.div`
  background: #ffb5a7;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  ${(props) => (props.signIn !== true ? `transform: translateX(50%);` : null)}

  @media (max-width: 768px) {
    width: 100%;
    left: 0;
    transform: translateX(0%);
  }
`;

const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;

const LeftOverlayPanel = styled(OverlayPanel)`
  transform: translateX(-20%);
  ${(props) => (props.signIn !== true ? `transform: translateX(0);` : null)}

  @media (max-width: 768px) {
    width: 100%;
    transform: translateX(0%);
  }
`;

const RightOverlayPanel = styled(OverlayPanel)`
  right: 0;
  transform: translateX(0);
  ${(props) => (props.signIn !== true ? `transform: translateX(20%);` : null)}

  @media (max-width: 768px) {
    width: 100%;
    transform: translateX(0%);
  }
`;

const Form = styled.form`
  background-color: #fcd5ce;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 20px;
  height: 100%;
  text-align: center;
`;

const Title = styled.h1`
  font-weight: bold;
  margin: 0;
  margin-bottom: 10px;
`;

const Input = styled.input`
  background-color: white;
  border: none;
  border-radius: 10px;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
`;

const Button1 = styled(Button)`
  border-radius: 20px;
  background-color: maroon;
  color: white;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }

  margin-top: 20px;
`;

const Button2 = styled(Button)`
  border-radius: 20px;
  background-color: maroon;
  color: white;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }
`;

const GhostButton = styled(Button)`
  border-radius: 20px;
  background-color: maroon;
  color: white;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const Anchor = styled.a`
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
`;

const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 100;
  color: black;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 0px 0 20px;
`;

function LoginScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [showLoginFailedModal, setShowLoginFailedModal] = useState(false);
  const [showEmptyFieldsModal, setShowEmptyFieldsModal] = useState(false);
  const [showRegistrationErrorsModal, setShowRegistrationErrorsModal] =
    useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const userRegister = useSelector((state) => state.userRegister.userInfo);
  const { error, loading, userInfo } = userLogin || userRegister;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signIn, toggle] = React.useState(true);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setShowEmptyFieldsModal(true); // Show empty fields warning modal
      return;
    }
    const success = await dispatch(login(email, password));
    if (!success) {
      setShowLoginFailedModal(true); // Show login failed modal
    } else {
      console.log(success);
      navigate("/home");
    }
  };

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

  const handleForgotPassword = () => {
    navigate("/reset-password");
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/home");
    }
  }, [navigate, userInfo]);

  const handleCloseModal = () => {
    setShowLoginFailedModal(false);
    setShowEmptyFieldsModal(false);
    setShowRegistrationErrorsModal(false);
  };

  return (
    <Container>
      <SignUpContainer signIn={signIn}>
        <Form onSubmit={signupHandler}>
          <Title>
            <FaUserPlus /> CREATE ACCOUNT
          </Title>
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
          <Button1 type="submit">
            <FaUserPlus /> Sign Up
          </Button1>
        </Form>
      </SignUpContainer>

      <SignInContainer signIn={signIn}>
        <Form onSubmit={submitHandler}>
          <Title>
            <FaSignInAlt /> SIGN IN
          </Title>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Anchor href="#" onClick={handleForgotPassword}>
            Forgot your password?
          </Anchor>
          <Button2 type="submit">
            <FaSignInAlt /> LogIn
          </Button2>
        </Form>
      </SignInContainer>

      <OverlayContainer signIn={signIn}>
        <Overlay signIn={signIn}>
          <LeftOverlayPanel signIn={signIn}>
            <Title>
              <img src="/PERSONOVEL.png" alt="" />
            </Title>
            <Paragraph>
              Embark on an exhilarating literary journey beyond the realms of
              imagination, where each subscription unlocks a portal to
              captivating worlds, riveting characters, and uncharted narratives
              that will keep you on the edge of your seat—welcome to a
              subscription like no other, where the next chapter is always an
              adventure waiting to unfold.
            </Paragraph>
            <GhostButton onClick={() => toggle(true)}>
              <FaSignInAlt /> Sign In
            </GhostButton>
          </LeftOverlayPanel>

          <RightOverlayPanel signIn={signIn}>
            <Title>
              <img src="/PERSONOVEL.png" alt="" />
            </Title>
            <Paragraph>
              Step into a realm of endless stories tailored just for you, where
              every login welcomes you to a sanctuary of literary delights,
              awaiting the turn of each digital page to transport you to worlds
              unknown—your personalized escape into the extraordinary begins
              now.
            </Paragraph>
            <GhostButton onClick={() => toggle(false)}>
              <FaUserPlus /> Sign Up
            </GhostButton>
          </RightOverlayPanel>
        </Overlay>
      </OverlayContainer>

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

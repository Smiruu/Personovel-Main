import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Form, Button } from 'react-bootstrap'; // Import Form and Button from react-bootstrap

function RequestChangePass() {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false); // State variable to track if the email has been sent
  const [loading, setLoading] = useState(false); // State variable to track loading state
  const [disableResend, setDisableResend] = useState(false); // State variable to track if resend button should be disabled
  const [remainingTime, setRemainingTime] = useState(60); // State variable to track remaining time, initially set to 60 seconds

  useEffect(() => {
    let timer;
    if (disableResend && remainingTime > 0) {
      timer = setTimeout(() => {
        setRemainingTime(prevTime => prevTime - 1);
      }, 1000); // Update every second
    } else if (remainingTime === 0) {
      setDisableResend(false); // Enable resend button when countdown reaches 0
      setRemainingTime(60); // Reset remaining time to 60 seconds
    }

    return () => clearTimeout(timer);
  }, [disableResend, remainingTime]);

  useEffect(() => {
    let timer;
    if (emailSent) {
      timer = setTimeout(() => {
        setEmailSent(false);
      }, 5000); // Set timer to hide the message after 5 seconds
    }

    return () => clearTimeout(timer);
  }, [emailSent]);

  const handleRequestPass = async (e) => {
    if (e) {
      e.preventDefault(); // Prevent the default form submission behavior
    }

    setLoading(true); // Set loading state to true while waiting for email request

    try {
      await axios.post(
        'http://127.0.0.1:8000/api/user/send-reset-password-email/',
        {
          email,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Set the emailSent state to true after successfully sending the email
      setEmailSent(true);
      setLoading(false); // Set loading state to false after sending the email
      setDisableResend(true); // Disable resend button after sending the email
      setRemainingTime(60); // Set remaining time to 60 seconds
    } catch (error) {
      // Handle errors
      console.error('Error making request password API call:', error.message);
      setLoading(false); // Set loading state to false in case of error
    }
  };

  const handleResendClick = () => {
    setEmailSent(false); // Reset emailSent state to allow resending
    setDisableResend(true); // Disable the resend button again
    handleRequestPass(); // Resend the email
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <Form onSubmit={handleRequestPass} style={{ width: '50%' }}>
        <h1 style={{ textAlign: 'center', color: 'black'}}>Request Change Password</h1>

        <Form.Label style={{ color: 'black' }}>Email</Form.Label>
        <Form.Group controlId='email'>
          <Form.Control
            className='form-control'
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        {/* Display a loading spinner while waiting for email request */}
        {loading && <p style={{ color: 'black', textAlign: 'center' }}>Loading...</p>}

        {/* Display a message if the email has been sent */}
        {emailSent && <p style={{ color: 'black', textAlign: 'center' }}>The link has been sent to your inbox.</p>}

        {/* Disable the button while loading */}
        <Button className='login-button glow-button' type='submit' variant='primary' disabled={loading} style={{ width: '50%' }}>
          Request Change Password
        </Button>
      </Form>

      {/* Resend button */}
      <div style={{ marginTop: '10px', width: '50%' }}>
        <Button
          className='login-button glow-button'
          variant='secondary'
          onClick={handleResendClick}
          disabled={disableResend || loading} // Disable resend button when loading or during countdown
          style={{ width: '100%' }}
        >
          Resend {disableResend && remainingTime > 0 ? `(${remainingTime} seconds)` : ''}
        </Button>
      </div>
    </div>
  );
}

export default RequestChangePass;

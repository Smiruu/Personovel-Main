import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Form, Button, Alert } from 'react-bootstrap'; // Add missing imports

function ConfirmChangePass() {
  const { uid, token } = useParams();
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const submitHandler = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== password2) {
      alert('Passwords do not match');
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
            'Content-Type': 'application/json',
          },
        }
      );

      // Handle the response as needed
      console.log('Confirm Reset Password Response:', response.data);

      // Show success message
      setSuccessMessage('Password changed successfully');

      // Redirect to the login page after successful confirmation
      navigate('/login');
    } catch (error) {
      // Handle errors
      console.error('Error confirming reset password:', error.message);
    }
  };

  useEffect(() => {
    // Optional: You can add additional logic here if needed when the component mounts
    // For example, check if uid and token are present in the URL
    // and take appropriate actions
  }, [navigate]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <Form onSubmit={submitHandler}>
          <h1 style={{ textAlign: 'center', color: 'black' }}>Confirm Change Password</h1>

          <Form.Label style={{ color: 'black' }}>New Password</Form.Label>
          <Form.Group controlId='password'>
            <Form.Control
              className='form-control'
              type="password"
              placeholder='Enter new password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Label style={{ color: 'black' }}>Confirm Password</Form.Label>
          <Form.Group controlId='password2'>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </Form.Group>

          <Button className='login-button glow-button' type='submit' variant='primary'>
            Confirm
          </Button>

        </Form>

    </div>
  );
}

export default ConfirmChangePass;

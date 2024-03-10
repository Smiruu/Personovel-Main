import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOTP, resendOTP } from '../actions/otpActions';
import { VERIFY_OTP_REQUEST, RESEND_OTP_REQUEST } from '../constants/otpConstants';

const OTPScreen = () => {
  const [otpCode, setOtpCode] = useState('');
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(300); // Countdown starts from 300 seconds

  const dispatch = useDispatch();
  const userId = localStorage.getItem('user_id');
  const otpId = localStorage.getItem('otp_id');
  console.log(localStorage.getItem('user_id'));
console.log(localStorage.getItem('otp_id'));
    

  const otpState = useSelector((state) => state.otp);
  const { verifyOtpLoading, verifyOtpError, resendOtpLoading, resendOtpError } = otpState;

  const handleVerifyOTP = () => {
    if (userId && otpId) {
      dispatch(verifyOTP(userId, otpId, otpCode)); // Pass userId, otpId, and otpCode to verifyOTP action
    } else {
      // Handle the case when userId or otpId is not set
      console.error("userId or otpId is not set in localStorage");
    }
  };
  
  const handleResendOTP = () => {
    if (userId && otpId) {
      dispatch(resendOTP(userId, otpId, otpCode)); // Pass userId, otpId, and otpCode to resendOTP action
      setResendDisabled(true); // Disable resend button
      setCountdown(300); // Reset countdown to 300 seconds
    } else {
      // Handle the case when userId or otpId is not set
      console.error("userId or otpId is not set in localStorage");
    }
  };
  

  // Countdown timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Effect to enable resend button after countdown reaches 0
  useEffect(() => {
    if (countdown === 0) {
      setResendDisabled(false);
    }
  }, [countdown]);

  return (
    <div>
      <h2>OTP Verification</h2>
      {verifyOtpLoading && <p>Verifying OTP...</p>}
      {verifyOtpError && <p>Error: {verifyOtpError}</p>}
      <input type="text" value={otpCode} onChange={(e) => setOtpCode(e.target.value)} />
      <button onClick={handleVerifyOTP}>Verify OTP</button>

      <h2>Resend OTP</h2>
      <p>Resend OTP in: {countdown} seconds</p>
      {resendOtpLoading && <p>Resending OTP...</p>}
      {resendOtpError && <p>Error: {resendOtpError}</p>}
      <button onClick={handleResendOTP} disabled={resendDisabled}>Resend OTP</button>
    </div>
  );
};

export default OTPScreen;

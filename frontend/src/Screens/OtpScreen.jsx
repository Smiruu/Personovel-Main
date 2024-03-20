import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyOTP, resendOTP } from "../actions/otpActions";
import {
  VERIFY_OTP_REQUEST,
  RESEND_OTP_REQUEST,
} from "../constants/otpConstants";
import { useParams, useNavigate } from 'react-router-dom';


const OTPScreen = () => {
  const [otpCode, setOtpCode] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(300); // Countdown starts from 300 seconds
  const [resendClicked, setResendClicked] = useState(false); // State to track if resend button has been clicked
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Retrieving userInfo from Redux store
  const userInfo = useSelector((state) => state.userRegister.userInfo);
  const userId = userInfo ? userInfo.user_id : null;
  const otpId = userInfo ? userInfo.otp_id : null;

  const otpState = useSelector((state) => state.otp);
  const { verifyOtpLoading, verifyOtpError, resendOtpLoading, resendOtpError } =
    otpState;

    const handleVerifyOTP = async (event) => {
      event.preventDefault();
      try {
        await dispatch(verifyOTP(userId, otpId, otpCode));
        // Check if OTP is set to true in local storage
        const otpVerified = localStorage.getItem("OTP");
        if (otpVerified === "true") {
          navigate('/home');
        }
      } catch (error) {
        console.error("userId or otpId is not set in userInfo");
      }
    }
  const handleResendOTP = () => {
    if (userId && otpId) {
      dispatch(resendOTP(userId, otpId, otpCode));
      setResendDisabled(true);
      setResendClicked(true); // Set resendClicked to true when resend button is clicked
      setCountdown(120);
      localStorage.setItem("countdown", countdown); // Store countdown value in local storage
    } else {
      console.error("userId or otpId is not set in userInfo");
    }
  };

  useEffect(() => {
    const storedCountdown = localStorage.getItem("countdown");
    if (storedCountdown) {
      setCountdown(parseInt(storedCountdown, 10)); // Retrieve countdown value from local storage
    }

    if (countdown > 0 && resendClicked) {
      // Start countdown only if resend button has been clicked
      const interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
        localStorage.setItem("countdown", countdown); // Update countdown value in local storage
      }, 1000);

      return () => clearInterval(interval);
    }

    // Update resendDisabled when countdown finishes
    if (countdown === 0) {
      setResendDisabled(false);
    }
  }, [countdown, resendClicked]);

  return (
    <div>
      <h2>OTP Verification</h2>
      {verifyOtpLoading && <p>Verifying OTP...</p>}
      {verifyOtpError && <p>Error: {verifyOtpError}</p>}
      <input
        type="text"
        value={otpCode}
        onChange={(e) => setOtpCode(e.target.value)}
      />
      <button onClick={handleVerifyOTP}>Verify OTP</button>

      <h2>Resend OTP</h2>
      <p>Resend OTP in: {countdown} seconds</p>
      {resendOtpLoading && <p>Resending OTP...</p>}
      {resendOtpError && <p>Error: {resendOtpError}</p>}
      <button onClick={handleResendOTP} disabled={resendDisabled}>
        Resend OTP
      </button>
    </div>
  );
};

export default OTPScreen;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyOTP, resendOTP } from "../actions/otpActions";
import { useNavigate } from "react-router-dom";

const OTPScreen = () => {
  const [otpCode, setOtpCode] = useState("");
  const [resendDisabled, setResendDisabled] = useState(
    localStorage.getItem("resendDisabled") === "true" // Check if button was disabled
  );
  const [countdown, setCountdown] = useState(
    localStorage.getItem("countdown") || 300
  );
  const [countdownActive, setCountdownActive] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.userRegister.userInfo);
  const userId = userInfo ? userInfo.user_id : null;
  const otpId = userInfo ? userInfo.otp_id : null;

  const otpState = useSelector((state) => state.otp);
  const { verifyOtpLoading, verifyOtpError, resendOtpError } = otpState;

  const handleVerifyOTP = async (event) => {
    event.preventDefault();
    try {
      await dispatch(verifyOTP(userId, otpId, otpCode));
      navigate("/home");
    } catch (error) {
      console.error("userId or otpId is not set in userInfo");
    }
  };

  const handleResendOTP = () => {
    if (userId && otpId) {
      dispatch(resendOTP(userId, otpId, otpCode));
      setResendDisabled(true);
      localStorage.setItem("resendDisabled", "true"); // Set button disabled flag
      setCountdown(300);
      localStorage.setItem("countdown", 300);
      setCountdownActive(true);
    } else {
      console.error("userId or otpId is not set in userInfo");
    }
  };

  useEffect(() => {
    if (countdownActive) {
      const interval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 0) {
            setCountdownActive(false);
            clearInterval(interval);
            setResendDisabled(false);
            localStorage.removeItem("resendDisabled"); // Remove button disabled flag
            return 0;
          } else {
            localStorage.setItem("countdown", prevCountdown - 1);
            return prevCountdown - 1;
          }
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [countdownActive]);

  useEffect(() => {
    // Check if resend button was clicked before
    const resendClicked = localStorage.getItem("resendClicked") === "true";
    if (resendClicked) {
      setResendDisabled(true);
      setCountdownActive(true);
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "20px auto",
        maxWidth: "800px",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "400px" }}>
        <h2 style={{ fontWeight: "bold", color: "#6F1D1B" }}>
          OTP Verification
        </h2>
        {verifyOtpLoading && <p>Verifying OTP...</p>}
        {verifyOtpError && <p>Error: {verifyOtpError}</p>}
        <input
          type="text"
          value={otpCode}
          placeholder="Enter OTP code"
          onChange={(e) => setOtpCode(e.target.value)}
          style={{
            padding: "10px",
            margin: "10px 0",
            width: "100%",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleVerifyOTP}
          style={{
            padding: "10px 20px",
            backgroundColor: "#6F1D1B",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Verify OTP
        </button>
      </div>

      <div
        style={{ textAlign: "center", maxWidth: "400px", marginTop: "20px" }}
      >
        <button
          onClick={handleResendOTP}
          disabled={resendDisabled}
          style={{
            padding: "10px 20px",
            backgroundColor: resendDisabled ? "#ccc" : "#6F1D1B",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "32px",
            marginLeft: "10px",
          }}
        >
          {countdownActive && (
            <span style={{ position: "relative" }}>{countdown} seconds</span>
          )}
          {resendOtpError && <p>Error: {resendOtpError}</p>}
        </button>
      </div>
    </div>
  );
};

export default OTPScreen;

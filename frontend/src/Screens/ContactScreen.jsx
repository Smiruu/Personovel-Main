import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitFeedback, resetFeedback } from "../actions/feedbackActions";

function ContactScreen() {
  const dispatch = useDispatch();
  const feedbackState = useSelector((state) => state.feedback);

  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [concern, setConcern] = useState("");
  const [hover, setHover] = useState(false);

  const toggleHover = () => {
    setHover(!hover);
  };

  const handleFeedbackSubmit = () => {
    dispatch(submitFeedback(email, subject, concern));
  };

  const resetForm = () => {
    setEmail("");
    setSubject("");
    setConcern("");
    dispatch(resetFeedback());
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1
        style={{
          color: "#002960",
          textAlign: "center",
          fontFamily: "Comic Sans MS",
          marginBottom: "25px",
        }}
      >
        ~~ CONTACT US! ~~
      </h1>

      <div
        style={{
          width: "100%",
          maxWidth: "650px",
          padding: "20px",
          border: "2px solid #002960",
          backgroundColor: "white",
        }}
      >
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            marginBottom: "20px",
            width: "100%",
            borderRadius: "50px",
            border: "2px solid #002960",
            padding: "8px",
            textIndent: "10px",
          }}
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={{
            marginBottom: "20px",
            width: "100%",
            borderRadius: "50px",
            border: "2px solid #002960",
            padding: "8px",
            textIndent: "10px",
          }}
        />
        <textarea
          placeholder="What is your concern?"
          value={concern}
          onChange={(e) => setConcern(e.target.value)}
          style={{
            width: "100%",
            height: "150px",
            textAlign: "left",
            borderRadius: "20px",
            border: "2px solid #002960",
            padding: "8px",
            textIndent: "10px",
          }}
        />
        <button
          style={{
            margin: "auto",
            marginTop: "20px",
            backgroundColor: hover ? "#BC1823" : "#002960",
            borderRadius: "30px",
            border: "none",
            color: "#FFFFFF",
            width: "100%",
            height: "60px",
            fontSize: "25px",
            fontFamily: "Lato",
          }}
          onMouseEnter={toggleHover}
          onMouseLeave={toggleHover}
          onClick={() => {
            handleFeedbackSubmit();
            resetForm();
          }}
        >
          {feedbackState.loading ? "Submitting..." : "SUBMIT"}
        </button>
        {feedbackState.success && (
          <p style={{ color: "green", marginTop: "10px" }}>
            Feedback submitted successfully!
          </p>
        )}
        {feedbackState.error && (
          <p style={{ color: "red", marginTop: "10px" }}>
            Error: {feedbackState.error}
          </p>
        )}
      </div>
    </div>
  );
}

export default ContactScreen;

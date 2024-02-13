import React, { useState } from "react";

function ContactScreen() {
  const [hover, setHover] = useState(false);

  const toggleHover = () => {
    setHover(!hover);
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
          onClick={() =>
            (window.location.href = "mailto:personovel@gmail.com")
          }
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
}

export default ContactScreen;

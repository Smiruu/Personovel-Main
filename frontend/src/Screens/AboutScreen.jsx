import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

const teamMembers = [
  {
    name: "Depona, David Harry",
    email: "dqdepona1@student.hau.edu.ph",
    imageSrc: "images/dep.png",
  },
  {
    name: "De Vera, Justine Angelo",
    email: "jadevera@student.hau.edu.ph",
    imageSrc: "images/jus.png",
  },
  {
    name: "Linag, Lanz",
    email: "lplinag@student.hau.edu.ph",
    imageSrc: "images/lanz.png",
  },
  {
    name: "Sanchez, Helaena",
    email: "hdsanchez1@student.hau.edu.ph",
    imageSrc: "images/hel.png",
  },
  {
    name: "Yabut, Reinael",
    email: "rbyabut@student.hau.edu.ph",
    imageSrc: "images/yabs.png",
  },
];

const AboutScreen = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedObjective, setSelectedObjective] = useState(null);
  const [objectives] = useState([
    {
      title: "Objective 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      title: "Objective 2",
      description:
        "Suspendisse potenti. Donec iaculis, velit at luctus fringilla.",
    },
    // Add more objectives as needed
  ]);

  const handleMemberClick = (index) => {
    setSelectedMember(index === selectedMember ? null : index);
  };

  const handleObjectiveClick = (index) => {
    setSelectedObjective(index === selectedObjective ? null : index);
  };

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col
          className="mb-3"
          xs={12}
          style={{ textAlign: "left", paddingLeft: 0, paddingRight: 0 }}
        >
          <h1
            style={{
              color: "#002960",
              fontFamily: "Lato",
              fontWeight: "bold",
              textDecoration: "underline",
            }}
          >
            HISTORY
          </h1>

          <p style={{ color: "#555", fontFamily: "Lato" }}>
            Our Story: Igniting Imagination, Connecting Minds
          </p>

          <p style={{ color: "#555", fontFamily: "Lato" }}>
            Welcome to PersoNovel, where the journey into the world of
            literature meets innovation. The inception of PersoNovel was
            inspired by a collective passion for storytelling and a vision to
            revolutionize the way readers explore and engage with novels.
          </p>

          <p style={{ color: "#555", fontFamily: "Lato" }}>
            In a world inundated with information, we recognized the need for a
            platform that not only provides access to an extensive library of
            novels but also offers a personalized and immersive reading
            experience. The idea was born out of the belief that literature has
            the power to shape minds, strengthen connections, and enrich lives.
          </p>

          <p style={{ color: "#555", fontFamily: "Lato" }}>
            The Vision: A Novel Approach to Reading
          </p>

          <p style={{ color: "#555", fontFamily: "Lato" }}>
            Our vision goes beyond just creating a digital library; it's about
            fostering a community of avid readers, sparking creativity, and
            encouraging intellectual discourse. We understand that each reader
            is unique, with diverse tastes and preferences. PersoNovel is our
            response to the call for a platform that caters to this diversity,
            offering a plethora of genres to captivate every imagination.
          </p>
        </Col>
      </Row>

      <Row>
        <Col xs={12} style={{ textAlign: "center" }}>
          <div
            style={{
              height: "2px",
              width: "60px",
              background: "#002960",
              margin: "20px auto",
            }}
          ></div>
        </Col>
      </Row>

      <Row>
        <Col
          className="mb-3"
          xs={12}
          style={{ textAlign: "right", paddingLeft: 0, paddingRight: 0 }}
        >
          <h1
            style={{
              color: "#BC1823",
              fontFamily: "Lato",
              fontWeight: "bold",
              textDecoration: "underline",
            }}
          >
            OBJECTIVES
          </h1>
          {objectives.map((obj, index) => (
            <div key={index} onClick={() => handleObjectiveClick(index)}>
              <p
                style={{
                  color: "#555",
                  fontFamily: "Lato",
                  cursor: "pointer",
                  fontWeight: "bold",
                  color: "#BC1823",
                }}
              >
                {obj.title.toUpperCase()}{" "}
                {index === selectedObjective ? (
                  <span style={{ color: "#BC1823" }}>&#9650;</span>
                ) : (
                  <span style={{ color: "#BC1823" }}>&#9660;</span>
                )}
              </p>
              {index === selectedObjective && (
                <p style={{ color: "#555", fontFamily: "Lato" }}>
                  {obj.description}
                </p>
              )}
            </div>
          ))}
        </Col>
      </Row>

      <div
        style={{
          height: "2px",
          width: "100%",
          background: "#002960",
          margin: "20px auto",
        }}
      ></div>

      <div
        style={{ padding: "30px 0", textAlign: "center", fontFamily: "Lato" }}
      >
        <h1
          style={{
            color: "#002960",
            fontWeight: "bold",
            marginBottom: "20px",
            textDecoration: "underline",
          }}
        >
          TEAM MEMBERS
        </h1>
        <Row className="justify-content-center mb-5">
          {teamMembers.map((member, index) => (
            <Col
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => handleMemberClick(index)}
              xs={12}
              md={2}
            >
              <img
                style={{
                  borderRadius: "50%",
                  margin: "30px",
                  width: "150px",
                  height: "150px",
                  border:
                    index === selectedMember
                      ? "3px solid #BC1823"
                      : "3px solid #002960",
                  cursor: "pointer",
                }}
                src={member.imageSrc}
                alt={member.name}
              />

              {index === selectedMember && (
                <div>
                  <strong>
                    <p
                      style={{
                        marginTop: "-20px",
                        fontSize: "1.3rem",
                        textAlign: "center",
                        color: "#002960",
                        fontWeight: "bold",
                      }}
                    >
                      {member.name}
                    </p>
                  </strong>
                  <p
                    style={{
                      marginTop: "-15px",
                      whiteSpace: "nowrap",
                      fontSize: "1rem",
                      textAlign: "center",
                      color: "#555",
                      fontWeight: "1",
                    }}
                  >
                    {member.email}
                  </p>
                </div>
              )}
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default AboutScreen;

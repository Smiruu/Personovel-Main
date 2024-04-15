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
      description:
        "The primary objective of our eBook website is to enhance accessibility to literature by providing a digital platform where users can easily discover, access, and enjoy a wide range of books from various genres and authors.",
    },
    {
      title: "Objective 2",
      description:
        "We aim to offer readers the convenience and portability of accessing their favorite books anytime, anywhere, using their electronic devices such as smartphones, tablets, or computer. This allows users to carry an entire library in their pocket and read at their convenience.",
    },
    {
      title: "Objective 3",
      description:
        "Our goal is to expand the reading options available to users by offering a diverse collection of eBooks, including popular, and latest books. This ensures that there is something for every reader's taste and interest.",
    },
    {
      title: "Objective 4",
      description:
        "We strive to leverage technology to innovate and enhance the reading experience. This includes features such as customizable reading settings, interactive multimedia content, and recommendation algorithms that help users discover new books tailored to their preferences.",
    },
    {
      title: "Objective 5",
      description:
        "Our key goal is to ensure user satisfaction and trust by providing a smooth, user-friendly platform. We prioritize user experience and customer support to create a positive and rewarding eBook reading experience.",
    },
    {
      title: "Objective 6",
      description:
        "Our eBook website offers a cost-effective alternative to traditional printed books. Our website is subscription base once you subscibred to us you have an access to all the books. This affordability ensures that more people can afford to indulge in their love for reading without breaking the bank.",
    },
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

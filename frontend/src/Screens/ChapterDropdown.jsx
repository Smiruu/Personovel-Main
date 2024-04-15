import React, { useState, useEffect } from "react";
import { Dropdown, Pagination, Container, Col } from "react-bootstrap";
import {
  CaretDownFill,
  ChevronLeft,
  ChevronRight,
} from "react-bootstrap-icons";


const bookData = {
  name: "HARRY POTTER",
  author: "J.K. Rowling",
  coverImage: "/images/sample.jpg",
  chapters: [
    "Chapter 1: Introduction",
    "Chapter 2: The Adventure Begins",
    "Chapter 3: Unveiling Mysteries",
    "Chapter 4: The Final Chapter",
  ],
};

const ChapterPage = () => {
  const [selectedChapter, setSelectedChapter] = useState(0);
  const [borderWidth, setBorderWidth] = useState("2px");

  const updateBorderWidth = () => {
    const bookNameWidth = document.getElementById("bookName").offsetWidth;
    setBorderWidth(`${bookNameWidth}px`);
  };

  useEffect(() => {
    updateBorderWidth();
    window.addEventListener("resize", updateBorderWidth);

    return () => {
      window.removeEventListener("resize", updateBorderWidth);
    };
  }, []);

  const handleChapterChange = (index) => {
    setSelectedChapter(index);
  };

  const handleNextChapter = () => {
    setSelectedChapter((prevChapter) =>
      Math.min(prevChapter + 1, bookData.chapters.length - 1)
    );
  };

  const handlePrevChapter = () => {
    setSelectedChapter((prevChapter) => Math.max(prevChapter - 1, 0));
  };

  return (
    <Container>
      <Col
        className="chapter-page"
        style={{
          position: "",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
        }}
      >
          <Dropdown>
            <Dropdown.Toggle
              variant="outline-none"
              id="dropdown-basic"
              className="mb-4 chapter-info"
              style={{
                border: `2px solid #000`,
                display: "flex",
                alignItems: "center",
                width: "auto",
                borderRadius: "0",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
              }}
              toggleIcon={null}
            >
              <img
                src={bookData.coverImage}
                alt="Book Cover"
                style={{
                  width: "100px",
                  height: "auto",
                  marginRight: "10px",
                }}
              />
              <div id="bookName" style={{ textAlign: "left" }}>
                <h4
                  style={{
                    fontFamily: "Blinker",
                    fontWeight: "bold",
                    marginBottom: "5px",
                  }}
                >
                  {bookData.name.toUpperCase()}
                </h4>
                <p style={{ fontFamily: "Lato", fontSize: "14px", margin: "0" }}>
                  BY {bookData.author.toUpperCase()}
                </p>
              </div>
              <CaretDownFill
                size={24}
                style={{ marginLeft: "auto", visibility: "hidden" }}
              />
            </Dropdown.Toggle>

            <Dropdown.Menu
              style={{
                width: "340px",
                position: "absolute",
                left: 0,
                top: "100%",
              }}
            >
              {bookData.chapters.map((chapter, index) => (
                <Dropdown.Item
                  key={index}
                  onClick={() => handleChapterChange(index)}
                  style={{
                    textAlign: "center",
                    border: "1px solid",
                    borderTop: "none",
                  }}
                >
                  {chapter}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>

      <div className="content">
        <h2
          style={{
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          {bookData.chapters[selectedChapter]}
        </h2>

        <Pagination
          style={{
            justifyContent: "space-between",
            backgroundColor: "transparent",
          }}
        >
          <Pagination.Prev
            onClick={handlePrevChapter}
            disabled={selectedChapter === 0}
            style={{
              backgroundColor: "none",
              fontFamily: "Comic Sans MS",
              boxShadow: "none",
            }}
          >
            <ChevronLeft size={24} /> PREV
          </Pagination.Prev>

          <Pagination.Next
            onClick={handleNextChapter}
            disabled={selectedChapter === bookData.chapters.length - 1}
            style={{
              backgroundColor: "transparent",
              fontFamily: "Comic Sans MS",
              boxShadow: "none",
            }}
          >
            NEXT <ChevronRight size={24} />
          </Pagination.Next>
        </Pagination>

        <div
          style={{
            height: "2px",
            width: "50%",
            backgroundColor: "#000",
            marginBottom: "30px",
            marginTop: "20px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        ></div>

        <p
          style={{
            textAlign: "justify",
          }}
        >
          Harry Potter is a popular fantasy book series written by British
          author J.K. Rowling. The series follows the life and adventures of a
          young wizard named Harry Potter and his friends Hermione Granger and
          Ron Weasley, who are students at Hogwarts School of Witchcraft and
          Wizardry. The series is known for its magical world, complex
          characters, and intricate plot. Harry Potter is a popular fantasy book
          series written by British author J.K. Rowling. The series follows the
          life and adventures of a young wizard named Harry Potter and his
          friends Hermione Granger and Ron Weasley, who are students at Hogwarts
          School of Witchcraft and Wizardry. The series is known for its magical
          world, complex characters, and intricate plot. Harry Potter is a
          popular fantasy book series written by British author J.K. Rowling.
          The series follows the life and adventures of a young wizard named
          Harry Potter and his friends Hermione Granger and Ron Weasley, who are
          students at Hogwarts School of Witchcraft and Wizardry. The series is
          known for its magical world, complex characters, and intricate plot.
          Harry Potter is a popular fantasy book series written by British
          author J.K. Rowling. The series follows the life and adventures of a
          young wizard named Harry Potter and his friends Hermione Granger and
          Ron Weasley, who are students at Hogwarts School of Witchcraft and
          Wizardry. The series is known for its magical world, complex
          characters, and intricate plot. Harry Potter is a popular fantasy book
          series written by British author J.K. Rowling. The series follows the
          life and adventures of a young wizard named Harry Potter and his
          friends Hermione Granger and Ron Weasley, who are students at Hogwarts
          School of Witchcraft and Wizardry. The series is known for its magical
          world, complex characters, and intricate plot. Harry Potter is a
          popular fantasy book series written by British author J.K. Rowling.
          The series follows the life and adventures of a young wizard named
          Harry Potter and his friends Hermione Granger and Ron Weasley, who are
          students at Hogwarts School of Witchcraft and Wizardry. The series is
          known for its magical world, complex characters, and intricate plot.
          Harry Potter is a popular fantasy book series written by British
          author J.K. Rowling. The series follows the life and adventures of a
          young wizard named Harry Potter and his friends Hermione Granger and
          Ron Weasley, who are students at Hogwarts School of Witchcraft and
          Wizardry. The series is known for its magical world, complex
          characters, and intricate plot. Harry Potter is a popular fantasy book
          series written by British author J.K. Rowling. The series follows the
          life and adventures of a young wizard named Harry Potter and his
          friends Hermione Granger and Ron Weasley, who are students at Hogwarts
          School of Witchcraft and Wizardry. The series is known for its magical
          world, complex characters, and intricate plot. Harry Potter is a
          popular fantasy book series written by British author J.K. Rowling.
          The series follows the life and adventures of a young wizard named
          Harry Potter and his friends Hermione Granger and Ron Weasley, who are
          students at Hogwarts School of Witchcraft and Wizardry. The series is
          known for its magical world, complex characters, and intricate plot.
          Harry Potter is a popular fantasy book series written by British
          author J.K. Rowling. The series follows the life and adventures of a
          young wizard named Harry Potter and his friends Hermione Granger and
          Ron Weasley, who are students at Hogwarts School of Witchcraft and
          Wizardry. The series is known for its magical world, complex
          characters, and intricate plot. Harry Potter is a popular fantasy book
          series written by British author J.K. Rowling. The series follows the
          life and adventures of a young wizard named Harry Potter and his
          friends Hermione Granger and Ron Weasley, who are students at Hogwarts
          School of Witchcraft and Wizardry. The series is known for its magical
          world, complex characters, and intricate plot. Harry Potter is a
          popular fantasy book series written by British author J.K. Rowling.
          The series follows the life and adventures of a young wizard named
          Harry Potter and his friends Hermione Granger and Ron Weasley, who are
          students at Hogwarts School of Witchcraft and Wizardry. The series is
          known for its magical world, complex characters, and intricate plot.
        </p>

        <div
          style={{
            height: "2px",
            width: "50%",
            backgroundColor: "#000",
            marginBottom: "30px",
            marginTop: "20px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        ></div>

        <Pagination
          style={{ justifyContent: "space-between", backgroundColor: "none" }}
        >
          <Pagination.Prev
            onClick={handlePrevChapter}
            disabled={selectedChapter === 0}
            style={{
              backgroundColor: "none",
              fontFamily: "Comic Sans MS",
              boxShadow: "none",
            }}
          >
            <ChevronLeft size={24} /> PREV
          </Pagination.Prev>

          <Pagination.Next
            onClick={handleNextChapter}
            disabled={selectedChapter === bookData.chapters.length - 1}
            style={{
              backgroundColor: "transparent",
              fontFamily: "Comic Sans MS",
              boxShadow: "none",
            }}
          >
            NEXT <ChevronRight size={24} />
          </Pagination.Next>
        </Pagination>
      </div>
    </Container>
  );
};

export default ChapterPage;
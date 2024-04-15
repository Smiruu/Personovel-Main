import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listInteractionsByBook } from "../actions/interactionActions";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Button, Dropdown } from "react-bootstrap";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const ChapterByBook = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.userLogin.userInfo);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else if (
      !userInfo.token ||
      (!userInfo.token.is_paid && !userInfo.token.is_admin)
    ) {
      navigate("/subscription");
    } else {
      dispatch(listInteractionsByBook(id));
    }
  }, [dispatch, id, navigate, userInfo]);

  const interactionListByBook = useSelector(
    (state) => state.interactionListByBook
  );
  const { loading, error, interactions } = interactionListByBook;

  const [currentChapter, setCurrentChapter] = useState(1);
  const [numPages, setNumPages] = useState(0);

  const handleNextChapter = () => {
    setCurrentChapter(currentChapter + 1);
    setNumPages(0);
    window.scrollTo(0, 0);
  };

  const handlePreviousChapter = () => {
    setCurrentChapter(currentChapter - 1);
    setNumPages(0);
    window.scrollTo(0, 0);
  };

  const handleChapterChange = (chapterNumber) => {
    setCurrentChapter(chapterNumber);
    setNumPages(0);
    window.scrollTo(0, 0);
  };

  const bookDetails = useSelector((state) => state.bookDetails);
  const {
    loading: bookLoading,
    error: bookError,
    book: bookData,
  } = bookDetails;

  return (
    <div>
      <Dropdown className="mb-3">
        <Dropdown.Toggle
          variant="secondary"
          id="dropdown-basic"
          style={{ display: "flex", alignItems: "center" }}
        >
          {bookData && bookData.image ? (
            <>
              <img
                src={bookData.image}
                alt="Cover"
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
              />
              <div style={{ textAlign: "left" }}>
                <div style={{ fontWeight: "bold" }}>
                  {bookData?.title?.toUpperCase()}
                </div>
                <div>{bookData?.author?.toUpperCase()}</div>
              </div>
            </>
          ) : (
            <div>Loading...</div>
          )}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {interactions.map((interaction) => (
            <Dropdown.Item
              key={interaction.id}
              onClick={() => handleChapterChange(interaction.chapter_number)}
            >
              Chapter {interaction.chapter_number}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <Row>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          interactions.map((interaction, index) => (
            <Col key={interaction.id}>
              {interaction.chapter_number === currentChapter ? (
                <div>
                  {userInfo.token.is_admin ? (
                    <div
                      style={{
                        backgroundColor: "#f8f9fa",
                        padding: "20px",
                        borderRadius: "10px",
                        marginBottom: "20px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <h4
                        style={{
                          fontSize: "24px",
                          marginBottom: "15px",
                          color: "#333",
                          textAlign: "center",
                        }}
                      >
                        Interaction Details
                      </h4>
                      <div style={{ marginBottom: "15px" }}>
                        <p
                          style={{
                            margin: "5px 0",
                            fontSize: "16px",
                            fontWeight: "bold",
                          }}
                        >
                          ID: {interaction.id}
                        </p>
                        <p
                          style={{
                            margin: "5px 0",
                            fontSize: "16px",
                            fontWeight: "bold",
                          }}
                        >
                          Chapter: {interaction.chapter_number}
                        </p>
                        <p
                          style={{
                            margin: "5px 0",
                            fontSize: "16px",
                            fontWeight: "bold",
                          }}
                        >
                          Book: {interaction.book}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <h4
                      style={{
                        fontSize: "24px",
                        marginBottom: "15px",
                        color: "#333",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      CHAPTER {interaction.chapter_number}
                    </h4>
                  )}
                  <div style={{ textAlign: "center", marginBottom: "30px" }}>
                    <Button
                      disabled={currentChapter === 1}
                      onClick={handlePreviousChapter}
                      style={{
                        marginRight: "10px",
                        backgroundColor: "#007bff",
                        borderColor: "#007bff",
                        fontSize: "16px",
                      }}
                    >
                      Previous Chapter
                    </Button>
                    <Button
                      disabled={index === interactions.length - 1}
                      onClick={handleNextChapter}
                      style={{
                        backgroundColor: "#28a745",
                        borderColor: "#28a745",
                        fontSize: "16px",
                      }}
                    >
                      Next Chapter
                    </Button>
                  </div>

                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Document
                      file={interaction.chapter}
                      options={{
                        workerSrc: pdfjs.GlobalWorkerOptions.workerSrc,
                      }}
                      onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                    >
                      {Array.from(new Array(numPages), (el, index) => (
                        <Page
                          key={`page_${index + 1}`}
                          pageNumber={index + 1}
                          renderTextLayer={false}
                          renderAnnotationLayer={false}
                          width={1300}
                        />
                      ))}
                    </Document>
                  </div>
                  <div style={{ textAlign: "center", marginTop: "30px" }}>
                    <Button
                      disabled={currentChapter === 1}
                      onClick={handlePreviousChapter}
                      style={{
                        marginRight: "10px",
                        backgroundColor: "#007bff",
                        borderColor: "#007bff",
                        fontSize: "16px",
                      }}
                    >
                      Previous Chapter
                    </Button>
                    <Button
                      disabled={index === interactions.length - 1}
                      onClick={handleNextChapter}
                      style={{
                        backgroundColor: "#28a745",
                        borderColor: "#28a745",
                        fontSize: "16px",
                      }}
                    >
                      Next Chapter
                    </Button>
                  </div>
                </div>
              ) : null}
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default ChapterByBook;

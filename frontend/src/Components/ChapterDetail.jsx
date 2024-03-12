import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listInteractionDetails } from "../actions/interactionActions";
import { listBookDetails } from "../actions/bookActions"; // Import the action to fetch book details
import { useParams } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import { Row, Col, Button } from "react-bootstrap";
import Message from "../Components/Message";
import Loader from "../Components/Loader";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function ChapterDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [interaction, setInteraction] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [bookName, setBookName] = useState("");

  useEffect(() => {
    dispatch(listInteractionDetails(id));
  }, [dispatch, id]);

  const interactionDetails = useSelector((state) => state.interactionDetails);
  const { loading, error, interaction: interactionData } = interactionDetails;

  useEffect(() => {
    if (!loading && !error) {
      setInteraction(interactionData);
      if (interactionData.book) {
        dispatch(listBookDetails(interactionData.book)); // Fetch book details
      }
    }
  }, [interactionData, loading, error, dispatch]);

  useEffect(() => {
    if (interaction.chapter) {
      const loadingTask = pdfjs.getDocument(interaction.chapter);
      loadingTask.promise.then((pdf) => {
        setInteraction((prevState) => ({
          ...prevState,
          pages: pdf.numPages,
        }));
      });
    }
  }, [interaction.chapter]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < interaction.pages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const bookDetails = useSelector((state) => state.bookDetails);
  const { book } = bookDetails;

  useEffect(() => {
    if (book) {
      setBookName(book.title); // Set the book name
    }
  }, [book]);

  // Filter chapters based on the book ID
  const filteredChapters = interactionData.chapters?.filter(
    (chapter) => chapter.book === id
  );

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <h2>Interaction Details</h2>
          <p>Book: {bookName}</p> {/* Display book name instead of ID */}
          <p>Chapter: {interaction.chapter_number}</p>
          <p>ID: {interaction.id}</p>

          <Document
            file={interaction.chapter}
            options={{ workerSrc: pdfjs.GlobalWorkerOptions.workerSrc }}
          >
            <Page
              pageNumber={currentPage}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
          <Row>
            <Col>
              <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
                Previous Page
              </Button>
            </Col>
            <Col>
              <Button
                onClick={handleNextPage}
                disabled={currentPage === interaction.pages}
              >
                Next Page
              </Button>
            </Col>
          </Row>
          <div>
            <h3>Chapters</h3>
            <ul>
              {filteredChapters?.map((chapter) => (
                <li key={chapter.id}>{chapter.title}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChapterDetail;

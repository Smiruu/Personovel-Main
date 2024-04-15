import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createInteraction,
  resetInteraction,
  updateInteraction,
  deleteInteraction,
} from "../../actions/interactionActions";
import { listBooks } from "../../actions/bookActions";
import { listInteractionsByBook } from "../../actions/interactionActions";
import { Document, Page } from "react-pdf";
import { Modal, Button, Form } from "react-bootstrap";
import LogCreate from "../../Components/LogCreate";

const InteractionAdmin = () => {
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.bookList);
  const { interactions } = useSelector((state) => state.interactionListByBook);
  const [formData, setFormData] = useState({
    book: "",
    chapter: null,
    chapter_number: 1,
  });
  const [selectedBookTitle, setSelectedBookTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedInteraction, setSelectedInteraction] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [showPdf, setShowPdf] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [interactionToDelete, setInteractionToDelete] = useState(null);
  const [showLogCreate, setShowLogCreate] = useState(false);
  const [isLogCreateCompleted, setIsLogCreateCompleted] = useState(false);

  useEffect(() => {
    dispatch(listBooks());
  }, [dispatch]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleChange = (e) => {
    if (e.target.name === "book") {
      const selectedBookId = e.target.value;
      const selectedBook = books.find((book) => book._id === selectedBookId);
      setFormData({ ...formData, book: selectedBookId });
      setSelectedBookTitle(selectedBook ? selectedBook.title : "");
      dispatch(listInteractionsByBook(selectedBookId));
    } else if (e.target.name === "chapter") {
      setFormData({ ...formData, chapter: e.target.files[0] });
      setShowPdf(true);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      setSelectedBookTitle("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("book", formData.book);
    formDataToSend.append("chapter", formData.chapter);
    formDataToSend.append("chapter_number", formData.chapter_number);
    if (isEditing && selectedInteraction) {
      dispatch(updateInteraction(selectedInteraction.id, formDataToSend));
    } else {
      await dispatch(createInteraction(formDataToSend));
    }
    dispatch(listInteractionsByBook(formData.book));
    setShowPdf(false);
    handleShowLogCreate();
  };

  const handleReset = () => {
    dispatch(resetInteraction());
    setIsEditing(false);
    setShowPdf(false);
  };

  const handleEdit = (interaction) => {
    if (!interaction || !interaction.id) return;
    setSelectedInteraction(interaction);
    setIsEditing(true);
    setFormData({
      book: interaction.book,
      chapter_number: interaction.chapter_number,
      chapter: interaction.chapter,
    });
    setShowPdf(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedInteraction(null);
  };

  const handleEditChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!selectedInteraction || !selectedInteraction.id) {
      console.error("Invalid Interaction ID");
      setIsEditing(false);
      return;
    }
    const formDataToSend = new FormData();
    formDataToSend.append("id", selectedInteraction.id);
    if (formData.chapter_number !== selectedInteraction.chapter_number) {
      formDataToSend.append("chapter_number", formData.chapter_number);
    }
    if (formData.chapter && formData.chapter !== selectedInteraction.chapter) {
      formDataToSend.append("chapter", formData.chapter);
    }
    if (formData.book !== selectedInteraction.book) {
      formDataToSend.append("book", formData.book);
    }
    if (
      !formDataToSend.has("chapter_number") &&
      !formDataToSend.has("chapter") &&
      !formDataToSend.has("book")
    ) {
      setIsEditing(false);
      return;
    }
    await dispatch(updateInteraction(selectedInteraction.id, formDataToSend));
    dispatch(listInteractionsByBook(formData.book));
    setIsEditing(false);
    handleShowLogCreate();
  };

  const sortedInteractions = interactions
    .slice()
    .sort((a, b) => a.chapter_number - b.chapter_number);

  const handleDeleteConfirmation = (id) => {
    setInteractionToDelete(id);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteInteraction(interactionToDelete))
      .then(() => {
        setShowConfirmation(false);
        dispatch(listInteractionsByBook(formData.book));
        handleShowLogCreate();
      })
      .catch((error) => console.error("Error deleting interaction:", error));
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const togglePdfView = () => {
    setShowPdf(!showPdf);
  };

  const goToNextPage = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  const goToPrevPage = () => {
    setPageNumber((prevPageNumber) => prevPageNumber - 1);
  };

  const handleShowLogCreate = () => {
    setIsLogCreateCompleted(false);
    setShowLogCreate(true);
  };

  return (
    <div>
      {!isEditing ? (
        <div>
          <h3>Add Interaction</h3>
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Form.Group controlId="formBook">
              <Form.Label>Book:</Form.Label>
              <Form.Control
                as="select"
                name="book"
                value={formData.book}
                onChange={handleChange}
              >
                <option value="">Select a book</option>
                {books.map((book) => (
                  <option key={book._id} value={book._id}>
                    {book.title}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formChapter" className="mt-3">
              <Form.Label>Chapter:</Form.Label>
              <Form.Control
                type="file"
                name="chapter"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formChapterNumber" className="mt-3">
              <Form.Label>Chapter Number:</Form.Label>
              <Form.Control
                type="number"
                name="chapter_number"
                value={formData.chapter_number}
                onChange={handleChange}
                min="1"
                max="100"
              />
            </Form.Group>

            <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit" className="mt-3">
                Submit
              </Button>
              <Button
                variant="secondary"
                onClick={handleReset}
                className="mt-3"
              >
                Reset
              </Button>
            </div>
          </Form>
          <hr />
        </div>
      ) : (
        <div>
          <h3>Edit Interaction</h3>
          <Form onSubmit={handleEditSubmit} style={{ marginBottom: "20px" }}>
            <div style={{ marginBottom: "10px" }}>
              <label>
                <strong>Book Used:</strong>{" "}
                {
                  books.find((book) => book._id === selectedInteraction.book)
                    ?.title
                }
              </label>
            </div>
            <Form.Group controlId="editChapterNumber">
              <Form.Label>Chapter Number:</Form.Label>
              <Form.Control
                type="number"
                name="chapter_number"
                value={formData.chapter_number}
                onChange={handleEditChange}
                min="1"
                max="100"
              />
            </Form.Group>
            <Form.Group controlId="editChapterFile" className="mt-3">
              <Form.Label>Chapter File:</Form.Label>
              <Form.Control
                type="file"
                name="chapter"
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-flex justify-content-between mt-3">
              <Button variant="primary" type="submit">
                Update
              </Button>
              <Button onClick={togglePdfView}>
                {showPdf ? "Hide PDF" : "View Current PDF"}
              </Button>
              <Button onClick={handleCancelEdit}>Cancel</Button>
            </div>
          </Form>
          <hr />
        </div>
      )}

      <div>
        <h3>Interactions</h3>
        <ul>
          {sortedInteractions.map((interaction) => (
            <li key={interaction._id}>
              Chapter Number: {interaction.chapter_number} -{" "}
              <Button onClick={() => handleEdit(interaction)}>Edit</Button>{" "}
              <Button onClick={() => handleDeleteConfirmation(interaction.id)}>
                Delete
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <hr />

      {showPdf && (
        <div>
          <h3>PDF Viewer</h3>
          <Document
            file={formData.chapter}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} width={750} className="pdf-page" />
          </Document>

          <div className="d-flex justify-content-between">
            <Button onClick={goToPrevPage} disabled={pageNumber <= 1}>
              Previous Page
            </Button>
            <span>
              Page {pageNumber} of {numPages}
            </span>
            <Button onClick={goToNextPage} disabled={pageNumber >= numPages}>
              Next Page
            </Button>
          </div>
        </div>
      )}

      <Modal show={showConfirmation} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this interaction?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            No
          </Button>
          <Button variant="primary" onClick={handleConfirmDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showLogCreate && !isLogCreateCompleted}
        onHide={() => setShowLogCreate(false)}
        centered
      >
        <Modal.Header>
          <Modal.Title className="text-center">LOG</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10%",
          }}
        >
          <LogCreate onClose={() => setIsLogCreateCompleted(true)} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default InteractionAdmin;

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

const InteractionAdmin = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    book: "",
    chapter: null,
    chapter_number: 1,
  });
  const { books } = useSelector((state) => state.bookList);
  const { interactions } = useSelector((state) => state.interactionListByBook);
  const [selectedBookTitle, setSelectedBookTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedInteraction, setSelectedInteraction] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [showPdf, setShowPdf] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [interactionToDelete, setInteractionToDelete] = useState(null);

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

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <h2>Interaction Admin</h2>
        {!isEditing ? (
          <div>
            <h3>Add Interaction</h3>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <label>
                Book:
                <select
                  name="book"
                  id="title"
                  value={formData.book}
                  onChange={handleChange}
                >
                  <option value="">Select a book</option>
                  {books.map((book) => (
                    <option key={book._id} value={book._id}>
                      {book.title}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Chapter:
                <input type="file" name="chapter" onChange={handleChange} />
              </label>
              <label>
                Chapter Number:
                <input
                  type="number"
                  name="chapter_number"
                  value={formData.chapter_number}
                  onChange={handleChange}
                  min="1"
                  max="100"
                />
              </label>
              <button type="submit">Submit</button>
              <button type="button" onClick={handleReset}>
                Reset
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h3>Edit Interaction</h3>
            <form onSubmit={handleEditSubmit} style={{ marginBottom: "20px" }}>
              <div style={{ marginBottom: "10px" }}>
                <label>
                  <strong>Book Used:</strong>{" "}
                  {
                    books.find((book) => book._id === selectedInteraction.book)
                      ?.title
                  }
                </label>
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label>
                  <strong>Chapter Number:</strong>
                  <input
                    type="number"
                    name="chapter_number"
                    value={formData.chapter_number}
                    onChange={handleEditChange}
                    style={{ marginLeft: "10px" }}
                    min="1"
                    max="100"
                  />
                </label>
              </div>

              <div style={{ marginBottom: "10px" }}>
                <label>
                  <strong>Chapter File:</strong>
                  <input
                    type="file"
                    name="chapter"
                    onChange={handleChange}
                    style={{ marginLeft: "10px" }}
                  />
                </label>
              </div>
              <div>
                <button type="submit">Update</button>
                <button onClick={togglePdfView} style={{ marginLeft: "10px" }}>
                  {showPdf ? "Hide PDF" : "View Current PDF"}
                </button>
                <button
                  onClick={handleCancelEdit}
                  style={{ marginLeft: "10px" }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div>
          <h3>Interactions</h3>
          <ul>
            {sortedInteractions.map((interaction) => (
              <li key={interaction._id}>
                Chapter Number: {interaction.chapter_number} -{" "}
                <button onClick={() => handleEdit(interaction)}>Edit</button>{" "}
                <button
                  onClick={() => handleDeleteConfirmation(interaction.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {showPdf && (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: "1.2em",
          }}
        >
          <h3 style={{ marginBottom: "10px" }}>PDF Viewer</h3>
          <Document
            file={formData.chapter}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} width={750} className="pdf-page" />
          </Document>
          <div style={{ marginTop: "20px" }}>
            <button
              onClick={goToPrevPage}
              disabled={pageNumber <= 1}
              style={{ fontSize: "1em", marginRight: "10px" }}
            >
              Previous Page
            </button>
            <span style={{ fontSize: "1em", margin: "0 10px" }}>
              Page {pageNumber} of {numPages}
            </span>
            <button
              onClick={goToNextPage}
              disabled={pageNumber >= numPages}
              style={{ fontSize: "1em", marginLeft: "10px" }}
            >
              Next Page
            </button>
          </div>
        </div>
      )}

      {/* Confirmation modal for delete */}
      {showConfirmation && (
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "white", padding: "20px", border: "1px solid black" }}>
          <p>Are you sure you want to delete this interaction?</p>
          <button type="button" onClick={handleConfirmDelete}>
            Yes
          </button>
          <button type="button" onClick={handleCancelDelete}>
            No
          </button>
        </div>
      )}
    </div>
  );
};

export default InteractionAdmin;

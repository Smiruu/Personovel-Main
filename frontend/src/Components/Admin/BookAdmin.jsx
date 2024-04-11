import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listAuthors } from "../../actions/authorActions";
import { listGenres } from "../../actions/genreActions";
import {
  createBook,
  listBooks,
  updateBook,
  resetUpdateBook,
  deleteBook,
} from "../../actions/bookActions";
import { Modal, Button, Form } from "react-bootstrap";
import LogCreate from "../../Components/LogCreate";

const BookAdmin = () => {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    language: "",
    genre: "",
    synopsis: "",
    author: "",
  });
  const [editId, setEditId] = useState(null);
  const [operationMessage, setOperationMessage] = useState("");
  const [showCurrentImage, setShowCurrentImage] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [showLogCreate, setShowLogCreate] = useState(false);
  const [isLogCreateCompleted, setIsLogCreateCompleted] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listAuthors());
    dispatch(listGenres());
    dispatch(listBooks());
  }, [dispatch]);

  const authorsList = useSelector((state) => state.authorList);
  const { loading: loadingAuthors, error: errorAuthors, authors } = authorsList;

  const genresList = useSelector((state) => state.genreList);
  const { loading: loadingGenres, error: errorGenres, genres } = genresList;

  const booksList = useSelector((state) => state.bookList);
  const { loading: loadingBooks, error: errorBooks, books } = booksList;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, image, language, genre, synopsis, author } = formData;
    let bookData = {
      title,
      language,
      genre,
      synopsis,
      author,
    };

    if (image instanceof File) {
      bookData = {
        ...bookData,
        image,
      };
    }

    try {
      if (editId !== null) {
        await dispatch(updateBook(editId, bookData));
        dispatch(resetUpdateBook());
        setEditId(null);
      } else {
        await dispatch(createBook(bookData));
      }
      setOperationMessage("Book operation successful!");
      setFormData({
        title: "",
        image: "",
        language: "",
        genre: "",
        synopsis: "",
        author: "",
      });
      dispatch(listBooks());
      setShowLogCreate(true);
    } catch (error) {
      console.error("Error performing book operation:", error);
      setOperationMessage("An error occurred while performing the operation.");
    }
  };

  const handleEdit = (_id) => {
    setEditId(_id);
    const bookToEdit = books.find((book) => book._id === _id);
    if (bookToEdit) {
      setFormData({
        title: bookToEdit.title || "",
        language: bookToEdit.language || "",
        genre: bookToEdit.genre || "",
        synopsis: bookToEdit.synopsis || "",
        author: bookToEdit.author || "",
        image: bookToEdit.image || "",
      });
      if (bookToEdit.image) {
        setShowCurrentImage(true);
      }
    } else {
      console.error(`Book with ID ${_id} not found.`);
    }
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setFormData({
      title: "",
      image: "",
      language: "",
      genre: "",
      synopsis: "",
      author: "",
    });
  };

  const handleDeleteConfirmation = (_id) => {
    setBookToDelete(_id);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    await dispatch(deleteBook(bookToDelete));
    dispatch(listBooks());
    setShowConfirmation(false);
    setShowLogCreate(true); // Prompt LogCreate modal after delete confirmation
  };
  

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleToggleImageDisplay = () => {
    setShowCurrentImage(!showCurrentImage);
  };

  const handleCloseLogCreate = () => {
    setIsLogCreateCompleted(true);
    setShowLogCreate(false);
  };

  const handleShowLogCreate = () => {
    setIsLogCreateCompleted(false);
    setShowLogCreate(true);
  };

  return (
    <div>
      <h2>{editId !== null ? "Edit Book" : "Add New Book"}</h2>
      {operationMessage && <p>{operationMessage}</p>}
      <Form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="mt-3"
      >
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="image" className="mt-3">
          <Form.Label>Image</Form.Label>
          <Form.Control type="file" name="image" onChange={handleImageChange} />
          {formData.image && (
            <div className="d-flex flex-column">
              <Button
                className="mt-3"
                variant="secondary"
                onClick={handleToggleImageDisplay}
              >
                {showCurrentImage ? "Hide Current Image" : "See Current Image"}
              </Button>
              {showCurrentImage && (
                <img
                  src={
                    formData.image instanceof File
                      ? URL.createObjectURL(formData.image)
                      : formData.image
                  }
                  alt="Current"
                  className="mt-3 d-flex justify-content-center"
                  style={{
                    maxWidth: "100px",
                    maxHeight: "100px",
                  }}
                />
              )}
            </div>
          )}
        </Form.Group>

        <Form.Group controlId="language" className="mt-3">
          <Form.Label>Language</Form.Label>
          <Form.Control
            type="text"
            name="language"
            value={formData.language}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="genre" className="mt-3">
          <Form.Label>Genre</Form.Label>
          <Form.Control
            as="select"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
          >
            <option value="">Select Genre</option>
            {genres.map((genre) => (
              <option key={genre._id} value={genre._id}>
                {genre.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="synopsis" className="mt-3">
          <Form.Label>Synopsis</Form.Label>
          <Form.Control
            as="textarea"
            name="synopsis"
            value={formData.synopsis}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="author" className="mt-3">
          <Form.Label>Author</Form.Label>
          <Form.Control
            as="select"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          >
            <option value="">Select Author</option>
            {authors.map((author) => (
              <option key={author._id} value={author._id}>
                {author.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <div className="d-flex justify-content-between mt-3">
          <Button type="submit" variant="primary">
            {editId !== null ? "Update Book" : "Add Book"}
          </Button>
          {editId !== null && (
            <Button variant="secondary" onClick={handleCancelEdit}>
              Cancel Edit
            </Button>
          )}
        </div>
      </Form>

      <hr />

      <div className="mt-3">
        <h2>Book List</h2>
        {loadingBooks ? (
          <p>Loading books...</p>
        ) : errorBooks ? (
          <p>Error loading books: {errorBooks}</p>
        ) : (
          <ul className="list-unstyled">
        {books
  .slice() // Create a copy of the array to avoid mutating the original array
  .sort((a, b) => {
    // Convert _id to numbers and compare
    return parseInt(a._id) - parseInt(b._id);
  })
  .map((book) => (
    <li
      key={book._id}
      className="d-flex justify-content-between align-items-center mt-3"
    >
      <span>
        ID: {book._id}, Title: {book.title}
      </span>
      <div>
        <Button
          onClick={() => handleEdit(book._id)}
          className="ms-2"
          style={{
            backgroundColor: "transparent",
            color: "#002960",
            textTransform: "uppercase",
            borderColor: "#002960",
          }}
          onMouseEnter={(e) => {
            e.target.style.color = "white";
            e.target.style.backgroundColor = "#002960";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "#002960";
            e.target.style.backgroundColor = "transparent";
          }}
        >
          Edit
        </Button>
        <Button
          onClick={() => handleDeleteConfirmation(book._id)}
          className="ms-2"
          style={{
            backgroundColor: "transparent",
            color: "#BC1823",
            textTransform: "uppercase",
            borderColor: "#BC1823",
          }}
          onMouseEnter={(e) => {
            e.target.style.color = "white";
            e.target.style.backgroundColor = "#BC1823";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "#BC1823";
            e.target.style.backgroundColor = "transparent";
          }}
        >
          Delete
        </Button>
      </div>
    </li>
  ))}

          </ul>
        )}
      </div>

      <Modal show={showConfirmation} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this book?</Modal.Body>
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
        onHide={handleCloseLogCreate}
        centered
      >
        <Modal.Header>
          <Modal.Title className="text-center">LOG</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            justifyContent: "center", // Center horizontally
            alignItems: "center", // Center vertically
            marginTop: "10%",
          }}
        >
          <LogCreate onClose={handleCloseLogCreate} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default BookAdmin;

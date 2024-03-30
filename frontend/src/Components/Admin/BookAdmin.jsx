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
  const [showCurrentImage, setShowCurrentImage] = useState(false); // State to toggle display of current image
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

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
  
    // If a new image is selected, include it in the bookData
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
      dispatch(listBooks()); // Update book list after adding or updating a book
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
        image: bookToEdit.image || "", // Set the image URL in formData
      });
      if (bookToEdit.image) {
        setShowCurrentImage(true); // Display the current image when editing
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
    dispatch(listBooks()); // Update book list after deleting a book
    setShowConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleToggleImageDisplay = () => {
    setShowCurrentImage(!showCurrentImage);
  };

  return (
    <div>
      <h2>{editId !== null ? "Edit Book" : "Add New Book"}</h2>
      {operationMessage && <p>{operationMessage}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
          />
          {formData.image && (
            <button type="button" onClick={handleToggleImageDisplay}>
              {showCurrentImage ? "Hide Current Image" : "See Current Image"}
            </button>
          )}
          {showCurrentImage && (
            <img
              src={formData.image instanceof File ? URL.createObjectURL(formData.image) : formData.image}
              alt="Current"
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
          )}
        </div>
        <div>
          <label htmlFor="language">Language</label>
          <input
            type="text"
            id="language"
            name="language"
            value={formData.language}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="genre">Genre</label>
          <select
            id="genre"
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
          </select>
        </div>
        <div>
          <label htmlFor="synopsis">Synopsis</label>
          <textarea
            id="synopsis"
            name="synopsis"
            value={formData.synopsis}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <select
            id="author"
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
          </select>
        </div>
        <button type="submit">
          {editId !== null ? "Update Book" : "Add Book"}
        </button>
        {editId !== null && (
          <button type="button" onClick={handleCancelEdit}>
            Cancel Edit
          </button>
        )}
      </form>

      <div>
        <h2>Book List</h2>
        {loadingBooks ? (
          <p>Loading books...</p>
        ) : errorBooks ? (
          <p>Error loading books: {errorBooks}</p>
        ) : (
          <ul>
            {books.map((book) => (
              <li key={book._id}>
                ID: {book._id}, Title: {book.title}
                <button onClick={() => handleEdit(book._id)}>Edit</button>
                <button onClick={() => handleDeleteConfirmation(book._id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Confirmation modal for delete */}
      {showConfirmation && (
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "white", padding: "20px", border: "1px solid black" }}>
        <p>Are you sure you want to delete this book?</p>
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

export default BookAdmin;


import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createAuthor,
  listAuthors,
  resetAuthorCreation,
  updateAuthor,
  resetAuthorUpdate,
  deleteAuthor,
  resetDeleteAuthor,
} from "../../actions/authorActions";

const AuthorAdmin = () => {
  // Component state
  const [authorName, setAuthorName] = useState("");
  const [authorIdToUpdate, setAuthorIdToUpdate] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [authorToDelete, setAuthorToDelete] = useState(null);

  // Redux
  const dispatch = useDispatch();
  const authorCreate = useSelector((state) => state.authorCreate);
  const {
    loading: loadingCreate,
    success: successCreate,
    error: errorCreate,
  } = authorCreate;

  // Dispatch listAuthors action when component mounts
  useEffect(() => {
    dispatch(listAuthors());
  }, [dispatch]);

  // Get list of authors from Redux state
  const authorList = useSelector((state) => state.authorList);
  const { loading: loadingList, authors, error: errorList } = authorList;

  const submitHandler = (e) => {
    e.preventDefault();
    if (authorIdToUpdate) {
      // If authorIdToUpdate has a value, it means we're updating an author
      dispatch(updateAuthor(authorIdToUpdate, { name: authorName }))
        .then(() => {
          setAuthorIdToUpdate(null); // Reset the authorIdToUpdate after update
          setAuthorName("");
          setShowConfirmation(false);
          dispatch(listAuthors()); // Fetch the updated list of authors
        })
        .catch((error) => console.error("Error updating author:", error));
    } else {
      dispatch(createAuthor({ name: authorName }))
        .then(() => {
          setAuthorName("");
          setShowConfirmation(false);
          dispatch(listAuthors()); // Fetch the updated list of authors
        })
        .catch((error) => console.error("Error creating author:", error));
    }
  };

  // Function to handle author update
  const handleUpdateAuthor = (id, name) => {
    setAuthorIdToUpdate(id);
    setAuthorName(name);
  };

  // Function to cancel edit and reset form fields
  const cancelEditHandler = () => {
    setAuthorIdToUpdate(null);
    setAuthorName("");
    dispatch(resetAuthorUpdate()); // Reset any update-related state
  };

  // Function to handle confirmation modal for delete
  const handleDeleteConfirmation = (id) => {
    setAuthorToDelete(id);
    setShowConfirmation(true);
  };

  // Function to confirm delete action
  const handleConfirmDelete = () => {
    dispatch(deleteAuthor(authorToDelete))
      .then(() => {
        setShowConfirmation(false);
        dispatch(listAuthors()); // Fetch the updated list of authors
      })
      .catch((error) => console.error("Error deleting author:", error));
  };

  // Function to cancel delete action
  const handleCancelDelete = () => {
    setShowConfirmation(false);
    dispatch(resetDeleteAuthor()); // Reset delete-related state
  };

  return (
    <div>
      <h2>{authorIdToUpdate ? "Update Author" : "Add Author"}</h2>
      {loadingCreate && <p>Loading...</p>}
      {errorCreate && <p>Error: {errorCreate}</p>}
      {successCreate && (
        <p>
          {authorIdToUpdate
            ? "Author updated successfully!"
            : "Author created successfully!"}
        </p>
      )}
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="authorName">Author Name</label>
          <input
            type="text"
            id="authorName"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
          />
        </div>
        <button type="submit">
          {authorIdToUpdate ? "Update Author" : "Create Author"}
        </button>
        {authorIdToUpdate && (
          <button type="button" onClick={cancelEditHandler}>
            Cancel Edit
          </button>
        )}
      </form>

      <h2>Authors</h2>
      {loadingList ? (
        <p>Loading authors...</p>
      ) : errorList ? (
        <p>Error: {errorList}</p>
      ) : (
        <ul>
          {authors.map((author) => (
            <li key={author.id}>
              {author.name}
              <button
                type="button"
                onClick={() => handleUpdateAuthor(author.id, author.name)}
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDeleteConfirmation(author.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Confirmation modal for delete */}
      {showConfirmation && (
        <div>
          <p>Are you sure you want to delete this author?</p>
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

export default AuthorAdmin;

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
import { Modal, Button, Form } from "react-bootstrap";

const AuthorAdmin = () => {
  const [authorName, setAuthorName] = useState("");
  const [authorIdToUpdate, setAuthorIdToUpdate] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [authorToDelete, setAuthorToDelete] = useState(null);

  const dispatch = useDispatch();
  const authorCreate = useSelector((state) => state.authorCreate);
  const {
    loading: loadingCreate,
    success: successCreate,
    error: errorCreate,
  } = authorCreate;

  useEffect(() => {
    dispatch(listAuthors());
  }, [dispatch]);

  const authorList = useSelector((state) => state.authorList);
  const { loading: loadingList, authors, error: errorList } = authorList;

  const submitHandler = (e) => {
    e.preventDefault();
    if (authorIdToUpdate) {
      dispatch(updateAuthor(authorIdToUpdate, { name: authorName }))
        .then(() => {
          setAuthorIdToUpdate(null);
          setAuthorName("");
          setShowConfirmation(false);
          dispatch(listAuthors());
        })
        .catch((error) => console.error("Error updating author:", error));
    } else {
      dispatch(createAuthor({ name: authorName }))
        .then(() => {
          setAuthorName("");
          setShowConfirmation(false);
          dispatch(listAuthors());
        })
        .catch((error) => console.error("Error creating author:", error));
    }
  };

  const handleUpdateAuthor = (id, name) => {
    setAuthorIdToUpdate(id);
    setAuthorName(name);
  };

  const cancelEditHandler = () => {
    setAuthorIdToUpdate(null);
    setAuthorName("");
    dispatch(resetAuthorUpdate());
  };

  const handleDeleteConfirmation = (id) => {
    setAuthorToDelete(id);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteAuthor(authorToDelete))
      .then(() => {
        setShowConfirmation(false);
        dispatch(listAuthors());
      })
      .catch((error) => console.error("Error deleting author:", error));
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
    dispatch(resetDeleteAuthor());
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

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="authorName">
          <Form.Label>Author Name</Form.Label>
          <Form.Control
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
          />
        </Form.Group>

        <div className="d-flex justify-content-between mt-2">
          <Button
            variant="primary"
            type="submit"
            style={{
              backgroundColor: "#BC1823",
              color: "white",
              marginLeft: "10px",
              textTransform: "uppercase",
              borderColor: "#BC1823",
            }}
            onMouseEnter={(e) => {
              e.target.style.color = "#BC1823";
              e.target.style.backgroundColor = "white";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "white";
              e.target.style.backgroundColor = "#BC1823";
            }}
          >
            {authorIdToUpdate ? "Update Author" : "Create Author"}
          </Button>
          {authorIdToUpdate && (
            <Button variant="secondary" onClick={cancelEditHandler}>
              Cancel Edit
            </Button>
          )}
        </div>
      </Form>

      <hr />

      <h2>Authors</h2>
      {loadingList ? (
        <p>Loading authors...</p>
      ) : errorList ? (
        <p>Error: {errorList}</p>
      ) : (
        <ul className="list-unstyled">
          {authors.map((author) => (
            <li
              key={author.id}
              className="d-flex justify-content-between align-items-center mt-3"
              style={{ listStyleType: "disc" }}
            >
              {author.name}
              <div>
                <Button
                  variant="info"
                  onClick={() => handleUpdateAuthor(author.id, author.name)}
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
                  EDIT
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteConfirmation(author.id)}
                  style={{
                    backgroundColor: "transparent",
                    color: "#BC1823",
                    marginLeft: "10px",
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
                  DELETE
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Modal show={showConfirmation} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this author?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            No
          </Button>
          <Button variant="primary" onClick={handleConfirmDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AuthorAdmin;

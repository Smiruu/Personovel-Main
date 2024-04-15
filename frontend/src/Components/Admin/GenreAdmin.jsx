import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createGenre,
  listGenres,
  updateGenre,
  resetGenre,
  deleteGenre,
  resetDeleteGenre,
} from "../../actions/genreActions";
import { Modal, Button, Form } from "react-bootstrap";
import LogCreate from "../../Components/LogCreate";

const GenreAdmin = () => {
  const [name, setName] = useState("");
  const [selectedGenreId, setSelectedGenreId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [genreToDelete, setGenreToDelete] = useState(null);
  const [showLogCreate, setShowLogCreate] = useState(false);
  const [isLogCreateCompleted, setIsLogCreateCompleted] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listGenres());
  }, [dispatch]);

  const genreCreate = useSelector((state) => state.genreCreate);
  const { loading, error, success } = genreCreate;

  const genreUpdate = useSelector((state) => state.genreUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = genreUpdate;

  const genreDelete = useSelector((state) => state.genreDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = genreDelete;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedGenreId) {
      dispatch(updateGenre(selectedGenreId, { name }))
        .then(() => {
          setName("");
          setSelectedGenreId(null);
          setShowLogCreate(true);
          dispatch(listGenres());
        })
        .catch((error) => console.error("Error updating genre:", error));
    } else {
      dispatch(createGenre({ name }))
        .then(() => {
          setName("");
          setSelectedGenreId(null);
          setShowLogCreate(true);
          dispatch(listGenres());
        })
        .catch((error) => console.error("Error creating genre:", error));
    }
  };

  const handleEdit = (id, name) => {
    setSelectedGenreId(id);
    setName(name);
  };

  const handleDeleteConfirmation = (id) => {
    setGenreToDelete(id);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteGenre(genreToDelete))
      .then(() => {
        setShowConfirmation(false);
        setShowLogCreate(true);
        dispatch(listGenres());
      })
      .catch((error) => console.error("Error deleting genre:", error));
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleCancelEdit = () => {
    setSelectedGenreId(null);
    setName("");
    dispatch(resetGenre());
  };

  useEffect(() => {
    if (successDelete) {
      dispatch(listGenres());
      dispatch(resetDeleteGenre());
    }
  }, [successDelete, dispatch]);

  useEffect(() => {
    if (success || successUpdate) {
      const timer = setTimeout(() => {
        dispatch(resetGenre());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [success, successUpdate, dispatch]);

  const genreList = useSelector((state) => state.genreList);
  const { loading: loadingGenres, error: errorGenres, genres } = genreList;

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
      <h2>{selectedGenreId ? "Edit Genre" : "Create New Genre"}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <div className="d-flex justify-content-between mt-3">
          <Button
            variant="primary"
            type="submit"
            disabled={loading || loadingUpdate}
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
            {loading || loadingUpdate
              ? "Submitting..."
              : selectedGenreId
              ? "Update Genre"
              : "Create Genre"}
          </Button>

          {selectedGenreId && (
            <Button variant="secondary" onClick={handleCancelEdit}>
              Cancel Edit
            </Button>
          )}
        </div>
      </Form>

      <hr />

      <h2>Genres List</h2>
      {loadingGenres ? (
        <div>Loading genres...</div>
      ) : errorGenres ? (
        <div>Error: {errorGenres}</div>
      ) : (
        <ul>
          {genres.map((genre) => (
            <li key={genre.id}>
              <ul className="list-unstyled">
                <li className="d-flex justify-content-between align-items-center mt-3">
                  <span>{genre.name}</span>
                  <div>
                    <Button
                      variant="info"
                      onClick={() => handleEdit(genre.id, genre.name)}
                      className="me-2"
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
                      variant="danger"
                      onClick={() => handleDeleteConfirmation(genre.id)}
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
                      Delete
                    </Button>
                  </div>
                </li>
              </ul>
            </li>
          ))}
        </ul>
      )}

      <Modal show={showConfirmation} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this genre?</Modal.Body>
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
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10%",
          }}
        >
          <LogCreate onClose={handleCloseLogCreate} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default GenreAdmin;

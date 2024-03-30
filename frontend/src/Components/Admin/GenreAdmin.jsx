import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createGenre, listGenres, updateGenre, resetGenre, deleteGenre, resetDeleteGenre } from '../../actions/genreActions';

const GenreAdmin = () => {
  const [name, setName] = useState('');
  const [selectedGenreId, setSelectedGenreId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [genreToDelete, setGenreToDelete] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listGenres());
  }, [dispatch]);

  const genreCreate = useSelector((state) => state.genreCreate);
  const { loading, error, success } = genreCreate;

  const genreUpdate = useSelector((state) => state.genreUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = genreUpdate;

  const genreDelete = useSelector((state) => state.genreDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = genreDelete;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedGenreId) {
      dispatch(updateGenre(selectedGenreId, { name }))
        .then(() => {
          setName('');
          setSelectedGenreId(null);
          dispatch(listGenres()); // Fetch the updated list of genres
        })
        .catch((error) => console.error("Error updating genre:", error));
    } else {
      dispatch(createGenre({ name }))
        .then(() => {
          setName('');
          setSelectedGenreId(null);
          dispatch(listGenres()); // Fetch the updated list of genres
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
        dispatch(listGenres()); // Fetch the updated list of genres
      })
      .catch((error) => console.error("Error deleting genre:", error));
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleCancelEdit = () => {
    setSelectedGenreId(null);
    setName('');
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
      }, 3000); // Reset after 3 seconds

      // Clear the timeout if the component unmounts before 3 seconds
      return () => clearTimeout(timer);
    }
  }, [success, successUpdate, dispatch]);

  const genreList = useSelector((state) => state.genreList);
  const { loading: loadingGenres, error: errorGenres, genres } = genreList;

  return (
    <div>
      <h2>{selectedGenreId ? 'Edit Genre' : 'Create New Genre'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading || loadingUpdate}>
          {loading || loadingUpdate ? 'Submitting...' : selectedGenreId ? 'Update Genre' : 'Create Genre'}
        </button>
        {selectedGenreId && <button type="button" onClick={handleCancelEdit}>Cancel Edit</button>}
        {error && <div>Error: {error}</div>}
        {errorUpdate && <div>Error: {errorUpdate}</div>}
        {(success || successUpdate) && <div>Genre {selectedGenreId ? 'updated' : 'created'} successfully!</div>}
      </form>

      <h2>Genres List</h2>
      {loadingGenres ? (
        <div>Loading genres...</div>
      ) : errorGenres ? (
        <div>Error: {errorGenres}</div>
      ) : (
        <ul>
          {genres.map((genre) => (
            <li key={genre.id}>
              {genre.name}
              <button type="button" onClick={() => handleEdit(genre.id, genre.name)}>Edit</button>
              <button type="button" onClick={() => handleDeleteConfirmation(genre.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}

      {showConfirmation && (
        <div>
          <p>Are you sure you want to delete this genre?</p>
          <button type="button" onClick={handleConfirmDelete}>Yes</button>
          <button type="button" onClick={handleCancelDelete}>No</button>
        </div>
      )}
    </div>
  );
};

export default GenreAdmin;

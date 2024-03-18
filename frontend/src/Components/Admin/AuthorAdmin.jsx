import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAuthor, listAuthors, resetAuthorCreation } from '../../actions/authorActions';
const AuthorAdmin = () => {
  const [authorName, setAuthorName] = useState('');
  const dispatch = useDispatch();
  const authorCreate = useSelector((state) => state.authorCreate);
  const { loading, success, error } = authorCreate;

  // Dispatch listAuthors action when component mounts
  useEffect(() => {
    dispatch(listAuthors());
  }, [dispatch]);

  // Get list of authors from Redux state
  const authorList = useSelector((state) => state.authorList);
  const { loading: loadingList, authors, error: errorList } = authorList;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createAuthor({ name: authorName }));
  };

  // Reset the form after successful creation
  if (success) {
    setTimeout(() => {
      dispatch(resetAuthorCreation());
      setAuthorName('');
    }, 3000); // Reset after 3 seconds
  }

  return (
    <div>
      <h2>Add Author</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {success && <p>Author created successfully!</p>}
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
        <button type="submit">Create Author</button>
      </form>

      <h2>Authors</h2>
      {loadingList ? (
        <p>Loading authors...</p>
      ) : errorList ? (
        <p>Error: {errorList}</p>
      ) : (
        <ul>
          {authors.map((author) => (
            <li key={author.id}>{author.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AuthorAdmin;

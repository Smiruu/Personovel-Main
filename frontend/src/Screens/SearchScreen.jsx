import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchBooks } from '../actions/searchActions';
import Book from '../Components/Book';
import Loader from '../Components/Loader';
import Message from '../Components/Message';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const { loading, books, error } = useSelector((state) => state.search);

  const handleSearch = () => {
    dispatch(searchBooks({ query }));
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <h2>Search Results</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {books && books.length > 0 ? (
              books.map((book) => (
                <div key={book.id} sm={12} md={6} lg={4} xl={3}>
                  <Book book={book} />
                </div>
              ))
            ) : (
              <Message>No books found.</Message>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;

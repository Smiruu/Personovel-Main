import React, { useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listBooks } from "../actions/bookActions";

const ChapterDropdown = ({ handleBookChange }) => {
  const dispatch = useDispatch();
  const bookList = useSelector((state) => state.bookList);
  const { loading, error, books } = bookList;

  useEffect(() => {
    dispatch(listBooks());
  }, [dispatch]);

  return (
    <div>
      {books.map((book) => (
        <Dropdown key={book._id}>
          <Dropdown.Toggle id={`dropdown-basic-${book._id}`} style={{ backgroundColor: "transparent", border: "none", color: "transparent" }}>
            {loading ? (
              "Loading..."
            ) : error ? (
              `Error: ${error}`
            ) : (
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={book.image}
                  alt={book.title}
                  style={{ width: "150px", height: "auto", marginRight: "10px", objectFit: "cover" }}
                />
                <div>
                  <strong style={{ fontSize: "24px", color: "black" }}>{book.title}</strong>
                  <p style={{ fontSize: "18px", color: "black" }}>{book.author}</p>
                </div>
              </div>
            )}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {loading ? (
              <Dropdown.Item>Loading...</Dropdown.Item>
            ) : error ? (
              <Dropdown.Item>Error: {error}</Dropdown.Item>
            ) : (
              <Dropdown.Item onClick={() => handleBookChange(book)}>
                {book.title}
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
      ))}
    </div>
  );
};

export default ChapterDropdown;

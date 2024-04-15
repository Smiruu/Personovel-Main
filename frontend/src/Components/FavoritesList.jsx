import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavorites } from "../actions/favoriteActions";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const FavoritesList = ({ userId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavorites(userId));
  }, [dispatch, userId]);

  const favoriteBooks = useSelector((state) => state.favorite.favoriteBooks);

  return (
    <div
      style={{
        margin: "20px",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        maxHeight: "500px",
        overflowY: "auto",
      }}
    >
      <h2
        style={{
          fontSize: "24px",
          marginBottom: "20px",
          fontFamily: "Arial, sans-serif",
          textAlign: "center",
        }}
      >
        <FaHeart style={{ marginRight: "10px" }} /> Favorite Books
      </h2>
      {favoriteBooks && favoriteBooks.length > 0 ? (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {favoriteBooks.map((book) => (
            <li
              key={book._id}
              style={{
                marginBottom: "20px",
                borderBottom: "1px solid #ccc",
                paddingBottom: "10px",
              }}
            >
              <Link to={`/books/${book._id}`}>
                <img
                  src={book.image}
                  alt={book.title}
                  style={{
                    width: "100px",
                    height: "150px",
                    marginRight: "20px",
                  }}
                />
              </Link>
              <div style={{ display: "inline-block" }}>
                <strong>{book.title}</strong>
                <br />
                <span>{book.author}</span>
                <br />
                <span style={{ color: "#888" }}>(Genre: {book.genre})</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ textAlign: "center", fontSize: "18px", color: "#888" }}>
          No favorites currently
        </p>
      )}
    </div>
  );
};

export default FavoritesList;

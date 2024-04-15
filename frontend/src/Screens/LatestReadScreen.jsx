import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLatestUserReadingHistory } from "../actions/profileActions";
import Loader from "../Components/Loader";
import { FaBookOpen } from "react-icons/fa";
import { Link } from "react-router-dom";

function LatestReadScreen({ userId }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLatestUserReadingHistory(userId));
  }, [dispatch, userId]);

  const { loading, error, history } = useSelector(
    (state) => state.latestUserReadingHistory
  );

  return (
    <div
      style={{
        margin: "20px",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
    >
      {loading ? (
        <Loader />
      ) : error ? (
        <div style={{ color: "red" }}>Error: {error}</div>
      ) : (
        <>
          {history.book && (
            <>
              {Object.values(history.book).some(
                (value) => value !== null && value !== ""
              ) ? (
                <div>
                  <h2
                    style={{
                      fontSize: "24px",
                      marginBottom: "20px",
                      fontFamily: "Arial, sans-serif",
                    }}
                  >
                    <FaBookOpen style={{ marginRight: "10px" }} /> Latest Read
                    History
                  </h2>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ flex: "1" }}>
                      <p style={{ fontWeight: "bold" }}>
                        Title: {history.book.title}
                      </p>
                      <p>Author: {history.book.author}</p>
                      <p style={{ color: "#888" }}>
                        Read at:{" "}
                        {new Date(history.read_at).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <Link to={`/books/${history.book._id}`}>
                      <img
                        src={history.book.image}
                        alt="Book cover"
                        style={{
                          maxWidth: "200px",
                          maxHeight: "200px",
                          marginLeft: "20px",
                        }}
                      />
                    </Link>
                  </div>
                </div>
              ) : (
                <div>
                  <h2
                    style={{
                      fontSize: "24px",
                      marginBottom: "20px",
                      fontFamily: "Arial, sans-serif",
                    }}
                  >
                    <FaBookOpen style={{ marginRight: "10px" }} /> Latest Read
                    History
                  </h2>
                  <div style={{ fontStyle: "italic", color: "#888" }}>
                    No reading history available
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default LatestReadScreen;

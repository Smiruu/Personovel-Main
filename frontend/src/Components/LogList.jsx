import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listLogs } from "../actions/logActions";
import { FaUser, FaHistory, FaClock } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";

function LogList() {
  const dispatch = useDispatch();
  const { loading, logs, error } = useSelector((state) => state.logList);

  useEffect(() => {
    dispatch(listLogs());
  }, [dispatch]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const sortedLogs = logs
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          marginTop: "10px",
          marginBottom: "10px",
          color: "#333",
          fontSize: "24px",
          fontWeight: "bold",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <FaHistory style={{ marginRight: "10px" }} />
        RECENT CHANGES:
      </h1>
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "8px",
          padding: "20px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && (
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {sortedLogs.map((log) => (
              <li
                key={log.id}
                style={{
                  marginBottom: "20px",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "15px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <FaUser style={{ marginRight: "5px" }} />
                  <strong style={{ marginRight: "5px" }}>User:</strong>{" "}
                  {log.user_name}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <FaClock style={{ marginRight: "5px" }} />
                  <strong style={{ marginRight: "5px" }}>Action:</strong>{" "}
                  {log.action}
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <FaClock style={{ marginRight: "5px" }} />
                  <strong style={{ marginRight: "5px" }}>Date:</strong>{" "}
                  {formatDate(log.date)}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default LogList;

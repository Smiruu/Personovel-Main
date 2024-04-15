import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createLog } from "../actions/logActions";

const LogCreate = ({ user }) => {
  const dispatch = useDispatch();
  const [logData, setLogData] = useState({
    user: user && user.id ? user.id : "",
    action: "",
  });
  const { error, success } = useSelector((state) => state.logCreate);

  const handleChange = (e) => {
    setLogData({ ...logData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createLog(logData));

    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  return (
    <div className="log-create">
      <form onSubmit={handleSubmit}>
        <div className="d-flex flex-column align-items-center">
          <h4 className="text-center mb-3">Indicate Changes:</h4>
          <div className="form-group flex-grow-1">
            <input
              type="text"
              name="action"
              value={logData.action}
              onChange={handleChange}
              className="form-control"
              style={{ width: "100%" }}
            />
          </div>
          <div className="button-group mt-3">
            <button
              type="submit"
              className="submit-button"
              style={{
                backgroundColor: "#BC1823",
                color: "white",
                textTransform: "uppercase",
                border: "1px solid #BC1823",
                padding: "8px 16px",
                borderRadius: "4px",
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
              Submit
            </button>
          </div>
        </div>
      </form>
      {error && <p>Error: {error}</p>}
      {success && <p>Log created successfully!</p>}
    </div>
  );
};

export default LogCreate;

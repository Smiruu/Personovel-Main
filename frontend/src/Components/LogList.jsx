import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listLogs } from '../actions/logActions';

function LogList() {
  const dispatch = useDispatch();
  const { loading, logs, error } = useSelector((state) => state.logList);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    dispatch(listLogs());
  }, [dispatch]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); 
  };

  return (
    <div>
      <h1>Recent Changes:</h1>
      <div style={{ height: '400px' }}>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {logs.slice().reverse().map((log, index) => (
              <li key={log.id} style={{ marginBottom: '20px' }}>
                <strong>User:</strong> {log.user_name} <br />
                <strong>Action:</strong> {log.action} <br />
                <strong>Date:</strong> {formatDate(log.date)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default LogList;

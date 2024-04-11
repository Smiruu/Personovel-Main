import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listLogs } from '../actions/logActions';

function LogList() {
  const dispatch = useDispatch();
  const { loading, logs, error } = useSelector((state) => state.logList);

  useEffect(() => {
    // Dispatch listLogs action when the component mounts
    dispatch(listLogs());
  }, [dispatch]); // Dependency array to ensure this effect runs only once

  useEffect(() => {
    // Subscribe to changes in logs after component mounts
    const unsubscribe = subscribeToLogs();
    return () => {
      // Unsubscribe from changes when the component unmounts
      unsubscribe();
    };
  }, []); // Empty dependency array means this effect runs only once after component mounts

  const subscribeToLogs = () => {
    // Subscribe to changes in logs
    return () => {
      dispatch(listLogs()); // Dispatch action to fetch logs whenever there's a change
    };
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // You can adjust the format using options here
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

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLatestUserReadingHistory } from '../actions/profileActions';
import Loader from '../Components/Loader';

function LatestReadScreen({ userId }) { // Receive userId as a prop
  const dispatch = useDispatch();

  // Fetch the latest reading history when the component mounts
  useEffect(() => {
    // Fetch the latest reading history for the userId
    dispatch(getLatestUserReadingHistory(userId));
  }, [dispatch, userId]);

  // Access the latest reading history from the Redux store
  const { loading, error, history } = useSelector((state) => state.latestUserReadingHistory);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div>
          <h2>Latest Read History</h2>
          
          {history.book ? (
            <div>
              <p>Title: {history.book.title}</p>
              <img
                src={history.book.image}
                alt="Book cover"
                style={{ maxWidth: '200px', maxHeight: '200px' }} // Adjust the width and height as needed
              />
              <p>Author: {history.book.author}</p>
              <p>Read at: {new Date(history.read_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              {/* Render other properties of the book as needed */}
            </div>
          ) : (
            <div>No reading history available</div>
          )}
        </div>
      )}
    </div>
  );
}

export default LatestReadScreen;

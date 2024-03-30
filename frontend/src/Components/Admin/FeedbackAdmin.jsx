import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeedbacks, deleteFeedback } from '../../actions/feedbackActions';

const FeedbackAdmin = () => {
    const dispatch = useDispatch();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [feedbackToDelete, setFeedbackToDelete] = useState(null);
    const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);

    const feedbackList = useSelector((state) => state.feedbackList);
    const { loading, error, feedbacks } = feedbackList;

    useEffect(() => {
        dispatch(fetchFeedbacks());
    }, [dispatch]);

    const handleDeleteConfirmation = (id) => {
        setSelectedFeedbackId(id);
        setShowConfirmation(true);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteFeedback(selectedFeedbackId))
            .then(() => {
                // Fetch feedbacks again after successful deletion
                dispatch(fetchFeedbacks());
            })
            .catch((error) => console.error('Error deleting feedback:', error));
        setShowConfirmation(false);
        setSelectedFeedbackId(null); // Reset selectedFeedbackId after deletion
    };

    const handleCancelDelete = () => {
        setShowConfirmation(false);
        setSelectedFeedbackId(null);
    };

    // Sort feedbacks by createdAt in descending order
    const sortedFeedbacks = feedbacks.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return (
        <div>
            <h1>Submitted Feedback</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <div>
                    {sortedFeedbacks.map((feedback) => (
                        <div key={feedback.id}>
                            <p>Email: {feedback.email}</p>
                            <p>Subject: {feedback.subject}</p>
                            <p>Concern: {feedback.concern}</p>
                            <p>Created At: {new Date(feedback.created_at).toLocaleString()}</p> {/* Display the createdAt field */}
                            <button onClick={() => handleDeleteConfirmation(feedback.id)}>Delete</button>
                            
                            {/* Confirmation Modal */}
                            {showConfirmation && selectedFeedbackId === feedback.id && (
                                <div>
                                    <p>Are you sure you want to delete this feedback?</p>
                                    <button onClick={handleConfirmDelete}>Yes</button>
                                    <button onClick={handleCancelDelete}>No</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FeedbackAdmin;

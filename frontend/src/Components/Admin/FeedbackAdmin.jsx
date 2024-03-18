import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeedbacks } from '../../actions/feedbackActions';
const FeedbackAdmin = () => {
    const dispatch = useDispatch();
    const feedbackList = useSelector((state) => state.feedbackList);
    const { loading, error, feedbacks } = feedbackList;

    useEffect(() => {
        dispatch(fetchFeedbacks());
    }, [dispatch]);

    return (
        <div>
            <h1>Submitted Feedback</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <div>
                    {feedbacks.map((feedback) => (
                        <div key={feedback.id}>
                            <p>Email: {feedback.email}</p>
                            <p>Subject: {feedback.subject}</p>
                            <p>Concern: {feedback.concern}</p>
                            <p>Created At: {feedback.createdAt}</p>
                            {/* You can display other fields here */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FeedbackAdmin;

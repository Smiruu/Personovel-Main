import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import Message from "../Components/Message";
import Loader from "../Components/Loader";

const CommentSection = ({ comments, loadingComments, commentsError, handleCommentSubmit, handleReply, commentText, setCommentText, userId }) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyingToCommentId, setReplyingToCommentId] = useState(null);

  const handleReplyButtonClick = (commentId) => {
    setShowReplyInput(true);
    setReplyingToCommentId(commentId);
  };

  const handleCancelReply = () => {
    setShowReplyInput(false);
    setReplyingToCommentId(null);
  };

  const handleCommentReplySubmit = async (e) => {
    e.preventDefault();
    // Get the reply content from the form
    const replyContent = e.target.elements.replyTextArea.value.trim();
    if (!replyContent) {
      // Optionally handle empty reply content
      return;
    }

    try {
      // Call the handleReply function passed from the parent component (BookDetail)
      handleReply(replyingToCommentId, replyContent, userId);
      
      // Reset reply form and hide it
      e.target.elements.replyTextArea.value = "";
      setShowReplyInput(false);
      setReplyingToCommentId(null);
    } catch (error) {
      // Handle error if reply submission fails
      console.error("Error submitting reply:", error);
    }
  };

  return (
    <>
      <h3>Comments</h3>
      <Form onSubmit={handleCommentSubmit}>
        <Form.Group controlId="commentTextArea">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Write your comment here..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Post Comment
        </Button>
      </Form>

      <Row className="mt-3">
        <Col md={12}>
          {loadingComments ? (
            <Loader />
          ) : commentsError ? (
            <Message>No comments yet.</Message>
          ) : comments && comments.length > 0 ? (
            <div>
              {comments.map((comment) => (
                <div key={comment.comment_id} className="mb-3">
                  <div className="comment-container">
                    <strong>{comment.name}</strong>
                    <p className="comment-content">{comment.comment}</p>
                    <p className="comment-date">Posted on: {new Date(comment.created_at).toLocaleString()}</p>
                    <Button variant="secondary" onClick={() => handleReplyButtonClick(comment.comment_id)}>
                      Reply
                    </Button>
                  </div>
                  {showReplyInput && replyingToCommentId === comment.comment_id && (
                    <Form onSubmit={handleCommentReplySubmit}>
                      <Form.Group controlId="replyTextArea">
                        <Form.Control
                          as="textarea"
                          rows={1}
                          placeholder="Write your reply here..."
                        />
                      </Form.Group>
                      <Button type="submit" variant="primary">
                        Post Reply
                      </Button>
                      <Button variant="secondary" onClick={handleCancelReply}>
                        Cancel
                      </Button>
                    </Form>
                  )}
                </div>
              ))}
              {/* Log all comment IDs */}
              {comments.map((comment) => (
                console.log("Comment ID:", comment.comment_id)
              ))}
            </div>
          ) : (
            <Message>No comments yet.</Message>
          )}
        </Col>
      </Row>
    </>
  );
};

export default CommentSection;

import React, { useState } from "react";
import { Button, Form, Col, Row, Card } from "react-bootstrap";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import { useDispatch } from "react-redux";

const CommentSection = ({
  comments,
  replies,
  loadingComments,
  commentsError,
  handleCommentSubmit,
  handleReply,
  setCommentText,
  commentText,
  userId,
  userInfo
}) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyingToCommentId, setReplyingToCommentId] = useState(null);
  const [showRepliesForComment, setShowRepliesForComment] = useState({});

  const dispatch = useDispatch();

  const handleReplyButtonClick = (commentId) => {
    // Use optional chaining to safely access nested properties
    if (userInfo?.token?.is_paid) {
      setShowReplyInput(true);
      setReplyingToCommentId(commentId);
    }
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

  const toggleRepliesForComment = (commentId) => {
    setShowRepliesForComment((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId]
    }));
  };

  return (
    <>
      <h3>Comments</h3>
      {userInfo.token && userInfo.token.is_paid && (
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
      )}
      <Row className="mt-3">
        <Col md={12}>
          {loadingComments ? (
            <Loader />
          ) : commentsError ? (
            <Message>No comments yet.</Message>
          ) : comments && comments.length > 0 ? (
            <div>
              {comments.map((comment) => (
                <Card key={comment.comment_id} className="mb-3">
                  <Card.Body>
                    <div className="d-flex align-items-center mb-2">
                      <img src={comment.picture} alt="Profile" className="rounded-circle mr-2" style={{ width: '30px', height: '30px' }} />
                      <Card.Title>{comment.name}</Card.Title>
                    </div>
                    <Card.Text>{comment.comment}</Card.Text>
                    <Card.Text className="text-muted">Posted on: {new Date(comment.created_at).toLocaleString()}</Card.Text>
                    {(userInfo.token && userInfo.token.is_paid) && (
                      <Button variant="secondary" onClick={() => handleReplyButtonClick(comment.comment_id)}>
                        Reply
                      </Button>
                    )}
                    <Button variant="link" onClick={() => toggleRepliesForComment(comment.comment_id)}>
                      {showRepliesForComment[comment.comment_id] ? "Hide Replies" : "View Replies"}
                    </Button>
                    {showRepliesForComment[comment.comment_id] && (
                      <div>
                        {/* Map replies for the current comment */}
                        {replies.map((reply) => {
                          if (reply.comment_id === comment.comment_id) {
                            return (
                              <Card key={reply.reply_id} className="mt-3">
                                <Card.Body>
                                  <div className="d-flex align-items-center mb-2">
                                    <img src={reply.picture} alt="Profile" className="rounded-circle mr-2" style={{ width: '30px', height: '30px' }} />
                                    <Card.Text>{reply.reply}</Card.Text>
                                  </div>
                                  <Card.Text className="text-muted">Reply by: {reply.name}</Card.Text>
                                  <Card.Text className="text-muted">Posted on: {new Date(reply.created_at).toLocaleString()}</Card.Text>
                                </Card.Body>
                              </Card>
                            );
                          }
                          return null;
                        })}
                      </div>
                    )}
                  </Card.Body>
                  {userInfo.token && userInfo.token.is_paid && showReplyInput && replyingToCommentId === comment.comment_id && (
                    <Card.Footer>
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
                    </Card.Footer>
                  )}
                </Card>
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

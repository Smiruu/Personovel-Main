import React, { useState } from "react";
import { Button, Form, Col, Row, Card, Image } from "react-bootstrap";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaRegComment,
  FaEye,
  FaRegTimesCircle,
  FaPaperPlane,
  FaComments,
} from "react-icons/fa";

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
  userInfo,
}) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyingToCommentId, setReplyingToCommentId] = useState(null);
  const [showRepliesForComment, setShowRepliesForComment] = useState({});

  const handleReplyButtonClick = (commentId) => {
    if (userInfo?.token?.is_paid || userInfo?.token?.is_admin) {
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
    const replyContent = e.target.elements.replyTextArea.value.trim();
    if (!replyContent) {
      return;
    }

    try {
      handleReply(replyingToCommentId, replyContent, userId);
      e.target.elements.replyTextArea.value = "";
      setShowReplyInput(false);
      setReplyingToCommentId(null);
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };

  const toggleRepliesForComment = (commentId) => {
    setShowRepliesForComment((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };

  return (
    <>
      <div style={{ marginBottom: "20px" }}>
        <h1
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontFamily: "Arial, sans-serif",
            fontSize: "30px",
            color: "#333",
          }}
        >
          <FaComments style={{ marginRight: "5px" }} /> COMMENTS
        </h1>
      </div>
      {userInfo.token &&
        (userInfo.token.is_admin || userInfo.token.is_paid) && (
          <Form onSubmit={handleCommentSubmit}>
            <Form.Group controlId="commentTextArea">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Write your comment here..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                style={{ marginBottom: "10px" }}
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              <FaPaperPlane /> Post Comment
            </Button>
          </Form>
        )}

      <Row style={{ marginTop: "20px" }}>
        <Col md={12}>
          {loadingComments ? (
            <Loader />
          ) : commentsError ? (
            <Message variant="danger">Error loading comments.</Message>
          ) : comments && comments.length > 0 ? (
            <div>
              {comments.map((comment) => (
                <Card
                  key={comment.comment_id}
                  style={{
                    marginBottom: "10px",
                    backgroundColor: "white",
                    padding: "15px",
                    borderRadius: "10px",
                  }}
                >
                  <Card.Body>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      {userInfo.token.id === comment.user_id ? (
                        <Link to={`/profile`}>
                          <Image
                            src={comment.picture}
                            alt="Profile"
                            roundedCircle
                            style={{
                              width: "50px",
                              height: "50px",
                              marginRight: "15px",
                              borderRadius: "50%",
                              border: "2px solid #002960",
                            }}
                          />
                        </Link>
                      ) : (
                        <Link to={`/profile/${comment.user_id}`}>
                          <Image
                            src={comment.picture}
                            alt="Profile"
                            roundedCircle
                            style={{
                              width: "50px",
                              height: "50px",
                              marginRight: "15px",
                              borderRadius: "50%",
                              border: "2px solid #002960",
                            }}
                          />
                        </Link>
                      )}
                      <Card.Title
                        style={{ fontWeight: "bold", fontSize: "20px" }}
                      >
                        <FaUser /> {comment.name}
                      </Card.Title>
                    </div>

                    <Card.Text style={{ fontSize: "15px" }}>
                      <FaRegComment /> {comment.comment}
                    </Card.Text>
                    <Card.Text style={{ fontSize: "15px", color: "#6c757d" }}>
                      <FaRegTimesCircle /> Posted on:{" "}
                      {new Date(comment.created_at).toLocaleString()}
                    </Card.Text>
                    {userInfo.token &&
                      (userInfo.token.is_paid || userInfo.token.is_admin) && (
                        <Button
                          variant="secondary"
                          onClick={() =>
                            handleReplyButtonClick(comment.comment_id)
                          }
                          style={{ marginRight: "10px" }}
                        >
                          <FaRegComment /> Reply
                        </Button>
                      )}
                    {replies.some(
                      (reply) => reply.comment_id === comment.comment_id
                    ) && (
                      <Button
                        variant="link"
                        onClick={() =>
                          toggleRepliesForComment(comment.comment_id)
                        }
                        style={{ marginRight: "10px" }}
                      >
                        <FaEye />{" "}
                        {showRepliesForComment[comment.comment_id]
                          ? "Hide Replies"
                          : `View ${
                              replies.filter(
                                (reply) =>
                                  reply.comment_id === comment.comment_id
                              ).length
                            } Replies`}
                      </Button>
                    )}

                    {showRepliesForComment[comment.comment_id] && (
                      <div>
                        {replies.map((reply) => {
                          if (reply.comment_id === comment.comment_id) {
                            return (
                              <Card
                                key={reply.reply_id}
                                style={{
                                  marginTop: "10px",
                                  marginLeft: "30px",
                                  borderLeft: "2px solid #002960",
                                  paddingLeft: "15px",
                                  backgroundColor: "#f0f0f0",
                                  borderRadius: "8px",
                                }}
                              >
                                <Card.Body>
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      marginBottom: "15px",
                                    }}
                                  >
                                    <Link to={`/profile/${reply.user_id}`}>
                                      <Image
                                        src={reply.picture}
                                        alt="Profile"
                                        roundedCircle
                                        style={{
                                          width: "40px",
                                          height: "40px",
                                          marginRight: "10px",
                                          borderRadius: "50%",
                                          border: "2px solid #002960",
                                        }}
                                      />
                                    </Link>
                                    <div>
                                      <h1
                                        style={{
                                          fontWeight: "bold",
                                          fontSize: "20px",
                                        }}
                                      >
                                        <FaUser /> {reply.name}
                                      </h1>
                                      <p
                                        style={{
                                          fontSize: "12px",
                                          fontStyle: "italic",
                                          marginBottom: "2%",
                                          color: "#6c757d",
                                        }}
                                      >
                                        Reply to {comment.name}'s comment.
                                      </p>
                                    </div>
                                  </div>
                                  <p style={{ fontSize: "15px" }}>
                                    <FaRegComment /> {reply.reply}
                                  </p>
                                  <Card.Text
                                    style={{
                                      fontSize: "15px",
                                      color: "#6c757d",
                                    }}
                                  >
                                    <FaUser /> Reply by: {reply.name}
                                  </Card.Text>
                                  <Card.Text
                                    style={{
                                      fontSize: "15px",
                                      color: "#6c757d",
                                    }}
                                  >
                                    <FaRegTimesCircle /> Posted on:{" "}
                                    {new Date(
                                      reply.created_at
                                    ).toLocaleString()}
                                  </Card.Text>
                                </Card.Body>
                              </Card>
                            );
                          }
                          return null;
                        })}
                      </div>
                    )}
                  </Card.Body>
                  {userInfo.token &&
                    (userInfo.token.is_paid || userInfo.token.is_admin) &&
                    showReplyInput &&
                    replyingToCommentId === comment.comment_id && (
                      <Card.Footer>
                        <Form onSubmit={handleCommentReplySubmit}>
                          <Form.Group controlId="replyTextArea">
                            <Form.Control
                              as="textarea"
                              rows={1}
                              placeholder="Write your reply here..."
                            />
                          </Form.Group>
                          <Button type="submit" variant="primary mt-3">
                            <FaPaperPlane /> Post Reply
                          </Button>
                          <Button
                            variant="secondary mt-3"
                            onClick={handleCancelReply}
                            style={{ marginLeft: "10px" }}
                          >
                            <FaRegTimesCircle /> Cancel
                          </Button>
                        </Form>
                      </Card.Footer>
                    )}
                </Card>
              ))}
            </div>
          ) : (
            <Message variant="info">No comments yet.</Message>
          )}
        </Col>
      </Row>
    </>
  );
};

export default CommentSection;

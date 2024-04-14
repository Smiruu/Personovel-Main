import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCommentsAndReplies } from "../actions/commentActions";
import { FaUser } from "react-icons/fa";
import { Row, Col } from "react-bootstrap";

function ConversationScreen() {
  const dispatch = useDispatch();
  const { loading, comments, replies, error } = useSelector(
    (state) => state.CommentandReplyUser
  );
  const userLoginInfo = useSelector((state) => state.userLogin.userInfo);
  const userRegisterInfo = useSelector((state) => state.userRegister.userInfo);
  const userInfo = userLoginInfo || userRegisterInfo;
  const userId = userInfo.token.id;

  useEffect(() => {
    dispatch(getUserCommentsAndReplies(userId));
  }, [dispatch, userId]);

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
          fontSize: "18px",
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f8f9fa",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
          fontSize: "18px",
          color: "red",
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f8f9fa",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        Error: {error}
      </div>
    );
  }

  const renderCommentCards = () => {
    return comments.map((comment) => (
      <Col xs={12} key={comment.id} style={{ marginBottom: "20px" }}>
        <div
          style={{
            borderBottom: "1px solid #ccc",
            paddingBottom: "10px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
            padding: "10px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                marginRight: "10px",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                backgroundColor: "#fff",
                backgroundImage: `url(${comment.user_profile_image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {comment.user_profile_image ? null : (
                <FaUser
                  style={{ fontSize: "24px", color: "#555", margin: "13px" }}
                />
              )}
            </div>

            <div>
              <p style={{ margin: "0", fontSize: "16px", fontWeight: "bold" }}>
                {comment.user_profile_name}
              </p>
              <p style={{ margin: "0", fontSize: "14px", color: "#555" }}>
                Created At: {comment.created_at}
              </p>
              <p style={{ margin: "0", fontSize: "14px", color: "#555" }}>
                Replied from: {comment.book_name}
              </p>
            </div>
          </div>
          <p style={{ marginTop: "10px", fontSize: "16px" }}>
            {comment.comment}
          </p>
        </div>
      </Col>
    ));
  };

  const renderReplyCards = () => {
    return replies.map((reply) => (
      <Col xs={12} key={reply.id} style={{ marginBottom: "20px" }}>
        <div
          style={{
            borderBottom: "1px solid #ccc",
            paddingBottom: "10px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
            padding: "10px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                marginRight: "10px",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                backgroundColor: "#fff",
                backgroundImage: `url(${reply.user_profile_image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {reply.user_profile_image ? null : (
                <FaUser
                  style={{ fontSize: "24px", color: "#555", margin: "13px" }}
                />
              )}
            </div>
            <div>
              <p style={{ margin: "0", fontSize: "16px", fontWeight: "bold" }}>
                {reply.user_profile_name}
              </p>
              <p style={{ margin: "0", fontSize: "14px", color: "#555" }}>
                Created At: {reply.created_at}
              </p>
              <p style={{ margin: "0", fontSize: "14px", color: "#555" }}>
                Replied from: {reply.book_name}
              </p>
            </div>
          </div>
          <p style={{ marginTop: "10px", fontSize: "16px" }}>{reply.reply}</p>
        </div>
      </Col>
    ));
  };

  return (
    <Row
      style={{
        margin: "20px",
        fontFamily: "Arial, sans-serif",
        padding: "30px",
        borderRadius: "10px",
      }}
    >
      <Col xs={12} md={6}>
        <div
          style={{
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            marginBottom: "20px",
          }}
        >
          <h1
            style={{
              fontSize: "24px",
              marginBottom: "20px",
              textAlign: "center",
              fontFamily: "Arial, sans-serif",
              marginTop: "20px",
            }}
          >
            <FaUser style={{ fontSize: "24px", marginRight: "10px" }} />
            USER COMMENTS:
          </h1>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {renderCommentCards()}
          </div>
        </div>
      </Col>

      <Col xs={12} md={6}>
        <div
          style={{
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            marginBottom: "20px",
          }}
        >
          <h1
            style={{
              fontSize: "24px",
              marginTop: "20px",
              textAlign: "center",
              fontFamily: "Arial, sans-serif",
            }}
          >
            <FaUser style={{ fontSize: "24px", marginRight: "10px" }} />
            USER REPLIES:
          </h1>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {replies.length > 0 ? (
              renderReplyCards()
            ) : (
              <div
                style={{
                  fontSize: "16px",
                  color: "red",
                  textAlign: "center",
                  backgroundColor: "#FCD5CE",
                  padding: "10px",
                  borderRadius: "5px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                No replies found
              </div>
            )}
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default ConversationScreen;

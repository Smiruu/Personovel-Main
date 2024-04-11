import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCommentsAndReplies } from "../actions/commentActions";
import { FaUser } from "react-icons/fa";

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

  return (
    <div
      style={{
        margin: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f8f9fa",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <h1
        style={{
          fontSize: "24px",
          marginBottom: "20px",
          textAlign: "center",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <FaUser style={{ fontSize: "24px", marginRight: "10px" }} />
        USER COMMENTS:
      </h1>
      <ul style={{ listStyle: "none", padding: "0" }}>
        {comments.map((comment) => (
          <li
            key={comment.id}
            style={{
              marginBottom: "20px",
              borderBottom: "1px solid #ccc",
              paddingBottom: "10px",
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
                <p
                  style={{ margin: "0", fontSize: "16px", fontWeight: "bold" }}
                >
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
          </li>
        ))}
      </ul>
      <h1
        style={{
          fontSize: "24px",
          marginBottom: "20px",
          textAlign: "center",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <FaUser style={{ fontSize: "24px", marginRight: "10px" }} />
        USER REPLIES:
      </h1>

      <ul style={{ listStyle: "none", padding: "0" }}>
        {Array.isArray(replies) && replies.length > 0 ? (
          replies.map((reply) => (
            <li
              key={reply.id}
              style={{
                marginBottom: "20px",
                borderBottom: "1px solid #ccc",
                paddingBottom: "10px",
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
                      style={{
                        fontSize: "24px",
                        color: "#555",
                        margin: "13px",
                      }}
                    />
                  )}
                </div>
                <div>
                  <p
                    style={{
                      margin: "0",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
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
              <p style={{ marginTop: "10px", fontSize: "16px" }}>
                {reply.reply}
              </p>
            </li>
          ))
        ) : (
          <li style={{ fontSize: "16px", color: "#555", textAlign: "center" }}>
            No replies found
          </li>
        )}
      </ul>
    </div>
  );
}

export default ConversationScreen;

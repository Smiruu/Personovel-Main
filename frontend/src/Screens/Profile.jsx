import React, { useState, useEffect } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardImage,
  MDBTypography,
  MDBInput,
} from "mdb-react-ui-kit";
import "./Profile.css";

export default function EditButton() {
  const [name, setName] = useState(localStorage.getItem("name") || "Mario");
  const [nameError, setNameError] = useState("");
  const [activeTab, setActiveTab] = useState("ABOUT");
  const [bio, setBio] = useState(localStorage.getItem("bio") || "");
  const [joinDate] = useState(new Date());
  const [subscriptionDuration, setSubscriptionDuration] = useState(0);

  useEffect(() => {
    const today = new Date();
    const diffTime = Math.abs(today - joinDate);
    setSubscriptionDuration(Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  }, [joinDate]);

  const [backgroundImage, setBackgroundImage] = useState(
    localStorage.getItem("backgroundImage") || ""
  );
  const [profileIcon, setProfileIcon] = useState(
    localStorage.getItem("profileIcon") || ""
  );

  const [editMode, setEditMode] = useState(false);

  const handleBackgroundImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackgroundImage(reader.result);
        localStorage.setItem("backgroundImage", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileIconChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileIcon(reader.result);
        localStorage.setItem("profileIcon", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEditMode = () => {
    if (editMode) {
      saveChanges();
    } else {
      if (name.trim() === "") {
        setNameError("Name cannot be empty");
        return;
      }

      setNameError("");
      setEditMode(true);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleBioChange = (e) => {
    const newBio = e.target.value;
    if (countWords(newBio) <= MAX_WORDS) {
      setBio(newBio);
      localStorage.setItem("bio", newBio);
    }
  };

  const countWords = (text) => {
    const words = text.trim().split(/\s+/);
    return words.length;
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    setNameError(newName.trim() === "" ? "Name cannot be empty" : "");

    localStorage.setItem("name", newName);
  };

  const saveChanges = () => {
    if (name.trim() === "") {
      setNameError("Name cannot be empty");
      return;
    }
    setNameError("");
    setEditMode(false);
  };

  const MAX_WORDS = 50;
  const MAX_NAME_LENGTH = 10;

  const userIsSubscribed = true;
  const subscriptionExpiryDate = "2024-12-31";

  return (
    <div>
      <MDBContainer className="upc">
        <MDBRow className="justify-content-center align-items-center">
          <MDBCol>
            <MDBCard>
              <div
                className="background"
                style={{ backgroundImage: `url(${backgroundImage})` }}
              >
                {editMode && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBackgroundImageChange}
                  />
                )}

                <div className="ms-5 mt-5" style={{ width: "150px" }}>
                  <MDBCardImage
                    className="profile-icon mt-4 mb-2"
                    fluid
                    style={{ backgroundImage: `url(${profileIcon})` }}
                  />
                  {editMode && (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfileIconChange}
                      className="edit-input"
                    />
                  )}
                </div>
              </div>
            </MDBCard>
          </MDBCol>
        </MDBRow>

        <div className="username d-flex align-items-center ms-5 mt-4">
          <MDBTypography tag="h5" className="me-2">
            {editMode ? (
              <>
                <div className="error-message">{nameError}</div>
                <input
                  type="text"
                  className="name-change"
                  placeholder="Watcha want others to call u?"
                  value={name}
                  onChange={handleNameChange}
                />
                <div className="character-count">
                  Character Count: {name.length}/{MAX_NAME_LENGTH}
                </div>
              </>
            ) : (
              name
            )}

            <MDBCardText tag="p">@kirbs_boi</MDBCardText>
          </MDBTypography>

          <button className="edit-profile ms-auto" onClick={toggleEditMode}>
            {editMode ? "SAVE CHANGES" : "EDIT PROFILE"}
          </button>
        </div>

        <div className="tabs-container mt-3">
          <button
            className={`profile-tab ${activeTab === "ABOUT" && "active"}`}
            onClick={() => handleTabClick("ABOUT")}
          >
            ABOUT
          </button>
          <button
            className={`profile-tab ${
              activeTab === "CONVERSATIONS" && "active"
            }`}
            onClick={() => handleTabClick("CONVERSATIONS")}
          >
            CONVERSATIONS
          </button>
          <button
            className={`profile-tab ${
              activeTab === "SUBSCRIPTIONS" && "active"
            }`}
            onClick={() => handleTabClick("SUBSCRIPTIONS")}
          >
            SUBSCRIPTIONS
          </button>
        </div>

        <div className="tab-content mt-3">
          {activeTab === "ABOUT" && (
            <div className="two-column-layout">
              <div className="left-column">
                {editMode ? (
                  <>
                    <strong className="bio">Edit Bio</strong>
                    <MDBInput
                      placeholder="What can you say about yourself?"
                      textarea
                      value={bio}
                      onChange={handleBioChange}
                    />
                    <p>
                      Word Count: {countWords(bio)}/{MAX_WORDS}
                    </p>

                    <div className="bio-info">
                      <p className="join mt-2">
                        <strong>Joined on:</strong>{" "}
                        {joinDate.toLocaleDateString()}
                      </p>
                      <p className="sub">
                        <strong>Subscription Duration:</strong>{" "}
                        {subscriptionDuration} day/s
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <strong className="bio">Bio</strong>
                    <p>{bio}</p>
                    <p className="join mt-2">
                      <strong>Joined on:</strong>{" "}
                      {joinDate.toLocaleDateString()}
                    </p>
                    <p className="sub">
                      <strong>Subscription Duration:</strong>{" "}
                      {subscriptionDuration} day/s
                    </p>
                  </>
                )}
              </div>
              <div className="right-column">
                <h1>BLANK FOR NOW UWU</h1>
              </div>
            </div>
          )}

          {activeTab === "CONVERSATIONS" && (
            <div className="conversation-container">
              <div className="comment">
                <div className="comment-avatar">
                  <img src="https://placekitten.com/50/50" alt="User Avatar" />
                </div>
                <div className="comment-content">
                  <h1 className="comment-username">JohnDoe</h1>
                  <p className="comment-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    aliquet velit sit amet molestie luctus. Integer vel
                    fermentum odio.
                  </p>

                  <div className="reply-container">
                    <div className="reply-content">
                      <div className="reply-avatar">
                        <img
                          src="https://placekitten.com/40/40"
                          alt="Reply Avatar"
                        />
                      </div>
                      <div>
                        <h1 className="reply-username">JaneDoe</h1>
                        <p className="reply-p">Reply to JohnDoe's comment.</p>
                        <p className="reply-text">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit.
                        </p>
                      </div>
                    </div>

                    <div className="reply-container">
                      <div className="reply-content">
                        <div className="reply-avatar">
                          <img
                            src="https://placekitten.com/70/70"
                            alt="Reply Avatar"
                          />
                        </div>
                        <div>
                          <h1 className="reply-username">JaneDoe</h1>
                          <p className="reply-p">Reply to JohnDoe's comment.</p>
                          <p className="reply-text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit.
                          </p>
                        </div>
                      </div>

                      <div className="reply-container">
                        <div className="reply-content">
                          <div className="reply-avatar">
                            <img
                              src="https://placekitten.com/100/100"
                              alt="Reply Avatar"
                            />
                          </div>
                          <div>
                            <h1 className="reply-username">JaneDoe</h1>
                            <p className="reply-p">
                              Reply to JohnDoe's comment.
                            </p>
                            <p className="reply-text">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="reply-container">
                    <div className="reply-content">
                      <div className="reply-avatar">
                        <img
                          src="https://placekitten.com/70/70"
                          alt="Reply Avatar"
                        />
                      </div>
                      <div>
                        <h1 className="reply-username">JaneDoe</h1>
                        <p className="reply-p">Reply to JohnDoe's comment.</p>
                        <p className="reply-text">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "SUBSCRIPTIONS" && (
            <div className="subscription-container">
              <div className="two-column-layout">
                <div className="left-column-sub">
                  <img
                    src="https://placekitten.com/100/100"
                    alt="Subscription Advertisement"
                    style={{ maxWidth: "100%", borderRadius: "8px" }}
                  />
                  <div className="subscription-info mt-3">
                    <p>Subscribe now and enjoy premium features!</p>
                    <p>Exclusive content, ad-free experience, and more!</p>
                  </div>
                  <button className="subscribe" onClick={() => {}}>
                    Subscribe Now
                  </button>
                </div>
                <div className="right-column-sub">
                  <div className="subscription-info">
                    {userIsSubscribed ? (
                      <>
                        <p>
                          Your current subscription will expire on{" "}
                          {subscriptionExpiryDate}.
                        </p>
                        <p>Unlock premium features and benefits!</p>
                      </>
                    ) : (
                      <p>
                        You are not currently subscribed. Subscribe now to enjoy
                        premium features!
                      </p>
                    )}
                  </div>
                  <button
                    className={userIsSubscribed ? "extend" : "subscribe"}
                    onClick={() => {}}
                  >
                    {userIsSubscribed ? "Extend Subscription" : "Subscribe Now"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </MDBContainer>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserProfile, getUserDetails } from "../actions/profileActions";
import Loader from "../Components/Loader";
import { useNavigate } from "react-router-dom";
import { Modal, Form, Button, Image } from "react-bootstrap";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBTypography,
} from "mdb-react-ui-kit";
import AdminScreen from "./AdminScreen";
import StatisticScreen from "./StatisticScreen";
import ConversationScreen from "./ConversationScreen";
import PaymentScreen from "./PaymentScreen";
import LatestScreen from "./LatestScreen";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLoginInfo = useSelector((state) => state.userLogin.userInfo);
  const userRegisterInfo = useSelector((state) => state.userRegister.userInfo);
  const userInfo = userLoginInfo || userRegisterInfo;

  const [updatedName, setUpdatedName] = useState(user.name || "");
  const [updatedBio, setUpdatedBio] = useState(user.bio || "");

  const [profilePicture, setProfilePicture] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  const handleUpdateProfile = () => {
    const formData = new FormData();

    formData.append("name", updatedName);
    formData.append("bio", updatedBio);

    if (profilePicture) {
      formData.append("image", profilePicture);
    }
    if (coverPhoto) {
      formData.append("cover_photo", coverPhoto);
    }

    dispatch(updateUserProfile(formData));
    handleCloseEditProfile();
  };

  const handleNameChange = (e) => {
    setUpdatedName(e.target.value);
  };

  const handleBioChange = (e) => {
    setUpdatedBio(e.target.value);
  };

  const handleProfilePictureChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setProfilePicture(selectedFile);
      setFileName(selectedFile.name);
    } else {
      setProfilePicture(null);
      setFileName("");
    }
  };

  const handleCoverPhotoChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setCoverPhoto(selectedFile);
      setFileName(selectedFile.name);
    } else {
      setCoverPhoto(null);
      setFileName("");
    }
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleCloseEditProfile = () => {
    setIsEditing(false);
    setProfilePicture(null);
    setCoverPhoto(null);
    setFileName("");
  };

  const handleAdminPage = () => {
    navigate("/admin");
  };

  const backgroundImage = user.cover_photo || "";
  const profileIcon = `${user.image}?${new Date().getTime()}`;

  const [activeTab, setActiveTab] = useState("ABOUT");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div>
          <MDBContainer className="upc">
            <MDBRow className="justify-content-center align-items-center">
              <MDBCol>
                <MDBCard>
                  <div
                    className="background"
                    style={{
                      backgroundImage: `url(${backgroundImage})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      width: "100%",
                      height: "300px",
                    }}
                  >
                    <Image
                      src={profileIcon}
                      alt="User Profile"
                      className="profile-icon mt-5 mb-2 p-3"
                      roundedCircle
                      style={{
                        width: "250px",
                        height: "250px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </MDBCard>
              </MDBCol>
            </MDBRow>

            <div className="username d-flex align-items-center ms-5 mt-4">
              <MDBTypography tag="h5" className="me-2">
                <h1>{user.name}</h1>
              </MDBTypography>

              <Button
                className="edit-profile ms-auto"
                onClick={handleEditProfile}
                style={{
                  backgroundColor: "transparent",
                  color: "#002960",
                  textTransform: "uppercase",
                  borderColor: "#002960",
                  fontSize: "20px",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "white";
                  e.target.style.backgroundColor = "#002960";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#002960";
                  e.target.style.backgroundColor = "transparent";
                }}
              >
                Edit Profile
              </Button>
            </div>
          </MDBContainer>

          {isEditing && (
            <Modal show={isEditing} onHide={handleCloseEditProfile}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Profile</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter new name"
                      value={updatedName}
                      onChange={handleNameChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBio" className="mt-3">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter new bio"
                      value={updatedBio}
                      onChange={handleBioChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formProfilePicture" className="mt-3">
                    <Form.Label>Profile Picture</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={handleProfilePictureChange}
                    />
                    {profilePicture && (
                      <img
                        src={URL.createObjectURL(profilePicture)}
                        alt="Profile"
                        style={{
                          marginTop: "10px",
                          maxWidth: "100%",
                          width: "150px",
                          height: "150px",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </Form.Group>
                  <Form.Group controlId="formCoverPhoto" className="mt-3">
                    <Form.Label>Cover Photo</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={handleCoverPhotoChange}
                    />
                    {coverPhoto && (
                      <img
                        src={URL.createObjectURL(coverPhoto)}
                        alt="Cover"
                        style={{ marginTop: "10px", maxWidth: "100%" }}
                      />
                    )}
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseEditProfile}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleUpdateProfile}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          )}

          <div className="tabs-container mt-3">
            {userInfo.token && userInfo.token.is_admin ? (
              <>
                <button
                  style={{
                    padding: "10px 15px",
                    border: "1px solid #002960",
                    backgroundColor:
                      activeTab === "ABOUT" ? "#002960" : "white",
                    color: activeTab === "ABOUT" ? "white" : "#002960",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                  }}
                  onClick={() => handleTabClick("ABOUT")}
                >
                  ABOUT
                </button>

                <button
                  style={{
                    padding: "10px 15px",
                    border: "1px solid #002960",
                    backgroundColor:
                      activeTab === "STATISTICS" ? "#002960" : "white",
                    color: activeTab === "STATISTICS" ? "white" : "#002960",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                  }}
                  onClick={() => handleTabClick("STATISTICS")}
                >
                  STATISTICS
                </button>
              </>
            ) : (
              <>
                <button
                  style={{
                    padding: "10px 15px",
                    border: "1px solid #002960",
                    backgroundColor:
                      activeTab === "ABOUT" ? "#002960" : "white",
                    color: activeTab === "ABOUT" ? "white" : "#002960",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                  }}
                  onClick={() => handleTabClick("ABOUT")}
                >
                  ABOUT
                </button>

                <button
                  style={{
                    padding: "10px 15px",
                    border: "1px solid #002960",
                    backgroundColor:
                      activeTab === "CONVERSATIONS" ? "#002960" : "white",
                    color: activeTab === "CONVERSATIONS" ? "white" : "#002960",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                  }}
                  onClick={() => handleTabClick("CONVERSATIONS")}
                >
                  CONVERSATIONS
                </button>

                <button
                  style={{
                    padding: "10px 15px",
                    border: "1px solid #002960",
                    backgroundColor:
                      activeTab === "SUBSCRIPTIONS" ? "#002960" : "white",
                    color: activeTab === "SUBSCRIPTIONS" ? "white" : "#002960",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                  }}
                  onClick={() => handleTabClick("SUBSCRIPTIONS")}
                >
                  SUBSCRIPTIONS
                </button>
              </>
            )}
          </div>

          <div className="tab-content mt-3">
            {activeTab === "ABOUT" && (
              <div className="about-container">
                <MDBRow>
                  <MDBCol size="6">
                    <div className="bio-section bg-white p-2">
                      <p>
                        <strong>BIO:</strong> {user.bio}
                      </p>
                      <p>
                        <strong>DATE JOINED:</strong> WHEN THE USER JOINED
                      </p>
                      <p>
                        <strong>SUBSCRIPTION DURATION:</strong> SUB DURATION
                      </p>
                    </div>
                  </MDBCol>
                  <MDBCol size="6">
                    {userInfo.token && userInfo.token.is_admin ? (
                      <div className="favorite-books-section bg-white p-2">
                        <AdminScreen />
                      </div>
                    ) : (
                      <div className="favorite-books-section bg-white p-2">
                        <h4>LATEST READ</h4>
                        <p>book1</p>
                      </div>
                    )}
                  </MDBCol>

                  <MDBCol size="12" className="mt-3">
                    {userInfo.token && userInfo.token.is_admin ? (
                      <div className="mt-3">
                        <div className="favorite-books-section bg-white p-2">
                        <LatestScreen />
                        </div>
                      </div>
                    ) : (
                      <div className="mt-3">
                        <div className="favorite-books-section bg-white p-2">
                          <h4>FAVORITE BOOKS</h4>
                          <p>book1</p>
                          <p>book2</p>
                          <p>book3</p>
                          <p>book4</p>
                          <p>book5</p>
                        </div>
                      </div>
                    )}
                  </MDBCol>
                </MDBRow>
              </div>
            )}

            {activeTab === "CONVERSATIONS" && (
              <div className="conversation-container">
                <ConversationScreen />
              </div>
            )}

            {activeTab === "SUBSCRIPTIONS" && (
              <div className="subscription-container">
                <PaymentScreen />
              </div>
            )}

            {activeTab === "STATISTICS" &&
              userInfo.token &&
              userInfo.token.is_admin && (
                <div className="statistics-container">
                  <StatisticScreen />
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileScreen;

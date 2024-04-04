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
  MDBCardText,
  MDBCardImage,
  MDBTypography,
  MDBInput,
} from "mdb-react-ui-kit";

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

  const dateJoined = new Date(user.user_created_at);

  const calculateRemainingDays = () => {
    if (userInfo.token && userInfo.token.paid_at) {
      const paidDate = new Date(userInfo.token.paid_at);
      // Add 3 months to the paid date
      const threeMonthsLater = new Date(paidDate);
      threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);
      // Calculate difference in milliseconds
      const differenceMs = threeMonthsLater - Date.now();
      // Convert milliseconds to days
      const remainingDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
      return remainingDays;
    }
    return null; // Return null if paid_at date is not available
  };
  
  const remainingDays = calculateRemainingDays();

// Define options for date formatting
const options = {
  year: 'numeric',
  month: 'long', // Full month name (e.g., "February")
  day: 'numeric',
};

// Format the date
const formattedDateJoined = dateJoined.toLocaleDateString('en-US', options);

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  const handleUpdateProfile = () => {
    const formData = new FormData();

    formData.append("name", updatedName);

    const bioValue = updatedBio.trim() !== "" ? updatedBio : user.bio;
    formData.append("bio", bioValue);

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

  // Conversation and subscription logic

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

              {userInfo.token && userInfo.token.is_admin && (
                <Button
                  onClick={handleAdminPage}
                  style={{
                    backgroundColor: "transparent",
                    color: "#BC1823",
                    marginLeft: "10px",
                    textTransform: "uppercase",
                    borderColor: "#BC1823",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "white";
                    e.target.style.backgroundColor = "#BC1823";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "#BC1823";
                    e.target.style.backgroundColor = "transparent";
                  }}
                >
                  Admin Page
                </Button>
              )}
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
                  <Form.Group controlId="formBio">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter new bio"
                      value={updatedBio}
                      onChange={handleBioChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formProfilePicture">
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
                  <Form.Group controlId="formCoverPhoto">
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
            <button
              style={{
                padding: "10px 15px",
                border: "1px solid #002960",
                backgroundColor: activeTab === "ABOUT" ? "#002960" : "white",
                color: activeTab === "ABOUT" ? "white" : "#002960",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onClick={() => handleTabClick("ABOUT")}
            >
              ABOUT
            </button>

            {userInfo.token && userInfo.token.is_admin ? (
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
            ) : (
              <>
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
                        <strong>DATE JOINED:</strong> {formattedDateJoined}
                      </p>
                      <p>
                        <strong>SUBSCRIPTION DURATION:</strong> {" "}
                       {remainingDays !== null ? `${remainingDays} days remaining` : "N/A"}
                      </p>
                    </div>
                  </MDBCol>
                  <MDBCol size="6">
                    <div className="favorite-books-section bg-white p-2">
                      <h4>Favorite Books</h4>
                      <p>book1</p>
                      <p>book1</p>
                      <p>book1</p>
                    </div>
                  </MDBCol>
                </MDBRow>
              </div>
            )}

            {userInfo.token &&
              userInfo.token.is_admin &&
              activeTab === "STATISTICS" && (
                <div className="statistics-container">
                  <h3>Subscription Statistics</h3>
                  <div className="subscription-chart">
                    {/* Placeholder chart for subscription statistics */}
                    {/* You can use any chart library like Chart.js, react-chartjs-2, etc. */}
                    {/* Example: */}
                    <img
                      src="subscription_chart_placeholder.png"
                      alt="Subscription Chart"
                    />
                  </div>

                  <h3>Book Statistics</h3>
                  <div className="book-chart">
                    {/* Placeholder chart for book statistics */}
                    {/* Example: */}
                    <img src="book_chart_placeholder.png" alt="Book Chart" />
                  </div>
                </div>
              )}

            {activeTab === "CONVERSATIONS" && (
              <div className="conversation-container">
                <h3>Conversation Section</h3>
                DITO UNG MGA NIREPLY/CINOMMENT NG USER
              </div>
            )}

            {activeTab === "SUBSCRIPTIONS" && (
              <div className="subscription-container">
                <h3>Subscription Section</h3>
                ITO UNG PWEDE MAG SUBSCRIBE ULIT UNG USER
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileScreen;

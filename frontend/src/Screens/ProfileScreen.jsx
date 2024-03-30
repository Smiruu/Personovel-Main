import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile, getUserDetails } from '../actions/profileActions';
import Loader from '../Components/Loader'; // If you have a loader component
import { useNavigate } from 'react-router-dom';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLoginInfo = useSelector((state) => state.userLogin.userInfo);
  const userRegisterInfo = useSelector((state) => state.userRegister.userInfo);
  const userInfo = userLoginInfo || userRegisterInfo;

  // State to hold the updated user name and bio
  const [updatedName, setUpdatedName] = useState(user.name ||'');
  const [updatedBio, setUpdatedBio] = useState(user.bio || '');

  // State to hold the selected profile picture and cover photo
  const [profilePicture, setProfilePicture] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isEditing, setIsEditing] = useState(false); // State to control the edit popup/modal

  useEffect(() => {
    // Fetch user details when component mounts
    dispatch(getUserDetails());
  }, [dispatch]);

  const handleUpdateProfile = () => {
    // Create a FormData object
    const formData = new FormData();
  
    // Append the updated name and bio to the FormData
    formData.append('name', updatedName);
    formData.append('bio', updatedBio);
  
    // Append the profile picture if it exists
    if (profilePicture) {
      formData.append('image', profilePicture);
    }

    // Append the cover photo if it exists
    if (coverPhoto) {
      formData.append('cover_photo', coverPhoto);
    }
  
    // Dispatch action to update user profile
    dispatch(updateUserProfile(formData));

    // Close the edit profile popup/modal
    handleCloseEditProfile();
  };

  const handleNameChange = (e) => {
    // Update the updatedName state based on user input
    setUpdatedName(e.target.value);
  };

  const handleBioChange = (e) => {
    // Update the updatedBio state based on user input
    setUpdatedBio(e.target.value);
  };

  const handleProfilePictureChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setProfilePicture(selectedFile);
      setFileName(selectedFile.name);
    } else {
      setProfilePicture(null);
      setFileName('');
    }
  };

  const handleCoverPhotoChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setCoverPhoto(selectedFile);
      setFileName(selectedFile.name);
    } else {
      setCoverPhoto(null);
      setFileName('');
    }
  };

  const handleEditProfile = () => {
    // Open the edit profile popup/modal
    setIsEditing(true);
  };

  const handleCloseEditProfile = () => {
    // Close the edit profile popup/modal
    setIsEditing(false);
    // Reset the selected files
    setProfilePicture(null);
    setCoverPhoto(null);
    setFileName('');
  };

  const handleAdminPage = () => {
    // Navigate to the admin page
    navigate('/admin');
  };

  return (
    <div>
      <h2>User Profile</h2>
      {loading ? (
        <Loader /> // You can replace this with your loader component
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div>
          {/* Display cover photo if available */}
          {user.cover_photo && (
            <div style={coverPhotoContainerStyle}>
              <img src={user.cover_photo} alt="Cover Photo" style={coverPhotoStyle} />
            </div>
          )}
          
          {/* Profile Photo */}
          <div style={profilePhotoContainerStyle}>
            <img src={`${user.image}?${new Date().getTime()}`} alt="User Profile" style={profilePhotoStyle} />
          </div>
      
          {/* User details */}
          <p>Name: {user.name}</p>
          <p>Bio: {user.bio}</p>
      
          {/* Button to trigger the edit profile popup/modal */}
          <button onClick={handleEditProfile}>Edit Profile</button>

          {/* Button to navigate to the admin page if user is an admin */}
          {userInfo.token && userInfo.token.is_admin && (
            <button onClick={handleAdminPage}>Admin Page</button>
          )}
        </div>
      )}

      {/* Edit Profile Popup/Modal */}
      {isEditing && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <span style={closeButtonStyle} onClick={handleCloseEditProfile}>&times;</span>
            {/* Edit profile form */}
            <input
              type="text"
              placeholder="Enter new name"
              value={updatedName}
              onChange={handleNameChange}
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Enter new bio"
              value={updatedBio}
              onChange={handleBioChange}
              style={inputStyle}
            />
            <label htmlFor="profilePicture" style={labelStyle}>Profile Photo:</label>
            <input type="file" id="profilePicture" onChange={handleProfilePictureChange} style={inputStyle} />
            <label htmlFor="coverPhoto" style={labelStyle}>Cover Photo:</label>
            <input type="file" id="coverPhoto" onChange={handleCoverPhotoChange} style={inputStyle} />
            <button onClick={handleUpdateProfile} style={buttonStyle}>Update Profile</button>
          </div>
        </div>
      )}
    </div>
  );
};

const modalStyle = {
  display: 'flex',
  position: 'fixed',
  zIndex: 1,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  alignItems: 'center',
  justifyContent: 'center',
};

const modalContentStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
};

const closeButtonStyle = {
  color: '#aaa',
  position: 'absolute',
  top: '10px',
  right: '10px',
  fontSize: '24px',
  cursor: 'pointer',
};

const profilePhotoContainerStyle = {
  borderRadius: '50%',
  overflow: 'hidden',
  width: '150px', // Adjust size as needed
  height: '150px', // Adjust size as needed
  margin: '0 auto 20px', // Center horizontally and add some space at the bottom
};

const profilePhotoStyle = {
  width: '100%',
  height: 'auto',
};

const coverPhotoContainerStyle = {
  width: '100%',
  maxHeight: '300px', // Adjust height as needed
  overflow: 'hidden',
  marginBottom: '20px',
};

const coverPhotoStyle = {
  width: '100%',
  height: 'auto',
};

const inputStyle = {
  width: '100%',
  marginBottom: '10px',
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

const labelStyle = {
  fontWeight: 'bold',
  marginBottom: '5px',
};

const buttonStyle = {
  backgroundColor: '#1da1f2',
  color: '#fff',
  padding: '10px 20px',
  borderRadius: '4px',
  border: 'none',
  cursor: 'pointer',
};

export default ProfileScreen;

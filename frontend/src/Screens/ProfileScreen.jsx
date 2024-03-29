import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile, getUserDetails } from '../actions/profileActions';
import Loader from '../Components/Loader'; // If you have a loader component

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  // State to hold the updated user name and bio
  const [updatedName, setUpdatedName] = useState('');
  const [updatedBio, setUpdatedBio] = useState('');

  // State to hold the selected profile picture
  const [profilePicture, setProfilePicture] = useState(null);

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
  
    // Dispatch action to update user profile
    dispatch(updateUserProfile(formData));
  };

  const handleNameChange = (e) => {
    // Update the updatedName state based on user input
    setUpdatedName(e.target.value);
  };

  const handleBioChange = (e) => {
    // Update the updatedBio state based on user input
    setUpdatedBio(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
        setProfilePicture(selectedFile);
        setFileName(selectedFile.name);
    } else {
        setProfilePicture(null);
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
          {/* Add a unique query parameter to force image reload */}
          <img src={`${user.image}?${new Date().getTime()}`} alt="User Profile Image" />
          <p>Name: {user.name}</p>
          <p>Bio: {user.bio}</p>
          {/* Button to trigger the edit profile popup/modal */}
          <button onClick={handleEditProfile}>Edit Profile</button>
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
            />
            <input
              type="text"
              placeholder="Enter new bio"
              value={updatedBio}
              onChange={handleBioChange}
            />
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpdateProfile}>Update Profile</button>
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
  backgroundColor: '#fefefe',
  padding: '20px',
  borderRadius: '8px',
};

const closeButtonStyle = {
  color: '#aaa',
  float: 'right',
  fontSize: '28px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

export default ProfileScreen;

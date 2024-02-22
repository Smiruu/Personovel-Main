// ProfilePage.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Popup from '../Components/Popup';
import { fetchUserDetails, updateUserDetails } from '../actions/profileActions';

const ProfilePage = () => {
  const userInfo = useSelector((state) => state.userLogin.userInfo);
  const dispatch = useDispatch();

  const [showPopup, setShowPopup] = useState(false);
  const [newUsername, setNewUsername] = useState(userInfo.token.username);
  const [newBio, setNewBio] = useState(userInfo.bio || '');
  const [newProfilePhoto, setNewProfilePhoto] = useState(userInfo.profilePhoto || '');
  const [newCoverPhoto, setNewCoverPhoto] = useState(userInfo.coverPhoto || '');

  // Fetch user details on component mount
  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);

  const handleEditProfile = () => {
    setShowPopup(true);
  };

  const handleSaveChanges = () => {
    dispatch(
      updateUserDetails({
        username: newUsername,
        bio: newBio,
        profilePhoto: newProfilePhoto,
        coverPhoto: newCoverPhoto,
      })
    );
    
    // Save the updated user details to local storage
    const updatedUserInfo = {
      ...userInfo,
      token: {
        ...userInfo.token,
        username: newUsername,
      },
      bio: newBio,
      profilePhoto: newProfilePhoto,
      coverPhoto: newCoverPhoto,
    };

    localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));

    setShowPopup(false);
  };

  return (
    <div>
      {userInfo ? (
        <div>
          <p>Username: {newUsername}</p>
          <p>Bio: {newBio}</p>
          <p>Profile Photo: <img src={newProfilePhoto} alt="Profile" style={{ borderRadius: '50%' }} /></p>
          <p>Cover Photo: <img src={newCoverPhoto} alt="Cover" style={{ width: '100%' }} /></p>
          <button onClick={handleEditProfile}>Edit Profile</button>
          {showPopup && (
            <Popup
              onClose={() => setShowPopup(false)}
              onSave={handleSaveChanges}
              newUsername={newUsername}
              setNewUsername={setNewUsername}
              newBio={newBio}
              setNewBio={setNewBio}
              newProfilePhoto={newProfilePhoto}
              setNewProfilePhoto={setNewProfilePhoto}
              newCoverPhoto={newCoverPhoto}
              setNewCoverPhoto={setNewCoverPhoto}
            />
          )}
        </div>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
};

export default ProfilePage;

import React from 'react';

import Profile from '../Screens/Profile.css';


function Popup({
    onClose,
    onSave,
    newUsername,
    setNewUsername,
    newBio,
    setNewBio,
    newProfilePhoto,
    setNewProfilePhoto,
    newCoverPhoto,
    setNewCoverPhoto,
  }) {
    const handleSubmit = (event) => {
      event.preventDefault();
      onSave(); // Call the onSave function passed from the parent component
      onClose(); // Close the popup
    };
  
    const handleProfilePhotoChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setNewProfilePhoto(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
  
    const handleCoverPhotoChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setNewCoverPhoto(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
  
    return (
      <div className="popup">
        <div className="popup-content">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <form onSubmit={handleSubmit}>
            <label>
              New Username:
              <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
            </label>
            <label>
              New Bio:
              <textarea value={newBio} onChange={(e) => setNewBio(e.target.value)} />
            </label>
            <label>
              New Profile Photo:
              <input type="file" accept="image/*" onChange={handleProfilePhotoChange} />
              {newProfilePhoto && <img src={newProfilePhoto} alt="Profile" style={{ width: '100px', height: '100px' }} />}
            </label>
            <label>
              New Cover Photo:
              <input type="file" accept="image/*" onChange={handleCoverPhotoChange} />
              {newCoverPhoto && <img src={newCoverPhoto} alt="Cover" style={{ width: '100%', height: '200px' }} />}
            </label>
            <button type="submit">Save Changes</button>
          </form>
        </div>
      </div>
    );
  }
  
  export default Popup;
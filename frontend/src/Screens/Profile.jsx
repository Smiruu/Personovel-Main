import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadUserFromLocalStorage } from "../actions/userActions";

const ProfilePage = () => {
  const userInfo = useSelector((state) => state.userLogin.userInfo);


  return (
    <div>
      <h1>Welcome to Your Profile</h1>
      {userInfo ? (
        <div>
          <p>Hello, {userInfo.token.name}!</p>
          <p>Email: {userInfo.token.email}</p>
        </div>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
};

export default ProfilePage;

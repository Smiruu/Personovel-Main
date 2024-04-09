import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserProfileById } from '../actions/profileActions';
import { fetchFavorites } from '../actions/favoriteActions';
import Loader from '../Components/Loader';
import { Modal, Form, Button, Image } from 'react-bootstrap';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBTypography,  } from 'mdb-react-ui-kit';
import FavoritesList from '../Components/FavoritesList';
import LatestScreen from './LatestScreen';
import LatestReadScreen from './LatestReadScreen';

function VisitProfileScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userProfileById = useSelector((state) => state.userProfileById);
  const { loading, error, profile } = userProfileById;
  const profiles = profile.profile;
  const userLoginInfo = useSelector((state) => state.userLogin.userInfo);
  const userRegisterInfo = useSelector((state) => state.userRegister.userInfo);
  const userInfo = userLoginInfo || userRegisterInfo;

  useEffect(() => {
    dispatch(getUserProfileById(id));
    dispatch(fetchFavorites(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (userInfo && userInfo.token.id === id) {
      navigate('/profile');
    }
  }, [userInfo, id, navigate]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profiles) {
    return <div>No profile data found</div>;
  }

  const joinedDate = new Date(profiles.user_created_at);
  const formattedJoinedDate = `${joinedDate.toLocaleString('default', { month: 'long' })} ${joinedDate.getDate()}, ${joinedDate.getFullYear()}`;

  return (
    <MDBContainer className="upc">
      <MDBRow className="justify-content-center align-items-center">
        <MDBCol>
          <MDBCard>
            <div
              className="background"
              style={{
                backgroundImage: `url(${profiles.cover_photo || ''})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                height: '300px',
              }}
            />
            <Image
              src={profiles.image}
              alt="User Profile"
              className="profile-icon mt-5 mb-2 p-3"
              roundedCircle
              style={{
                width: '250px',
                height: '250px',
                objectFit: 'cover',
              }}
            />
          </MDBCard>
        </MDBCol>
      </MDBRow>

      <div className="username d-flex align-items-center ms-5 mt-4">
        <MDBTypography tag="h5" className="me-2">
          <h1>{profiles.name}</h1>
        </MDBTypography>
      </div>

      <div className="about-container">
        <MDBRow>
          <MDBCol size="6">
            <div className="bio-section bg-white p-2">
              <p>
                <strong>BIO:</strong> {profiles.bio}
              </p>
              <p>
                <strong>DATE JOINED:</strong> {formattedJoinedDate}
              </p>
            </div>
          </MDBCol>
          <MDBCol size="6">
            {profile.is_admin ? (
              <div className="mt-3">
                <div className="favorite-books-section bg-white p-2">
                  <LatestScreen />
                </div>
              </div>
            ) : (
              <div className="mt-3">
                <div className="favorite-books-section bg-white p-2">
                  <FavoritesList userId={id} />
                </div>
              </div>
            )}
          </MDBCol>
        </MDBRow>
        <MDBCol>
          <LatestReadScreen userId={id} />
        </MDBCol>
      </div>
    </MDBContainer>
  );
}

export default VisitProfileScreen;

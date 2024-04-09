import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserProfileById } from '../actions/profileActions';
import { fetchFavorites } from '../actions/favoriteActions'; // Import fetchFavorites action
import Loader from '../Components/Loader';
import { Modal, Form, Button, Image } from 'react-bootstrap';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBTypography } from 'mdb-react-ui-kit';
import FavoritesList from '../Components/FavoritesList'; // Import FavoritesList component

function VisitProfileScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const userProfileById = useSelector((state) => state.userProfileById);
  const { loading, error, profile } = userProfileById;

  useEffect(() => {
    dispatch(getUserProfileById(id));
    dispatch(fetchFavorites(id)); // Dispatch the fetchFavorites action with the userId
  }, [dispatch, id]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <MDBContainer className="upc">
          <MDBRow className="justify-content-center align-items-center">
            <MDBCol>
              <MDBCard>
                <div
                  className="background"
                  style={{
                    backgroundImage: `url(${profile.cover_photo})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '100%',
                    height: '300px',
                  }}
                >
                  <Image
                    src={profile.image}
                    alt="User Profile"
                    className="profile-icon mt-5 mb-2 p-3"
                    roundedCircle
                    style={{
                      width: '250px',
                      height: '250px',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              </MDBCard>
            </MDBCol>
          </MDBRow>

          <div className="username d-flex align-items-center ms-5 mt-4">
            <MDBTypography tag="h5" className="me-2">
              <h1>{profile.name}</h1>
            </MDBTypography>
          </div>

          <div className="about-container">
            <MDBRow>
              <MDBCol size="6">
                <div className="bio-section bg-white p-2">
                  <p>
                    <strong>BIO:</strong> {profile.bio}
                  </p>
                  <p>
                    <strong>DATE JOINED:</strong> {profile.user_created_at}
                  </p>
                  {/* Add remaining days logic if needed */}
                </div>
              </MDBCol>
              <MDBCol size="6">
                <div className="favorite-books-section bg-white p-2">
                  <FavoritesList userId={id} /> {/* Render FavoritesList component with userId */}
                </div>
              </MDBCol>
            </MDBRow>
          </div>
        </MDBContainer>
      )}
    </div>
  );
}

export default VisitProfileScreen;

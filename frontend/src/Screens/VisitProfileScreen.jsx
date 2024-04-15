import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getUserProfileById } from "../actions/profileActions";
import { fetchFavorites } from "../actions/favoriteActions";
import Loader from "../Components/Loader";
import { Image } from "react-bootstrap";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
} from "mdb-react-ui-kit";
import FavoritesList from "../Components/FavoritesList";
import LatestScreen from "./LatestScreen";
import LatestReadScreen from "./LatestReadScreen";
import { FaUser, FaCalendarAlt } from "react-icons/fa";

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
      navigate("/profile");
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
  const formattedJoinedDate = `${joinedDate.toLocaleString("default", {
    month: "long",
  })} ${joinedDate.getDate()}, ${joinedDate.getFullYear()}`;

  return (
    <MDBContainer className="upc">
      <MDBRow className="justify-content-center align-items-center">
        <MDBCol>
          <MDBCard>
            <div
              className="background"
              style={{
                backgroundImage: `url(${profiles.cover_photo || ""})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
                height: "300px",
              }}
            >
              <Image
                src={profiles.image}
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
        <div style={{ display: "flex", alignItems: "center" }}>
          <FaUser
            style={{ marginRight: "10px", fontSize: "24px", color: "#002960" }}
          />
          <h1 style={{ fontSize: "30px", color: "#002960" }}>
            {profiles.name}
          </h1>
        </div>
      </div>

      <div className="about-container mt-3">
        <MDBRow>
          <MDBCol size="12" sm="6">
            <div
              className="bio-section bg-white p-2 d-flex flex-column justify-content-center align-items-center"
              style={{
                height: "100%",
                fontFamily: "Arial, sans-serif",
              }}
            >
              {profiles.bio && (
                <p className="mb-3">
                  <strong>BIO:</strong> {profiles.bio}
                </p>
              )}
              <p className="text-center mb-3">
                <FaCalendarAlt
                  size={20}
                  className="me-1"
                  style={{ color: "#002960" }}
                />
                <strong>DATE JOINED:</strong> {formattedJoinedDate}
              </p>
            </div>
          </MDBCol>
          <MDBCol size="12" sm="6">
            <div
              className="favorite-books-section bg-white p-2"
              style={{ height: "100%" }}
            >
              <LatestReadScreen userId={id} />
            </div>
          </MDBCol>
        </MDBRow>

        <MDBCol size="12" className="mt-3">
          {profile.is_admin ? (
            <div
              className="mt-3"
              style={{
                height: "100%",
                maxHeight: "500px", 
                overflowX: "auto",
              }}
            >
              <div
                className="favorite-books-section bg-white p-2"
                style={{ height: "100%" }}
              >
                <LatestScreen />
              </div>
            </div>
          ) : (
            <div
              className="favorite-books-section bg-white p-2"
              style={{ height: "100%" }}
            >
              <FavoritesList userId={id} />
            </div>
          )}
        </MDBCol>
      </div>
    </MDBContainer>
  );
}

export default VisitProfileScreen;

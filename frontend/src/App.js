import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import HomeScreen from "./Screens/HomeScreen";
import PopularScreen from "./Screens/PopularScreen";
import LatestScreen from "./Screens/LatestScreen";
import AboutScreen from "./Screens/AboutScreen";
import ContactScreen from "./Screens/ContactScreen";
import LandingScreen from "./Screens/LandingScreen";
import SampleScreen from "./Screens/SampleScreen";
import BrowseScreen from "./Screens/BrowseScreen";
import ChapterDetailScreen from "./Screens/ChapterDetailScreen";
import BookScreen from "./Screens/BookScreen";
import SearchPage from "./Screens/SearchScreen";
import OTPScreen from "./Screens/OtpScreen";
import ConfirmChangePass from "./Screens/ConfirmChangePassScreen";
import RequestChangePass from "./Screens/ReqChangePassScreen";
import PaymentScreen from "./Screens/PaymentScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import AdminScreen from "./Screens/AdminScreen";
import VisitProfileScreen from "./Screens/VisitProfileScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegistrationScreen from "./Screens/RegistrationScreen";
import GenreScreen from "./Screens/GenreScreen";

function App() {
  return (
    <Router>
      <Header />
      <div className="color">
        <main className="py-3">
          <Container>
            <Routes>
              <Route path="/" element={<LandingScreen />} exact />
              <Route path="/home" element={<HomeScreen />} exact />
              <Route path="/popular" element={<PopularScreen />} />
              <Route path="/latest" element={<LatestScreen />} />
              <Route path="/about" element={<AboutScreen />} />
              <Route path="/contact" element={<ContactScreen />} />
              <Route path="/landing" element={<LandingScreen />} />
              <Route path="/sample" element={<SampleScreen />} />
              <Route path="/browse" element={<BrowseScreen />} />
              <Route path="/chapters/:id" element={<ChapterDetailScreen />} />
              <Route path="/books/:_id" element={<BookScreen />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/otp" element={<OTPScreen />} />
              <Route path="/genre" element={<GenreScreen />} />
              <Route path="api/user/reset/:uid/:token" element={<ConfirmChangePass />} />
              <Route path="/reset-password" element={<RequestChangePass />} />
              <Route path="/subscription" element={<PaymentScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/admin" element={<AdminScreen />} />
              <Route path="/profile/:id" element={<VisitProfileScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegistrationScreen />} />
            </Routes>
          </Container>
        </main>
      </div>
      <Footer />
    </Router>
  );
}

export default App;

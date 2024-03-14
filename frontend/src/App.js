import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Header from './Components/Header';
import Footer from './Components/Footer';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import PopularScreen from './Screens/PopularScreen';
import LatestScreen from './Screens/LatestScreen';
import AboutScreen from './Screens/AboutScreen';
import ContactScreen from './Screens/ContactScreen';
import LandingScreen from './Screens/LandingScreen';
import Start from './Components/Start';
import SampleScreen from './Screens/SampleScreen';
import BrowseScreen from './Screens/BrowseScreen';
import Profile from './Screens/Profile';
import Chapter from './Screens/ChapterDropdown';
import Login from './Screens/Login';
<<<<<<< HEAD
import BrowseScreenExp from './Screens/BrowseScreenExp';
import ChapterScreen from './Screens/ChapterScreen';



=======
>>>>>>> aa17ea6bc6be7971daa933d8f22f11724ad105f2
function App() {

  return (
    <Router>
      <Header />
      <div className='color'>
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<LandingScreen />} exact /> 
            <Route path='/home' element={<HomeScreen />} exact />
            <Route path='/start' element={<Start />} />
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/chapter' element={<Chapter />} />
            <Route path='/popular' element={<PopularScreen />} />
            <Route path='/latest' element={<LatestScreen />} />
            <Route path='/about' element={<AboutScreen />} />
            <Route path='/contact' element={<ContactScreen />} />
            <Route path='/landing' element={<LandingScreen />} />
            <Route path='/sample' element={<SampleScreen />} />
            <Route path='/Profile/:UserId' element={<Profile />} />
            <Route path='/browse' element={<BrowseScreen />} />
            <Route path='/login' element={<Login />} />
            <Route path='/browseExp' element={<BrowseScreenExp />} />
            <Route path='/chapterScreen' element={<ChapterScreen />} />
          </Routes>
        </Container>

      </main>
      </div>
      <Footer />
    </Router>



  );
}

export default App;

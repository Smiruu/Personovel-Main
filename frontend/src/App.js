import Footer from './Components/Footer';
import Header from './Components/Header';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PopularScreen from './Screens/PopularScreen';
import LatestScreen from './Screens/LatestScreen';
import AboutScreen from './Screens/AboutScreen';
import ContactScreen from './Screens/ContactScreen';
import TermsScreen from './Screens/TermsScreen';
import PolicyScreen from './Screens/PolicyScreen';
import LandingScreen from './Screens/LandingScreen';
import Start from './Components/Start';
import SampleScreen from './Screens/SampleScreen';
function App() {
  return (
    <Router>
      <Header />
      <div className='color'>
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} exact />
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/popular' element={<PopularScreen />} />
            <Route path='/latest' element={<LatestScreen />} />     
            <Route path='/about' element={<AboutScreen />} />     
            <Route path='/contact' element={<ContactScreen />} />        
            <Route path='/terms' element={<TermsScreen />} />     
            <Route path='/policy' element={<PolicyScreen />} />     
            <Route path='/latest' element={<LatestScreen />} />
            <Route path='/landing' element={<LandingScreen />} /> 
            <Route path='/sample' element={<SampleScreen />} />     
    

          </Routes>
        </Container>

      </main>
      </div>
      <Footer />
    </Router>



  );
}

export default App;

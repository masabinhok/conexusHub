import Hero from './pages/Hero';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hub from './pages/Hub';
import MarketR from './pages/MarketR';
import MarketE from './pages/MarketE';
import Market from './pages/Market';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductA from './pages/ProductA';

import Cart from './pages/Cart';
import ServiceE from './pages/ServiceE';
import ServiceR from './pages/ServiceR';
import Navbar from './components/Navbar';
import UserProfile from './pages/UserProfile';
import Sabin from './pages/Sabin';
import About from './pages/About';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className='flex w-full justify-center'>
        <Routes>
          <Route path='/' element={<Hero />} />
          <Route path='/hub' element={<Hub />} />
          <Route path='/register-marketplace' element={<MarketR />} />
          <Route path='/explore-marketplace' element={<MarketE />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/marketplace/:id' element={<Market />} />
          <Route path='/marketplace/:id/add-product' element={<ProductA />} />
          <Route path='/cart/:id' element={<Cart />} />
          <Route path='/explore-service' element={<ServiceE />} />
          <Route path='/register-service' element={<ServiceR />} />
          <Route path='/profile/:id' element={<UserProfile />} />
          <Route path='/sabinshrestha' element={<Sabin />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

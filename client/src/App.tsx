import Hero from './components/pages/Hero';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hub from './components/pages/Hub';
import MarketR from './components/pages/MarketR';
import MarketE from './components/pages/MarketE';
import Market from './components/pages/Market';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Profile from './components/pages/Profile';
import ProductA from './components/pages/ProductA';

import Cart from './components/pages/Cart';
import ServiceE from './components/pages/ServiceE';
import ServiceR from './components/pages/ServiceR';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Hero />} />
        <Route path='/hub' element={<Hub />} />
        <Route path='/register-marketplace' element={<MarketR />} />
        <Route path='/explore-marketplace' element={<MarketE />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/marketplace/:id' element={<Market />} />
        <Route path='/marketplace/:id/add-product' element={<ProductA />} />
        <Route path='/cart/:id' element={<Cart />} />
        <Route path='/explore-service' element={<ServiceE />} />
        <Route path='/register-service' element={<ServiceR />} />
      </Routes>
    </Router>
  );
};

export default App;

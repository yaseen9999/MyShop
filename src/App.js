import React from 'react'
import Navbar from './components/navbar';
import Signin from './components/signin'
import Signup from './components/signup';
import ProductList from './components/productlist';
import Home from './components/Home';
import Categories from './components/categories';


import Cart from './components/cart' 
import Image from './admin/components/image';

import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Detailpage from './components/detailpage';
import Admin from './admin/components/admin';




function App() {
  return (
    <Router>
      
        <Routes>
      
        <Route path="/" element={<Home />} />
        <Route path="/detailpage/:id" element={<Detailpage />} />
       
        
         
          <Route path="/signin" element={<Signin />} />
            
          <Route path="/signup" element={<Signup />} />
        
          <Route path="/categories" element={<Categories />} />
          <Route path="/admin" element={<Admin/>} />
         
        
        </Routes>
     
    </Router>
  );
}

export default App;

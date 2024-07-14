import React ,{useEffect, useContext} from 'react'
import ProducList from './productlist';
import Navbar from './navbar';
import Categories from './categories'
import axios from 'axios';
import '../styles/home.css';
import Cart from './cart'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
          // Navigate to the sign-in page if there's no token
          navigate('/signin');
          return;
        }
        console.log(token);
        axios.post(' http://localhost:3001/home', {},
        {
          headers: { authorization: `Bearer ${token}` }
        }
        
      )},[]);   
  return (
    <>
      <div >
             
                <Navbar/>
                <div>
                <Cart/>
              </div>
                <div className='content'>
                <Categories/>
                <ProducList/>
              
                </div>
            
            
            </div>
     
    
       
    </>
   
          
   
 
   
  
  )
}

export default Home

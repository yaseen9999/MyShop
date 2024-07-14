import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch,useSelector } from 'react-redux';
import '../styles/navbar.css';
import { showcart,hidecart } from '../redux/cartslice';

const Navbar = () => {
const dispatch=useDispatch();
const update=useSelector((state)=>state.cart.cartstatus)
useEffect(() => {
  console.log(update);
},[update]

)
const dispatching=()=>{
  if(!update)
  dispatch(showcart(true));
else
dispatch(hidecart(false));
}
  return (
    <nav className="navbar">
      <div className="container">
        
        <div className="navbar-search">
          <input type="text"  />
          <SearchIcon className="search-icon" />
        </div>
        <div className="navbar-links">
          <ul className="navbar-links-list">
            <li className="navbar-item">
              <Link to="/" className="navbar-link">Home</Link>
            </li>
            <li className="navbar-item">
              <Link to="/fetchproducts" className="navbar-link">Products</Link>
            </li>
            <li className="navbar-item">
              <Link to="/categories" className="navbar-link">About</Link>
            </li>
            <li className="navbar-item">
              <Link to="/contact" className="navbar-link">Contact</Link>
            </li>
          </ul>
          <Link  className="navbar-cart-icon">
            <ShoppingCartIcon onClick={()=>dispatching()}/>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

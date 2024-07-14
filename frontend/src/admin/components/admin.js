import React from 'react';
import Product from './product';
import Productdetail from './productdetails';
import './Admin.css'; // Import the CSS file
import { ProductProvider } from '../context/productcontext';
const Admin = () => {
  return (
    <>
    <ProductProvider>
    <div className="admin-container">
        <h1>Admin Dashboard</h1>
        <div className="grid-container">
          <div className="grid-item">
            <Product />
          </div>
          <div className="grid-item">
            <Productdetail />
          </div>
        </div>
      </div>
    </ProductProvider>
     
    </>
  );
};

export default Admin;

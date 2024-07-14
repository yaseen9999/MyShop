import React, { useState , useEffect, useContext } from 'react';
import '../adminstyles/adminproduct.css'; // Import CSS file for styling
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProductContext } from '../context/productcontext';
import axios from 'axios';
;
const Productdetail = () => {
  const initialState={
    id:'',

   colors:'',
   items:'',
  
   
    
  };
  
  const [products,setproducts]=useState(initialState);
  const [selectimage,setselectimage]=useState([]);
  const { productId } = useContext(ProductContext);
  useEffect(() => {
    // Log the updated productid whenever it changes
    
    console.log(productId)
    
    
  }, [productId]);
  const handlechange=(e)=>{
    const {name,value }=e.target;
    
    setproducts({
      ...products,
      [name]: value
    })
  };
    const imageChange = (e) => {
      setselectimage(Array.from([...e.target.files]));
     
     
    };

    
  const onSubmitHandler =async (event) =>{
    
    event.preventDefault(); 
    const formData = new FormData();
    formData.append('productid', productId);
   
    
    formData.append('colors', products.colors);
    formData.append('items', products.items);
    
  
    
 
    selectimage.forEach((image) => {
      formData.append('images', image);
    });
    
    
    // console.log(selectimage);
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
    });

   
    try {
  axios.post(' http://localhost:3001/admin/adddetail', formData,{
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  
  })
 
}catch (error) {
  console.error('Error uploading product:', error);
}
};



  return (
    <div className="container">
   
      <h2>Add Product Details</h2>
      {productId ? (
      <form className="product-form" onSubmit={onSubmitHandler} >
       
        <div className="form-group">
        <label htmlFor="category">SelectColors:</label>
          <select
            id="category"
            name="colors"
            className="form-control"
            value={products.colors}
            onChange={handlechange}
          >
            <option value="colors">Select color</option>
            <option value="red">red</option>
            <option value="green">green</option>
            <option value="blue">blue</option>
            <option value="white">white</option>
            <option value="multicolor">multiColor</option>
            <option value="brown">brown</option>
            <option value="black">black</option>
            <option value="pink">pink</option>
            <option value="purple">purple</option>
          </select>
        </div>
        
       
        <div className="form-group">
          <label htmlFor="price">Items:</label>
          <input  value={products.items} onChange={handlechange}  type="number" name="items" id="price" className="form-control" />
        </div>
        
       <div className="form-group">
       <input   type="file" name="images" multiple onChange={imageChange}/>
       <button type="submit" className="btn btn-primary">Submit</button>
       </div>
     
        
      </form>
        ) : (
          <p>Please select a product to add details.</p>
        )}
    </div>
  )
  };

export default Productdetail;

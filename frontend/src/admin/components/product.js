import React, { useState,useEffect,useContext } from 'react';
import '../adminstyles/adminproduct.css'; // Import CSS file for styling
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProductContext } from '../context/productcontext';

import axios from 'axios';
const Product = () => {
  
  const initialState={
    name:'',
    category:'',
    producttype:'',
    description:'',
    price:'',
    
  };
  
  const [products,setproducts]=useState(initialState);
  const [productid,setproductid]=useState('');
  const [selectimage,setselectimage]=useState(null);
  const { setProductid } = useContext(ProductContext);

  useEffect(() => {//watcher to console setting response to state it does not update immediately take some time 
    // Log the updated productid whenever it changes
    console.log(productid);
    setProductid(productid);
    
    
  }, [productid]);

  const handlechange=(e)=>{
    const {name,value }=e.target;
    
    setproducts({
      ...products,
      [name]: value
    })
  };
    const imageChange = (e) => {
     // setselectimage(Array.from([...e.target.files]));
     setselectimage(e.target.files[0]);
     
    };

    
  const onSubmitHandler =async (event) =>{
    
    event.preventDefault(); 
    const formData = new FormData();
    formData.append('name', products.name);
    formData.append('category', products.category);
    formData.append('type', products.producttype);
    formData.append('description', products.description);
    formData.append('price', products.price);
    formData.append('image', selectimage);
    console.log(selectimage);
 
    // selectimage.forEach((image) => {
    //   formData.append('images', image);
    // });
    
    
    // console.log(selectimage);
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
    });

   
    try {
  axios.post(' http://localhost:3001/admin', formData,{
    headers: {
      'Content-Type': 'multipart/form-data',
    }
 
  }
 
) .then((response) => {

  setproductid(response.data.product._id);


})

 
}catch (error) {
  console.error('Error uploading product:', error);
}
};



  return (
    <div className="container">
      <h2>Add Product</h2>
      <form className="product-form" onSubmit={onSubmitHandler} >
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input value={products.name} type="text" name="name" id="name" className="form-control"  onChange={handlechange}/>
        </div>
        <div className="form-group">
        <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            className="form-control"
            value={products.category}
            onChange={handlechange}
          >
            <option value="">Select a category</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="child">Child</option>
          </select>
        </div>
        <div className="form-group">
        <label htmlFor="category">ProductType:</label>
          <select
            id="category"
            name="producttype"
            className="form-control"
            value={products.producttype}
            onChange={handlechange}
          >
            <option value="">Select a category</option>
          
            <option value="sneakers">Sneakers</option>
            <option value="sleepers">Sleepers</option>
            <option value="sports">Sports</option>
            <option value="shoes">shoes</option>
          
          </select>
        </div>
        
        

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea value={products.description} onChange={handlechange} name="description" id="description" className="form-control" ></textarea>
        </div>
        
       
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input  value={products.price} onChange={handlechange}  type="number" name="price" id="price" className="form-control" />
        </div>
       
        <input   type="file" name="images"  onChange={imageChange}/>
        <button type="submit" className="btn btn-primary">Add</button>
        
      </form>
    </div>
  )
  };

export default Product;

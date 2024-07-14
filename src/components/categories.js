import React, { useContext, useEffect, useState } from 'react';
import '../styles/category.css'; // Import CSS file for category styling
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setfilterproducts } from '../redux/filterslice';

function Category() {
  // Define categories and initial selected category state
  const categories = ['men', 'women', 'child'];
  const producttype= ['sports', 'sneakers', 'sleepers','shoes'];
  const [category, setCategory] = useState('');
  const [productType, setProductType] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const dispatch = useDispatch();
 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/filterproducts`, {
          params: {
            category,
            productType,
            priceRange,
          },
        });
       // console.log(response.data)
        dispatch(setfilterproducts(response.data));
       
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [category, productType, priceRange]);
  //watchers for state update //
 
  // useEffect(() => {
  //   console.log(category);
  //   console.log(productType);
  //   console.log(priceRange);
  // },[category,productType,priceRange])
  // Function to handle category selection
  const handleCategoryClick = (category) => {
    setCategory(category);
  };

  const handleTypeClick = (item) => {
    setProductType(item);
  };

  const handlePriceRangeChange = (event) => {
    setPriceRange(event.target.value);
  };

 

  return (
 
      <div className="category-section">
 
   <h2 className='caveat'>Categories</h2>
      <ul className="category-list cinzel ">
        {categories.map((item, index) => (
          <li 
            key={index} 
            onClick={() => handleCategoryClick(item)}
           
          >
            {item}
          </li>
        ))}
      </ul>
  
      <div className="brand">
    <h2 className='caveat'>Product Type</h2>
    <ul className="category-list cinzel ">
        {producttype.map((item, index) => (
          <li 
            key={index} 
            onClick={() => handleTypeClick(item)}
           
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
      
      <div >
          <h2 className='caveat'>Filter BY price</h2>

       
   
        
      </div>
      <div>
        <label>
          <input type="radio" name="priceRange" value="low"  onChange={handlePriceRangeChange} />
            Under  1000Rs 
        </label>
      </div>
      <div>
        <label>
          <input type="radio" name="priceRange" value="medium"  onChange={handlePriceRangeChange} />
          Medium Price (2000 - 8000Rs)
        </label>
      </div>
      <div>
        <label>
          <input type="radio" name="priceRange" value="high"  onChange={handlePriceRangeChange} />
          High Price (10000 +)
        </label>
      </div>
      <div>
    </div>
   
    </div>
    
    
     

 
  
  );
}

export default Category;

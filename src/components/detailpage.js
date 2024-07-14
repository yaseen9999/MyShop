import axios from 'axios';
import React,{useState,useEffect,useContext} from 'react'
import { Link,useParams } from 'react-router-dom';
import '../detailstyles/detailpage.css'

const Detailpage = () => {
    const { id } = useParams(); // Get the 'id' parameter from the URL
    const [product, setProduct] = useState({});
    const [selectedImage, setSelectedImage] = useState('');
   
    const fetchProduct = async () => {
        try {
          console.log('id change component rerender ')
            const response = await axios.get(`http://localhost:3001/details/${id}`);
          
    
           console.log('details res',response);
           setProduct(response.data[0]);
        
            
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };
    useEffect(() => {
      
        fetchProduct();
    }, [id]);
    useEffect(() => {
      console.log('here details ',product);
     
      
  }, [product]);
    const handleImageClick = (imageUrl) => {
      setSelectedImage(imageUrl);
    };
  
  return (
    
    <div className='par'>
   
      {Object.keys(product).length > 0 && 
         <div className="product-images">
        
       <div className="image-up">
         <img src={product.images[1]} alt="Product" onClick={() => handleImageClick(product.images[1])} />
       </div>
       <div className="image-main">
         <img src={product.images[2]} alt="Product"  onClick={() => handleImageClick(product.images[2])}/>
       </div>
       <div className="image-down">
         <img src={product.images[3]} alt="Product"  onClick={() => handleImageClick(product.images[3])}/>
       </div>
       <div className="image-right">
         <img src={product.images[4]} alt="Product"  onClick={() => handleImageClick(product.images[4])}/>
       </div>
     </div>
     
     
}  
 {Object.keys(product).length > 0 && 
      <div>
       
          <div className='defaultimg'>
          <img src={selectedImage ? selectedImage :  product.images[0] }></img>
          </div>
        
    
         
          
         
       </div>
}
{Object.keys(product).length > 0 && 
      <div className='properties'>
        <div>
        <p className='bebas-neue-regular'>{product.productDetails[0].products.name}</p>
        </div>
        <div>
          <p className='caveat'>Discription:{product.productDetails[0].products.description}</p>
        
        </div>
        
         <div>
        <p className='cinzel'>Product type:{product.productDetails[0].products.type}</p>
        </div>
        
        <div>
        <p className='cinzel'>Category:{product.productDetails[0].products.category}</p>
        </div>
         
        <div>
        <p className='cinzel'>Inventory:{product.items+'items'}</p>
        </div>
        
        <div>
       <p className='cinzel'>Price: {product.productDetails[0].products.price}</p>
        </div>
       
       
        <div><button className='buyorderbtn'>Buy Now</button></div>
        </div>


        }
</div>
  )
}

export default Detailpage

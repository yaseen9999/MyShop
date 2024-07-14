import React, { useEffect } from 'react';
import '../detailstyles/cart.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
const Cart = () => {
  const show = useSelector((state) => state.cart.cartstatus);
  const userid = useSelector((state) => state.user.userid);
  const [cart, setcart] = React.useState('');
  const navigate = useNavigate(); 
  useEffect(() => {
    const fetchCart = async () => {
      if (show) {
        try {
          const res= await axios.get(`http://localhost:3001/items/${userid}`);
          const cart=res.data.flatMap((item)=>item.productDetails)
          console.log(cart)
         setcart(cart);
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      }
    };

    fetchCart();
  }, [show, userid]); // Dependencies
  useEffect(() => {
    console.log(cart)
  },[cart])
  const handleClick = (productId) => {
    navigate(`/detailpage/${productId}`);  // Navigate to product detail page
  };
  return (
    <>
      {show && cart &&(
        <div className="cartcontainer">
          
           <ul>
            {cart.map((item, index) => (
              <li key={item._id} onClick={() => handleClick(item._id)}>
                <div className="cart-item">
                  <div className="cartimage">
                    <img src={item.imageUrl}></img>
                    
                  </div>

                  <p className="item-name">  {item.name}</p>
                  <p className="item-price">${item.price}</p>
                 
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Cart;

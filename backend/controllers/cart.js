const Cart =require('../models/Cart');
const getcartproducts=async(req,res)=>{

try {
    console.log('cart api call ')
    const {uid,id}=req.params;
    console.log(uid,id);
        
    let cart= await Cart.findOne({'cart.userId':uid});//return one object only
    console.log(cart)

    if (!cart){
      console.log('no cart found ')
      await Cart.updateOne(
       {},
        {
          $push: {
            cart: {
              userId: uid,
              items: [{ product: id }]
            }
          }
        },
        { upsert: true }
      );   
       
      console.log('New user add in cart');
    }  
     else{
      
    if (Array.isArray(cart.cart) && cart.cart.length > 0) {
    //find user  base on id 
      const user= cart.cart.find(item => item.userId.toString() ===uid.toString());
      console.log(user)
      //find inside user  that product id already exists if exit do nothing 
      const item = user.items.find(item => item.product.toString() ===id.toString());
      console.log(item);
      if (!item){
        //if not push new item to items array in user
      user.items.push({product:id});
      await cart.save();
      console.log('Product added to existing cart');
      }
      }
     
      
    
      


     
        
        
       
        
     }
  
     
      } catch (err) {
        console.error(err);
       
      }
    };

module.exports={getcartproducts}

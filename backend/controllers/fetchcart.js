const Cart =require('../models/Cart');
const { createClient } = require('redis');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const getcartitems = async (req, res) => {
  console.log('call for cart items')
    try {
      
      const {id}=req.params;
      console.log(id);
     const uid=id;

        const client = createClient();
        await client.connect();
        
         console.log('Connected to Redis'); 
       
    client.on('error', (err) => {
      console.error('Redis error:', err);
      }); 
     //client.flushAll(); 
      const cachedProducts = await client.get( 'cartproducts3');
  
      if (cachedProducts) {
       
        console.log('Cache hit for cartproducts');
        // Return cached data
        res.status(201).json(JSON.parse(cachedProducts));
      }
     
      
 
      else{
        try {
        const pipeline = [
          {
             $match: {"cart.userId" :  new ObjectId(uid)} 
          },
        
          {
            $unwind: "$cart" // Unwind the cart array
          },
          {
            $unwind: "$cart.items" // Unwind the items array within the cart
          },
          
        
          { $lookup: { // Lookup product details from the products collection
            from: "products",
            // localField: "cart.items.product",
            // foreignField: "_id",
            let: { productId: "$cart.items.product" },
            pipeline: [
              { 
                $unwind: "$products"
              },
              { 
                $match: { 
                  $expr: { 
                   
                    $eq : ["$$productId", "$products._id"] 
                      // Add other conditions here if necessary

                  } 
                } ,
                
              }
            ],
            as: "productDetails"
          } },
       
          {
            $unwind:'$productDetails'
          },
          
          {
            $group: {  // Project only the relevant fields
              _id:0,
              productDetails: { $push: "$productDetails.products" }
            }
          }
          
      ]
         

        const result = await Cart.aggregate(pipeline).exec();
        
        if(!result){
          console.log('no result found ')
        console.log(result);
        }
        else {
          await client.set('cartproducts3', JSON.stringify(result), {
            EX: 3600, // Set cache expiry to 3600 seconds (1 hour)
          });
          res.status(201).send(result);
        }

          
        } catch (error) {
          console.error('Error fetching cart products:', error);
          res.status(500).json({ error: 'Internal server error' });  // Return a 500 status code for errors
        }
}
     
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }





    
    

  };
  
  module.exports = { getcartitems };
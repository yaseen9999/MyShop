const productdetails =require('../models/productdetails');
const mongoose = require ('mongoose')
const ObjectId = mongoose.Types.ObjectId;
const { createClient } = require('redis');
const fetchdetails = async (req, res) => {
    try {
      console.log('api call for details')
      const{id}=req.params;
      
      console.log(id)
      const client = createClient();
      await client.connect();
      
       console.log('Connected to Redis'); 
     
  client.on('error', (err) => {
    console.error('Redis error:', err);
    }); 
    const cacheKey = `productdetail:${id}`;
    console.log(cacheKey)

    const cachedProduct = await client.get(cacheKey);
    if (cachedProduct) {
      console.log('Cache hit for product detail');
      // Return the cached data
      res.status(200).json(JSON.parse(cachedProduct));
    }
   else {
      console.log('Cache miss for products');
      let pipeline=[
        {'$match':{'productid': new ObjectId(id)}},
        { $lookup: { // Lookup product details from the products collection
          from: "products",
          let: { productId: "$productid" },
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
              } 
            }]
              ,as: "productDetails"
          }},
       
          

      ];
      const detailsofproduct=await productdetails.aggregate(pipeline).exec();
      console.log(detailsofproduct);
      res.status(201).send(detailsofproduct);
      await client.set(cacheKey, JSON.stringify(detailsofproduct), {
        EX: 3600, // Set cache expiry to 3600 seconds (1 hour)
      });
     
  
      
      
    
      
     
    } }
    
    catch (error) {
      console.error('Error fetching products:', error);
     
    }
}
  module.exports = { fetchdetails};
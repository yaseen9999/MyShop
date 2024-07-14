const productmodel =require('../models/productmodel');
const { createClient } = require('redis');


const getAllProducts = async (req, res) => {
    try {
      
      const client = createClient();
      await client.connect();
      
       console.log('Connected to Redis'); 
     
  client.on('error', (err) => {
    console.error('Redis error:', err);
    }); 
  // client.flushAll(); 
    const cachedProducts = await client.get( 'products');

    if (cachedProducts) {
     
      console.log('Cache hit for products');
      // Return cached data
      res.status(201).json(JSON.parse(cachedProducts));
    } else {
      console.log('Cache miss for products');
      const products = await productmodel.find();
     

      console.log(products[0].products);
      await client.set('products', JSON.stringify(products[0].products), {
        EX: 3600, // Set cache expiry to 3600 seconds (1 hour)
      });
      res.status(200).json(products[0].products);
    
     
     
   } } catch (error) {
      console.error('Error fetching products:', error);
      // Send error response if something goes wrong
      res.status(500).json({ error: 'An error occurred while fetching products' });
    }
  };
  
  module.exports = { getAllProducts };
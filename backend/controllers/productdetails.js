const productdetails =require('../models/productdetails');
const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const fs =require ('fs');
cloudinary.config({ 
  cloud_name: "dx6hivix7",
  api_key: "215484824675151",
  api_secret: "MQAwRGjdHjbMnWBPgJM3gbTChDY"
}); 

const createProductdetails = async (req, res) => {
  try {
    console.log('req recieved')
    const { productid,colors ,items } = req.body;
    if (!productid|| !colors || !items) {
      return res.status(400).send('Missing required fields.');
    }
    console.log(productid,colors ,items);
    
    if (!req.files) {
      return res.status(400).send('No file uploaded.');
    }
   
    let imageUrls = []; 
    // Get local file path
     for (const files of req.files) {

      const localFilePath = files.path;
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto"
    });
    fs.unlinkSync(localFilePath);
    imageUrls.push(result.secure_url); 
    
   
    
}
console.log("Successful upload to Cloudinary");
console.log(imageUrls )

const productId = new ObjectId(req.body.productid);
    const newProduct = new productdetails({
      productid: productId,
   
      
    
      colors: req.body.colors,
      items: req.body.items,
      images: imageUrls // Store Cloudinary image URL
    });
    await newProduct.save();
    
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error.message);
   
  }
  
}
  module.exports ={createProductdetails};
const productmodel =require('../models/productmodel');
const cloudinary = require('cloudinary').v2;

const fs =require ('fs');
cloudinary.config({ 
  cloud_name: "dx6hivix7",
  api_key: "215484824675151",
  api_secret: "MQAwRGjdHjbMnWBPgJM3gbTChDY"
}); 

const createProducts = async (req, res) => {
  try {
    console.log('req recieved')
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    const { name, category,type,description, price,image } = req.body;
    let imageUrl ;

    // Get local file path
    // for (const file of req.files) {

      const localFilePath = req.file.path;
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto"
    });
    fs.unlinkSync(localFilePath);
    imageUrl=result.secure_url;
    // Delete the temporary file
   

    // Handle Cloudinary response
    console.log("Successful upload to Cloudinary");
    console.log(imageUrl )
    const newProduct = {
      name,
      category,
      type,
      description,
      price,
      imageUrl
    };
    const ret=await productmodel.updateOne(
      {}, // Find the first document (you can add more specific query criteria if needed)
      { $push: { products: newProduct } }, // Push the new product into the array
      { new: true, upsert: true } // Return the updated document, and create the document if it doesn’t exist
    );
    //new: true: This option doesn’t actually apply to updateOne. It’s used in findOneAndUpdate to return the updated document.
    //upsert: true: This option creates a new document if no matching document is found.
    //console.log(ret);
    const updatedDocument = await productmodel.findOne(
      {}, // Find the first document
      { products: { $slice: -1 } } // Retrieve only the last product from the products array
    );
  //   The $slice operator in MongoDB is used in projections to limit the number of array elements returned.
  //   -1 gets the last element.
  // 1 would get the first element.
    console.log(updatedDocument);
    const addedProduct = updatedDocument.products[0];
   
    res.status(201).json({
      message: 'Product added successfully',
      product:addedProduct
    });
  

  //////////////////INEFFICIENT METHOD ////////////////////
    // let productsDoc = await productmodel.findOne();
    // console.log(productsDoc);
    // if (!productsDoc) {
    //   productsDoc = new productmodel({ products: [] });
    // }

    // // Add the new product to the products array
   
    // // Save the document
    // await productsDoc.save();
  
   // productsDoc.products.push(newProduct);
    // const addedProduct = productsDoc.products[productsDoc.products.length - 1];
    // res.status(201).json({
    //   message: 'Product added successfully',
    //   product: {
    //     _id: addedProduct._id,
    //     name: addedProduct.name,
    //     description: addedProduct.description,
    //     price: addedProduct.price,
    //     imageUrl: addedProduct.imageUrl
    //   }
    // });
  ////////////////////////////////////////////////////////////////////
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error.message);
   
  }
  
}
  module.exports ={createProducts};
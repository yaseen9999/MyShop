const productmodel =require('../models/productmodel');
 const getfilterproducts=async(req,res)=>{
  const { category, productType, priceRange } = req.query;
  console.log(category, productType, priceRange)
  console.log('call for filter')
  const pipeline = [
    { $unwind: '$products' },
   
   
  ];
  if (category) {
    pipeline.push({ $match: { 'products.category': category } });
  }
  if (productType) {
    pipeline.push({ $match: { 'products.type': productType } });
  }
  if (priceRange) {
    if (priceRange === 'low') {
      pipeline.push({ $match: { 'products.price': { $lt: 1000 } } });
    } else if (priceRange === 'medium') {
      pipeline.push({ $match: { 'products.price': { $gte: 2000, $lt: 8000 } } });
    } else if (priceRange === 'high') {
      pipeline.push({ $match: { 'products.price': { $gt: 10000 } } });
    }
  }
  pipeline.push({
    $group: {
      _id: null,
      products: { $push: '$products' }
    }
  });
  //field i want in output
//The $push operator is like a collection tool. It gathers and collects items into an array.
//'$products': This refers to the products field from the documents being processed. 
  try {
    const products = await productmodel.aggregate(pipeline).exec();
    console.log(products)
   
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
 }
 }
module.exports={getfilterproducts}

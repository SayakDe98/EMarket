const validateObjectId = require('../middleware/validateObjectId')
const {Product, validate} = require('../models/product');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const createProduct = require('../controller/createProduct')
router.get('/', async (req, res) => {
const products = await Product.find().sort('name');
    res.send(products);
});

router.post('/' ,auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
 
// const {name , price , color , numberInStock , category, imageUrl} = req.body
  
    let product = new Product({
    name: req.body.name,
    price: req.body.price,
    color: req.body.color,
    numberInStock: req.body.numberInStock,
    type:req.body.type,
    category:req.body.category,
    imageUrl:req.body.imageUrl
  });

  product= await product.save();
  res.send(product);

  // try{
  //   const {productId} = await createProduct(name , price , color , numberInStock , category, imageUrl)
  //   res.json({
  //     productId,name,price,category,color,numberInStock,imageUrl
  //   })
  // }catch(err)
  //   {
  //     res.status(400).json({message:err.message})
  //   }
  
  //product = await product.save();
  
  //res.send(product);
});

router.put('/:id' , auth,validateObjectId ,async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const product = await Product.findByIdAndUpdate(req.params.id, { 
    name: req.body.name,
    price:req.body.price,
    color: req.body.color,
    numberInStock: req.body.numberInStock,
    category:req.body.category,
    imageUrl: req.body.imageUrl
  }, {
    new: true
  });

  if (!product) return res.status(404).send('The product with the given ID was not found.');
  
  res.send(product);
});

router.delete('/:id'  ,auth, validateObjectId ,async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);

  if (!product) return res.status(404).send('The product with the given ID was not found.');

  res.send(product);
});

router.get('/:id', validateObjectId, async (req, res) => {

  const product = await Product.findById(req.params.id);

  if (!product) return res.status(404).send('The product with the given ID was not found.');

  res.send(product);
});

module.exports = router;
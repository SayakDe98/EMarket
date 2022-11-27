const validateObjectId = require('../middleware/validateObjectId')
const auth = require('../middleware/auth')
const {CartItem, validate} = require('../models/cartItem');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const {Cart} = require('../models/cart');
const jwt = require('jsonwebtoken');
// const { config } = require('winston');
const config = require('config')

router.get('/', auth,async (req, res) => {
  const cartsItems = await CartItem.find().populate('productId','price name productId imageUrl');

  res.send(cartsItems);
});
router.get('/:cartId', auth,async (req, res) => {
  const cartsItems = await CartItem.find({cartId:req.params.cartId}).populate('productId','price name productId imageUrl quantity cartId');

  res.send(cartsItems);
});

// router.get('/:userId', auth,async (req, res) => {
//   const cartsItems = await CartItem.find().populate('productId','price name productId imageUrl');

//   res.send(cartsItems);
// });

router.post('/',auth,async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  let cartsItems = new CartItem({
    cartId: req.body.cartId,
    productId: req.body.productId,
    quantity:req.body.quantity,
    userId:req.body.userId
  });
  cartsItems = await cartsItems.save();
  
  // const productData = await CartItem.find({productId: mongoose.Types.ObjectId(req.body.productId)}).populate('productId').select('name price');
  const productData = await CartItem.find({productId: mongoose.Types.ObjectId(req.body.productId)}).populate('productId','price name -_id imageUrl');
  console.log("productId ",req.body.productId)
  // const productData = await CartItem.find({productId:req.body.productId})
  console.log(productData);
  
 
  res.send( {cartsItems,productData:{...productData}});

});

router.put('/:id' ,auth, validateObjectId ,async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let cartsItems = await CartItem.findByIdAndUpdate(req.params.id, { 
      cartId: req.body.cartId,
      productId: req.body.productId,
      quantity:req.body.quantity,
      userId:req.body.userId
  }, {
    new: true
  });

  if (!cartsItems) return res.status(404).send('The cart item with the given ID was not found.');
  cartsItems = await cartsItems.save();
  
  const productData = await CartItem.find({productId: mongoose.Types.ObjectId(req.body.productId)}).populate('productId').select('name price imageUrl');

  // console.log(req.body.productId)
  // console.log(productData);
  // res.send(cartsItems);
  res.send( {cartsItems,productData:{...productData}});

});


router.delete('/:id'  , auth,validateObjectId ,async (req, res) => {
  const cartsItems = await CartItem.findByIdAndRemove(req.params.id);

  if (!cartsItems) return res.status(404).send('The cart item with the given ID was not found.');

  res.send(cartsItems);
});

router.get('/:id', auth,validateObjectId, async (req, res) => {

  const cartsItems = await CartItem.findById(req.params.id);

  if (!cartsItems) return res.status(404).send('The cart item with the given ID was not found.');

  const productData = await CartItem.find({productId: mongoose.Types.ObjectId(cartsItems.productId)}).populate('productId','name price imageUrl');

  // res.send([ {...cartsItems,productData:{...productData}}]);
  res.send(productData);
  // res.send( [cartsItems,productData]);

  // res.send(cartsItems);
});

module.exports = router;
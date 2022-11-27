const validateObjectId = require('../middleware/validateObjectId')
const {Cart, validate} = require('../models/cart');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')

router.get('/', auth,async (req, res) => {
const carts = await Cart.find().sort('userId');
    res.send(carts);
});

router.post('/', auth,async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let cart = new Cart({
    userId: req.body.userId , 
  });

  cart = await cart.save();
  
  res.send(cart);
});

router.put('/:id' , auth,validateObjectId ,async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const cart = await Cart.findByIdAndUpdate(req.params.id, { 
    userId: req.body.userId 
  }, {
    new: true
  });

  if (!cart) return res.status(404).send('The cart with the given ID was not found.');
  
  res.send(cart);
});

router.delete('/:id'  , auth,validateObjectId ,async (req, res) => {
  const cart = await Cart.findByIdAndRemove(req.params.id);

  if (!cart) return res.status(404).send('The cart with the given ID was not found.');
  res.send(cart);
});

router.get('/:id', auth,validateObjectId, async (req, res) => {

  const cart = await Cart.findById(req.params.id);

  if (!product) return res.status(404).send('The cart with the given ID was not found.');

  res.send(cart);
});

module.exports = router;
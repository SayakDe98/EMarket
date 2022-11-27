const validateObjectId = require('../middleware/validateObjectId')
const {Order, validate} = require('../models/order');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')

router.get('/',auth, async (req, res) => {
const orders = await Order.find().sort('userId');
    res.send(orders);
});

router.get('/user/:userId',auth,async(req,res)=>{
  const orders = await Order.find({userId:req.params.userId}).populate('productId userAddressId').select('name totalAmount orderDate imageUrl city addressLine1 addressLine2 state pincode')
  res.send(orders);
})

router.post('/', auth,async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let order = new Order({
    orderItemId: req.body.orderItemId,
    orderDate: req.body.orderDate,
    totalAmount: req.body.totalAmount,
    userAddressId: req.body.userAddressId,
    bought:req.body.bought,
    userId:req.body.userId,
    productId:req.body.productId
  });

  order = await order.save();
  
  res.send(order);
});

router.put('/:id' , auth,validateObjectId ,async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const order = await Order.findByIdAndUpdate(req.params.id, { 
    orderItemId: req.body.orderItemsId,
    orderDate: req.body.orderDate,
    totalAmount: req.body.totalAmount,
    userAddressId: req.body.userAddressId,
    bought:req.body.bought,
    userId:req.body.userId,
    productId:req.body.productId
  }, {
    new: true
  });

  if (!order) return res.status(404).send('The order with the given ID was not found.');
  
  res.send(order);
});

router.delete('/:id'  , auth,validateObjectId ,async (req, res) => {
  const order = await Order.findByIdAndRemove(req.params.id);

  if (!order) return res.status(404).send('The order with the given ID was not found.');

  res.send(order);
});

router.get('/:id', auth,validateObjectId, async (req, res) => {

  const order = await Order.findById(req.params.id);

  if (!order) return res.status(404).send('The order with the given ID was not found.');

  res.send(order);
});

module.exports = router;
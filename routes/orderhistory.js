const {Order, validate} = require('../models/order');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const order = await Order.find();

  if (!order) return res.status(404).send('The order with the given ID was not found.');

  if(order.bought == true)
  {
    res.status(200).send(order);
  }
  
});

module.exports = router;
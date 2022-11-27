const validateObjectId = require('../middleware/validateObjectId')
const auth = require('../middleware/auth')
const {OrderItem, validate} = require('../models/orderItem');
const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();

router.get('/',async (req, res) => {
const ordersItems = await OrderItem.find().populate('productId').select('_id name price quantity imageUrl orderedTogetherId');
    res.send(ordersItems);
});
router.get('/:userId',async (req, res) => {
const ordersItems = await OrderItem.find({userId:req.params.userId}).populate('productId').select('_id name price quantity imageUrl orderedTogetherId');

res.send(JSON.stringify(ordersItems));
});

router.get('/get/:orderedTogetherId',async(req,res)=>{
// router.get('/get/orderTogether',async(req,res)=>{
  console.log(req.params)
  const orderItems = await OrderItem.find({ orderedTogetherId:  mongoose.Types.ObjectId(req.params.orderedTogetherId)}).populate('productId').select('_id name price quantity imageUrl orderedTogetherId')
  // const orderItems = await OrderItem.find().sort('orderedTogetherId').populate('productId').select('_id name price quantity imageUrl orderedTogetherId')
  res.send(orderItems)
})

router.post('/', auth,async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let ordersItems = new OrderItem({
      productId: req.body.productId,
      quantity: req.body.quantity
  });

  ordersItems = await ordersItems.save();
  
  res.send(ordersItems);
});

router.put('/:id' , auth,validateObjectId ,async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const ordersItems = await OrderItem.findByIdAndUpdate(req.params.id, { 
      productId: req.body.productId ,
      quantity:req.body.quantity
  }, {
    new: true
  },
  );

  if (!ordersItems) return res.status(404).send('The order item with the given ID was not found.');
  
  res.send(ordersItems);
});


router.delete('/:id'  , auth,validateObjectId ,async (req, res) => {
  const ordersItems = await OrderItem.findByIdAndRemove(req.params.id);

  if (!ordersItems) return res.status(404).send('The order item with the given ID was not found.');

  res.send(ordersItems);
});

router.get('/:id', auth,validateObjectId, async (req, res) => {

  const ordersItems = await OrderItem.findById(req.params.id);

  if (!ordersItems) return res.status(404).send('The order item with the given ID was not found.');

  res.send(ordersItems);
});

module.exports = router;
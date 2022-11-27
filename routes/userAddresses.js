const {UserAddress, validate} = require('../models/userAddress'); 
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')

router.get('/', auth,async (req, res) => {
  const userAddresses = await UserAddress.find().sort('userId');
  res.send(userAddresses);
});
router.get('/user/:userId', auth,async (req, res) => {
  const userAddresses = await UserAddress.find({userId:req.params.userId});
  res.send(userAddresses);
});

router.post('/', auth,async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let userAddress = new UserAddress({ 
    userId:req.body.userId,
    city: req.body.city,
    addressLine1: req.body.addressLine1,
    addressLine2: req.body.addressLine2,
    state: req.body.state,
    pincode: req.body.pincode
  });
  userAddress = await userAddress.save();
  
  res.send(userAddress);
});

router.put('/:id', auth,async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const userAddress = await UserAddress.findByIdAndUpdate(req.params.id,
    { 
        userId:req.body.userId,
        city: req.body.city,
        addressLine1: req.body.address_line_1,
        addressLine2: req.body.address_line_2,
        state: req.body.state,
        pincode: req.body.pincode
    }, { new: true });

  if (!userAddress) return res.status(404).send('The user address with the given ID was not found.');
  
  res.send(userAddress);
});

router.delete('/:id', auth,async (req, res) => {
  const userAddress = await UserAddress.findByIdAndRemove(req.params.id);

  if (!userAddress) return res.status(404).send('The user address with the given ID was not found.');

  res.send(userAddress);
});

router.get('/:id', auth,async (req, res) => {
  const userAddress = await UserAddress.findById(req.params.id);

  if (!userAddress) return res.status(404).send('The user address with the given ID was not found.');

  res.send(userAddress);
});

module.exports = router; 
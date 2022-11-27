const {User, validate} = require('../models/user'); 
const express = require('express');
const router = express.Router();
const _ = require('lodash')
const bcrypt = require('bcrypt')
const auth = require('../middleware/auth')

router.get('/', async (req, res) => {
  const users = await User.find().sort('name');
  res.send(users);
});

// router.post('/', async (req, res) => {
//   const { error } = validate(req.body); 
//   if (error) return res.status(400).send(error.details[0].message);
// let user = new User(
//   {
//     // name: req.body.name,
//      email: req.body.email,
//      password: req.body.password 
//   }
// )

//    user = await User.findOne({ email: req.body.email});
//   // if(user) res.status(400).send("User already registered.")
//   // if(user) res.status(200).send("Log In successful!");
//   if(user) { 
//     const pass_match = await bcrypt.compare(user.password ,req.body.password);
//     console.log(pass_match,user.password,req.body.password);

//     if(pass_match) {
//       res.status(200).send("Log In successful!");
//     console.log(pass_match,user.password,req.body.password);

//     }

//     else if(!pass_match){
//       res.status(401).send("Unauthorized User.");
//     console.log(pass_match,user.password,req.body.password);

//     }
//   }
//   else if(!user) {
//      res.status(404).send("User not found!");
//   }
//   // user = new User(_.pick(req.body , ['name','email','password']))
//   // user = new User(_.pick(req.body , ['email','password']))

//   // const salt = await bcrypt.genSalt(10)
  
//   // user.password = await bcrypt.hash(user.password , salt)

//   // user = await user.save()

//   // res.send(user)
// });

router.put('/:id',auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findByIdAndUpdate(req.params.id,
    { 
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }, { new: true });

  if (!user) return res.status(404).send('The user with the given ID was not found.');
  
  res.send(user);
});

router.delete('/:id', auth,async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);

  if (!user) return res.status(404).send('The user with the given ID was not found.');

  res.send(user);
});

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) return res.status(404).send('The user with the given ID was not found.');

  res.send(user);
});

module.exports = router; 
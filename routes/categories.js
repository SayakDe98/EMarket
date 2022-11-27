const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
// const { Product, validate } = require('../models/product');
const express = require('express');
const router = express.Router();
const { Category,validate } = require('../models/categories');
const { Product } = require('../models/product');

// router.get('/', async(req,res) => {
//     const categories = await Product.find().select('type');
//     res.send(categories);
// });

router.get('/',async(req,res)=>{
    const categories = await Category.find();
    res.send(categories);
})

router.get('/:category',async(req,res)=> {
  const products = await Product.find({category:req.params.category}).select('name category imageUrl price _id')
  res.send(products);
})
// router.get('/:type',async(req,res)=>{
//     const products = await Product.find({type:req.params.type});
//     res.send(products);
// })
//create a products page where products are sorted by type
router.post('/',auth,async(req,res)=>{
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let categoryExists = await Category.findOne({ category: req.body.category });
  if (categoryExists) {
    return res.status(400).send("Category already exists.");
  }
    let categories = new Category({
        category:req.body.category
    })

    categories = await categories.save();

    res.send(categories);
})

module.exports = router;
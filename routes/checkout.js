const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const {CartItem} = require('../models/cartItem')
const {OrderItem} = require('../models/orderItem');

router.post('/:id', async (req, res) => {//provide the cart item id in the params

     ////if(!req.body.cartId) return res.status(400).send('cart Id not provided.')//if we would have put cartId in the body instead of paramters(params i.e. as a part of endpoint)
     if(!req.params.id) return res.status(400).send('cart item Id not provided.')


    let cartItem = await CartItem.find({cartId:req.params.id});
    const productIds = cartItem.map(item => item.productId)//gets all the product id's from the object
    const qty = cartItem.map(item=>item.quantity);
    console.log("qty",qty)
    const userId = cartItem.map(item=>item.userId);
    //console.log(productIds.length);
//console.log(productIds)


cartItem = await CartItem.deleteMany({cartId:req.params.id})
if(!cartItem) return res.status(404).send("Cart Item not found.")    
let orderedTogetherId = new mongoose.Types.ObjectId();         
for(let i = 0 ; i < productIds.length ; i++)
{
  await OrderItem.insertMany({orderedTogetherId, productId : productIds[i].toString(),userId: userId[i].toString(),quantity: qty[i]})//is used to pass the product ids to the order item collections
}


        return res.status(200).send('Cart items were checked out and added to order')
  });
  
module.exports = router
const express = require('express');
const router = express.Router();
const {OrderItem} = require('../models/orderItem');
const {Order} = require('../models/order');
const {Product} = require('../models/product');
const { UserAddress } = require('../models/userAddress');

router.post('/', async (req, res) => {//provide the order item id in the params

     
    //  if(!req.body.orderItemId) return res.status(400).send('order item Id not provided.')
     if(!req.body.userAddressId) return res.status(400).send('Please create an address to proceed.')
    //  if(!req.body.quantity) return res.status(400).send('Quantity of the item not provided')
    //  if(!req.body.price) return res.status(400).send('Price of the item not provided')
     if(!req.body.userId) return res.status(400).send('User Id not provided');
    //  if(!req.body.productId) return res.status(400).send('Product Id not provided')
//totalamount,order date
    // let orderItem = await OrderItem.findOne({_id:req.body.orderItemId});
    let userAddress = await UserAddress.findOne({_id:req.body.userAddressId});
    // let product = await Product.findOne({_id:req.body.productId});
    let orderedTogether = await OrderItem.find({orderedTogetherId:req.body.orderedTogetherId}).populate('productId').select('_id productId quantity userId orderedTogetherId price name')
    // if(!orderItem) {
    //     return res.status(400).send("Provided order item id is invalid")
    // }
    if(!userAddress) {
        return res.status(400).send("Provided user address id is invalid")
    }
    // if(!product) {
    //     return res.status(400).send("Provided product id is invalid")
    // }
    if(!orderedTogether){
        return res.status(400).send("Provided orderedTogetherId is invalid")
    }
    console.log("Items in orderedTogether:",orderedTogether)

    for(let i = 0; i < orderedTogether.length; i++){
        await Order.insertMany({totalAmount: orderedTogether[i].productId.price * orderedTogether[i].quantity ,orderItemId: orderedTogether[i]._id,userAddressId:req.body.userAddressId,orderDate: new Date(), bought:true, userId: req.body.userId, productId: orderedTogether[i].productId._id})
        await OrderItem.findByIdAndRemove(orderedTogether[i]._id)
    }

    // let order =  new Order({
    //         userAddressId: req.body.userAddressId,
    //         totalAmount: req.body.price*req.body.quantity,
    //         orderItemId: req.body.orderItemId,
    //         orderDate: new Date(),
    //         userId: req.body.userId,
    //         bought:true,
    //         productId:req.body.productId
    //     })
    //     order = await order.save()
    //     await OrderItem.findByIdAndRemove(req.body.orderItemId);

        return res.status(200).send("Your purchase was successful!!");

    // }
//     const productIds = orderItem.map(item => item.productId)//gets all the product id's from the object
  
// //console.log(productIds.length);
// //console.log(productIds)
//     let product = await Product.find({productId:productIds[0]})
//     const totalCost = product.map(item=>item.price)
// console.log(totalCost)
// console.log(new Date())
// console.log(req.body)

// // const order = await Order.insertMany([
// await Order.insertMany([
//     {totalAmount:1},
//     {orderItemId:req.body.orderItemId},
//     {userAddressId:req.body.userAddressId},{orderDate:new Date()},{bought:true}])
// //await Order.insertMany({productId:productIds.toString()})

// orderItem = await OrderItem.deleteOne({orderItemId:req.params.id})
// if(!orderItem) return res.status(404).send("Order Item not found.")            


//         return res.status(200).send("You Bought the Item successfully!!")
  });
  
module.exports = router
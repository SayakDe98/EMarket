const {Product} = require('../models/product')

module.exports = async function createProduct(name , price , color ,numberInStock , category)
{
    try{
        const existingProduct = await Product.findOne({name:name})
            if(existingProduct) throw new Error(`A product with the same name ${name} already exists.`)

        const product = new Product({
            name,
            price,
            color,
            numberInStock,
            category
        })    
        return await product.save()
    }

    catch(err)
    {
        throw err
    }
}
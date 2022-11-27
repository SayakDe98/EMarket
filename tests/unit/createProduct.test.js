const createProduct = require('../../controller/createProduct')
const {Product} = require('../../models/product')
const db = require('../db')

beforeAll(async()=>await db.connect())

afterEach(async()=>await db.clearDatabase())

afterAll(async()=>await db.closeDatabase())

describe('POST product' , ()=>
{
    it('Check if Product details are correct after creating a product' , async done =>{
            try{
    
                const  product  = await createProduct("Boat Rockerz 255" , 2500 , 'Blue' , 30 , 'Headphones')
                console.log(product); 
                expect(product.name).toContain('Boat Rockerz 255')
                expect(product.price).toEqual(2500)
                expect(product.color).toContain('Blue')
                expect(product.numberInStock).toEqual(30)
                expect(product.type).toContain('Headphone')
                done();
            }
            catch(e)
            {
                console.log(e.message);
            }
    })

})
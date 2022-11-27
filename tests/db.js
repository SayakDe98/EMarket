const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')




//connect to db 
module.exports.connect=
async () => {
    const mongod = new MongoMemoryServer();
    await mongod.start();
    const mongoUri = mongod.getUri();
    
    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })}
//disconnect and close connection
module.exports.closeDatabase = async()=>
{
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongod.stop()
}

//clear the db , remove all data
module.exports.clearDatabase = async()=>
{
    const collections = mongoose.connection.collections
    for(const key in collections)
    {
        const collection = collections[key]
        await collection.deleteMany()
    }
}
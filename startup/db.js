const mongoose = require('mongoose');
const winston = require('winston')

module.exports = function()
{
    const db = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@vidly.hvqtm.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    mongoose.connect(db)
            .then(() => winston.info(`Connected to Database!`))
}
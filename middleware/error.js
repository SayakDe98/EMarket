const winston = require('winston')

module.exports = function(err,req,res,next)
{
    winston.error(err.message,err)
    //login level are as follows:
    //error
    //warn
    //info
    //verbose
    //debug
    //silly
    res.status(500).send("Something failed.")
}
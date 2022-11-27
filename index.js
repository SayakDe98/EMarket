const express = require('express');
const cors = require('cors');
const app = express()
require('./startup/routes')(app)
require('./startup/db')()
require('./startup/validation')
const cookieParser = require('cookie-parser');
app.use(cors({origin:'*'}));
app.use(cookieParser());
app.use(function(err,req,res,next)
{
  res.status(500).send("Something failed.")
})


const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = server
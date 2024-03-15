require('dotenv').config();
const express = require('express')
const morgan = require('morgan');
const helmet = require("helmet");
const compression = require('compression');
const app   = express()
//console.log('process::',process.env)
// init middlewares
app.use(morgan('dev'));
app.use(helmet());
app.use(compression())
// init db
require('./dbs/init.mongodb')
const { checkOverload } = require('./helpers/check.connect')
//checkOverload()
// init routes
app.get('/' , (req , res , next) => {
    const strCompress = 'hello cuongpt';
    return res.status(200).json({
        message : 'welcome to cuongphan',
        compress : strCompress.repeat(10000)
    })
})


// handling error

module.exports = app
const express = require('express')
const morgan = require('morgan');
const helmet = require("helmet");
const compression = require('compression');
const app   = express()
// init middlewares
app.use(morgan('dev'));
app.use(helmet());
app.use(compression())

// init db


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
'use strict'
const express = require('express');
const router = express.Router();
const {apiKey , permission} = require('../auth/checkAuth')
// check apiKey
router.use(apiKey)

// check permission
router.use(permission('0000'))
router.use('/v1/api/product',require('./product'))
router.use('/v1/api',require('./access'))

// router.get('' , (req , res , next) => {
//     const strCompress = 'hello cuongpt';
//     return res.status(200).json({
//         message : 'welcome to cuongphan'
//     })
// })


module.exports = router
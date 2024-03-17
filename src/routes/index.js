'use strict'
const express = require('express');
const router = express.Router();
require('body-parser')
router.use(express.urlencoded({ extended: true }))
router.use(express.json({ extended: true }))
router.use('/v1/api',require('./access'))

// router.get('' , (req , res , next) => {
//     const strCompress = 'hello cuongpt';
//     return res.status(200).json({
//         message : 'welcome to cuongphan'
//     })
// })


module.exports = router
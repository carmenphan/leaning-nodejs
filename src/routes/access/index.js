'use strict'
const express = require('express');
require('body-parser')
const accessController = require('../../controllers/access.controller');
const router = express.Router();
router.post('/shop/signup' , accessController.signUp)
module.exports = router
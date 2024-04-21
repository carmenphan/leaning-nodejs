'use strict'
const express = require('express');
const productController = require('../../controllers/product.controller');
const { asyncHandler } = require('../../auth/checkAuth');
const router = express.Router();
router.post('/product' , asyncHandler(productController.createProduct))

module.exports = router
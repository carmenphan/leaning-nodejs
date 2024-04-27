'use strict'
const express = require('express');
const productController = require('../../controllers/product.controller');
const { asyncHandler } = require('../../auth/checkAuth');
const router = express.Router();
router.get('/search/:keySearch' , asyncHandler(productController.getListSearchProduct))
router.get('' , asyncHandler(productController.findAllProducts));
router.get('/:product_id' , asyncHandler(productController.findProduct));
router.post('' , asyncHandler(productController.createProduct))
router.post('publish/:product_id' , asyncHandler(productController.publishProductByShop))
router.post('unpublish/:product_id' , asyncHandler(productController.unPublishProductByShop))
router.post('/product' , asyncHandler(productController.createProduct))
router.get('/drafts' , asyncHandler(productController.getAllDraftsForShop))
router.get('/published/all' , asyncHandler(productController.getAllPublishedForShop))
router.patch('/:product_id' , asyncHandler(productController.updateProduct))

module.exports = router
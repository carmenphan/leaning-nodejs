'use strict'
const ProductService = require('../services/product.service');
const {OK , CREATED , SuccessResponse} = require('../core/success.response');
class ProductController {
    createProduct = async (req , res , next) => {
        new CREATED({
            message : 'Product created',
            metadata : await ProductService.createProduct(req.body.product_type , {
                ...req.body,
                product_shop : req.userId
            })
        }).send(res)
    }
    /**
     * @desc get all drafts for a shop
     * @param {NUMBER} limit
     * @param {NUMBER} skip
     *
     */
    getAllDraftsForShop = async (req , res , next) => {
        new OK({
            message : 'Drafts fetched',
            metadata : await ProductService.findAllDraftsForShop({
                product_shop : req.user.userId
            })
        }).send(res)
    }
    getAllPublishedForShop = async (req , res , next) => {
        new OK({
            message : 'Published products fetched',
            metadata : await ProductService.findAllPublishForShop({
                product_shop : req.user.userId
            })
        }).send(res)
    }
    publishProductByShop = async (req , res , next) => {
        new SuccessResponse({
            message : 'Product published',
            metadata : await ProductService.publishProductByShop({
                product_shop : req.user.userId,
                product_id : req.params.product_id
            })
        }).send(res)
    }
    unPublishProductByShop = async (req , res , next) => {
        new SuccessResponse({
            message : 'Product unpublished',
            metadata : await ProductService.unPublishProductByShop({
                product_shop : req.user.userId,
                product_id : req.params.product_id
            })
        }).send(res)
    }
    getListSearchProduct = async (req , res , next) => {
        new OK({
            message : 'Search result',
            metadata : await ProductService.searchProducts(req.params)
        }).send(res)
    }
    findAllProducts = async (req , res , next) => {
        new OK({
            message : 'Products fetched',
            metadata : await ProductService.findAllProducts(req.params)
        }).send
    }
    findProduct = async (req , res , next) => {
        new OK({
            message : 'Product fetched',
            metadata : await ProductService.findProduct({
                product_id : req.params.product_id
            })
        }).send(res
    }
}
modudle.exports = new ProductController();

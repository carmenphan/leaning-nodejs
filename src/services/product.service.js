'use strict'
const {product , clothing , electronics, furniture} = require('../models/product.model');
const {BadRequestError} = require('../core/error.response');
const {
    findAllDraftsForShop ,
    publishProductByShop ,
    findAllPublishForShop,
    unPublishProductByShop,
    searchProductByUser,
    findAllProducts,
    findProduct
} = require('../models/repositories/product.repo');
const {removeUndefinedObject} = require('../utils/index');
const {insertInventory} = require('../models/repositories/inventory.repo');

class ProductFactory {
   // static async createProduct(type , payload){
   //     switch (type){
   //         case 'Clothing':
   //             return await new Clothing(payload).createProduct();
   //         case 'Electronics':
   //             return await new Electronics(payload).createProduct();
   //         default:
   //             throw new BadRequestError('Invalid product type');
   //     }
   // }
    static productRegistry = {}
    static registerProduct(type, classRef) {
        this.productRegistry[type] = classRef;
    }
    static async createProduct(type, payload) {
        const productClass = ProductFactory.productRegistry[type];
        if (!productClass) throw new BadRequestError('Invalid product type');
        return await new productClass(payload).createProduct();
    }

    static async findAllDraftsForShop({product_shop , limit = 50 , skip = 0}) {
        const query = {
            product_shop,
            isDraft : true
        }
        return await findAllDraftsForShop({query , limit , skip});
    }
    static async publishProductByShop({product_shop , product_id}) {
        return await publishProductByShop({product_shop, product_id});
    }
    static async unPublishProductByShop({product_shop , product_id}) {
        return await unPublishProductByShop({product_shop, product_id});
    }
    static async findAllPublishForShop({product_shop , limit = 50 , skip = 0}) {
        const query = {
            product_shop,
            isPublished : true
        }
        return await findAllPublishForShop({query , limit , skip});
    }
    static async searchProducts({keySearch}) {
        return await searchProductByUser({keySearch});
    }
    static async findAllProducts({limit = 50 , sort = 'ctime' , page = 1 , filter = {isPublished: true}}) {
          return await findAllProducts({
            limit, sort, page, filter, select: [
                'product_name', 'product_price', 'product_thumb'
            ]
        })
    }
    static async findProduct({product_id}) {
        return await findProduct({product_id , unSelect  : ['__v']});

    }
    static async updateProduct(type , product_id , payload){
        const productClass = ProductFactory.productRegistry[type];
        if (!productClass) throw new BadRequestError('Invalid product type');
        return new productClass(payload).updateProduct(product_id);
    }
}
class Product {
    constructor(product_name,
                product_thumb,
                product_price,
                product_description,
                product_quantity,
                product_type,
                product_shop,
                product_attributes
    ) {
        this.product_name = product_name;
        this.product_thumb = product_thumb;
        this.product_price = product_price;
        this.product_description = product_description;
        this.product_quantity = product_quantity;
        this.product_type = product_type;
        this.product_shop = product_shop;
        this.product_attributes = product_attributes;
    }
    async createProduct(product_id) {
        const newProduct = await product.create({...this , _id: product_id});
        if (newProduct){
            await insertInventory({
                product_id,
                shopId: this.product_shop,
                stock: this.product_quantity
            });
        }
        return newProduct;
    }
    async updateProduct(product_id , bodyUpdate) {
        return await updateProductById(product_id , bodyUpdate);
    }
}
class Clothing extends Product {
    async createProduct() {
        const newClothing = await clothing.create({
            ...this.product_attributes,
            product_shop: this.product_shop
        });
        if (!newClothing) throw new BadRequestError('Error creating clothing');
        const newProduct = await super.createProduct(newClothing._id);
        if (!newProduct) throw new BadRequestError('Error creating product');
        return newProduct;
    }
    async updateProduct(product_id) {
        const objectParams = removeUndefinedObject(this)
        if (objectParams.product_attributes){
            await updateProductById({
                product_id ,
                bodyUpdate : updateNestedObjectParser(objectParams.product_attributes),
                model : clothing
            });
        }
        const updateProduct = await super.updateProduct(product_id , objectParams);
        return updateProduct;
    }
}

class Electronics extends Product {
    async createProduct() {
        const newElectronic = await electronics.create({...this.product_attributes,
        product_shop: this.product_shop});
        if (!newClothing) throw new BadRequestError('Error creating Electronics');
        const newProduct = await super.createProduct(newElectronic._id);
        if (!newProduct) throw new BadRequestError('Error creating product');
        return newProduct;
    }
    async updateProduct(product_id) {
        const objectParams = removeUndefinedObject(this)
        if (objectParams.product_attributes){
            await updateProductById({
                product_id ,
                bodyUpdate : updateNestedObjectParser(objectParams.product_attributes),
                model : electronics
            });
        }
        const updateProduct = await super.updateProduct(product_id , objectParams);
        return updateProduct;
    }
}
class Funiture extends Product {
    async createProduct() {
        const newFurniture = await furniture.create({
            ...this.product_attributes,
            product_shop: this.product_shop
        });
        if (!newFurniture) throw new BadRequestError('Error creating Furniture');
        const newProduct = await super.createProduct(newFurniture._id);
        if (!newProduct) throw new BadRequestError('Error creating product');
        return newProduct;
    }
    async updateProduct(product_id) {
        const objectParams = removeUndefinedObject(this)
        if (objectParams.product_attributes){
            await updateProductById({
                product_id ,
                bodyUpdate : updateNestedObjectParser(objectParams.product_attributes),
                model : furniture
            });
        }
        const updateProduct = await super.updateProduct(product_id , objectParams);
        return updateProduct;
    }
}
ProductFactory.registerProduct('Clothing', Clothing);
ProductFactory.registerProduct('Electronics', Electronics);
ProductFactory.registerProduct('Furniture', Funiture);
module.exports = ProductFactory;
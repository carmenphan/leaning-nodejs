'use strict'
const {product , clothing , electronics, furniture} = require('../models/product.model');
const {BadRequestError} = require('../core/error.response');
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
        return await product.create({...this , _id: product_id});
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
}
ProductFactory.registerProduct('Clothing', Clothing);
ProductFactory.registerProduct('Electronics', Electronics);
ProductFactory.registerProduct('Furniture', Funiture);
module.exports = ProductFactory;
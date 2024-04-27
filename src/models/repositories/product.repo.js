'use strict'
const {product , clothing , electronics ,furniture } = require('../../models/product.model');
const {Types} = require('mongoose');
const { getSelectData,
        unGetSelectData
} = require('../../utils/index')
const findAllDraftsForShop = async ({query , limit = 50 , skip = 0}) => {
    return await queryProduct({query , limit , skip});
}
const findAllPublishForShop = async ({query , limit = 50 , skip = 0}) => {
    return await queryProduct({query, limit, skip});
}
const publishProductByShop = async ({product_shop , product_id}) => {
    const foundShop = await product.findOne({
        product_shop: new Types.ObjectId(product_shop),
        _id: new Types.ObjectId(product_id)
    })
    if(!foundShop) return null;
    foundShop.isDraft = false;
    foundShop.isPublished = true;
    const {modifiedCount} = await foundShop.update(foundShop);
    return modifiedCount;
}
const unPublishProductByShop = async ({product_shop , product_id}) => {
    const foundShop = await product.findOne({
        product_shop: new Types.ObjectId(product_shop),
        _id: new Types.ObjectId(product_id)
    })
    if(!foundShop) return null;
    foundShop.isDraft = true;
    foundShop.isPublished = false;
    const {modifiedCount} = await foundShop.update(foundShop);
    return modifiedCount;
}
const queryProduct = async ({query , limit = 50 , skip = 0}) => {
    return await product.find({...query}).
    populate('product_shop' , 'shop_name shop_email -_id')
        .sort({updatedAt : -1})
        .skip(skip)
        .limit(limit)
        .lean()
        .exec();
}

const searchProductByUser = async ({keySearch}) => {
    const regexSeaerch = new RegExp(keySearch);
    return await product.find({
        isPublished: true,
        $text : {
            $search : regexSeaerch
        }
    } , {score : {$meta : 'textScore'}})
        .sort({score : {$meta : 'textScore'}})
        .lean().exec();

}
const findAllProducts = async ({limit , sort , page, filter , select }) => {
 const skip = (page - 1) * limit;
 const sortBy = sort === 'ctime' ? {_id : -1} : {_id : 1};
 const products = await product.find( filter )
     .sort(sortBy)
     .skip(skip)
     .limit(limit)
     .select(getSelectData(select))
     .lean()
     .exec();
 return products;
}
const findProduct = async ({product_id ,unSelect}) => {
    return  await product.findOne({
        _id : new Types.ObjectId(product_id)
    }).select(unGetSelectData(unSelect))
        .lean()
        .exec();

}
module.exports = {
    findAllDraftsForShop,
    publishProductByShop,
    findAllPublishForShop,
    unPublishProductByShop,
    searchProductByUser,
    findAllProducts,
    findProduct
}
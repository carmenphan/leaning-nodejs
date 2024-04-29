'use strict'
const {inventory} = require('../../models/inventory.model')
const {Types, models} = require('mongoose')
const insertInventory = async ({
    product_id , shopId , stock , location = 'unKnow'
}) =>{
    return await inventory.create({
        inven_productId : Types.ObjectId(product_id),
        inven_location : location,
        inven_stock : stock,
        inven_shopId : Types.ObjectId(shopId)
    })
}
module.exports = {
    insertInventory
}
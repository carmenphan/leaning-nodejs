'use strict'
const {Schema , model ,Types} = require('mongoose'); // Erase if already required
const DOCUMENT_NAME = 'Inventory';
const COLLECTION_NAME = 'Inventories';
// Declare the Schema of the Mongo model
var InventorySchema = new Schema({
    inven_productId : {type : Types.ObjectId , required : true , ref : 'Product'},
    inven_location : {type : String  , default : 'unKnow'},
    inven_stock : {type : Number , required : true},
    inven_shopId : {type : Types.ObjectId , required : true , ref : 'Shop'},
    inven_reservations : {type  : Array , default : []}


}, {
    collection : COLLECTION_NAME,
    timestamps : true
});

//Export the model
module.exports = model(DOCUMENT_NAME, InventorySchema);
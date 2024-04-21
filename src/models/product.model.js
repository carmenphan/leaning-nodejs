'use strict'
const {Schema , model} = require('mongoose'); // Erase if already required
const DOCUMENT_NAME = 'Product';
const COLLECTION_NAME = 'Products';

const productSchema = new Schema ({
    product_namme : {type : String , required : true},
    product_thumb : {type : String , required : true},
    product_price : {type : Number , required : true},
    product_description : {type : String , required : false},
    product_quantity : {type : Number , required : true},
    product_type : {type : String , required : true , enum : ['Electronics' , 'Clothing' , 'furniture']},
    product_shop : {type : Schema.Types.ObjectId , required : true , ref : 'Shop'},
    product_attributes : {type : Schema.Types.Mixed , required : true},
}, {
    collection : COLLECTION_NAME,
    timestamps : true
});

// define clothing schema
const clothingSchema = new Schema({
    size : {type : String , required : true , enum : ['S' , 'M' , 'L' , 'XL' , 'XXL']},
    brand : {type : String , required : true},
    material : {type : String , required : true},
    product_shop : {type : Schema.Types.ObjectId , required : true , ref : 'Shop'}
} , {
    collection : "clothes",
    timestamps : true
});
const electronicsSchema = new Schema({
    brand : {type : String , required : true},
    size : {type : String , required : true},
    weight : {type : Number , required : true},
    product_shop : {type : Schema.Types.ObjectId , required : true , ref : 'Shop'}
} , {
    collection : "electronics",
    timestamps : true
});
const funitureSchema = new Schema({
    brand : {type : String , required : true},
    size : {type : String , required : true},
    material : {type : String , required : true},
    product_shop : {type : Schema.Types.ObjectId , required : true , ref : 'Shop'}
} , {
    collection : "furniture",
    timestamps : true
});
module.exports = {
    product : model(DOCUMENT_NAME , productSchema),
    clothing : model('Clothing' , clothingSchema),
    electronics : model('Electronics' , electronicsSchema),
    furniture : model('Furniture' , funitureSchema)
}
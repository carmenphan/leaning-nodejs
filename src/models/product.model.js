'use strict'
const {Schema , model} = require('mongoose'); // Erase if already required
const slugify = require('slugify');
const DOCUMENT_NAME = 'Product';
const COLLECTION_NAME = 'Products';

const productSchema = new Schema ({
    product_namme : {type : String , required : true},
    product_thumb : {type : String , required : true},
    product_price : {type : Number , required : true},
    product_description : {type : String , required : false},
    product_slug : {type : String , required : true},
    product_quantity : {type : Number , required : true},
    product_type : {type : String , required : true , enum : ['Electronics' , 'Clothing' , 'furniture']},
    product_shop : {type : Schema.Types.ObjectId , required : true , ref : 'Shop'},
    product_attributes : {type : Schema.Types.Mixed , required : true},
    product_ratingsAverage : {
        type : Number ,
        default : 4.5,
        min : [1 , 'Rating must be above 1.0'],
        max : [5 , 'Rating must be below 5.0'],
        set : (val) => Math.round(val * 10) / 10
    },
    product_variations : {
        type : Array,
        default : []
    },
    isDraft : {
        type : Boolean,
        default : true,
        index: true,
        select : false
    },
    isPublished : {
        type : Boolean,
        default : false,
        index: true,
        select : false
    }
}, {
    collection : COLLECTION_NAME,
    timestamps : true
});
productSchema.index({product_name : 'text' , product_description : 'text'});
productSchema.pre('save' , function(next){
    this.product_slug = slugify(this.product_name , {lower : true});
    next();
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
'use strict'

const mongoose = require('mongoose'); // Erase if already required
const DOCUMENT_NAME = 'shop';
const COLLECTION_NAME = 'shops';
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['active' , 'inactive'],
        default: 'inactive'
    },
    verify:{
        type: mongoose.Schema.Types.Boolean,
        default:false
    },
    roles:{
        type: Array,
        default:[]
    }

}, {
    collection : COLLECTION_NAME,
    timestamps : true
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, userSchema);
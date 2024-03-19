'use strict'

const apiKeyModel = require("../models/apiKey.model")
const crypto = require('crypto');
const findById = async (key) => {
    // create new key
    // const newKey = await apiKeyModel.create({
    //     key : crypto.randomBytes(64).toString('hex'),
    //     permissions : ['0000']
    // })
    // console.log(newKey);
    const objectKey = await apiKeyModel.findOne({key , status :true}).lean()
    return objectKey
}
module.exports = {
    findById
}
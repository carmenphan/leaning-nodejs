'use strict'
const _ = require('lodash')
const getInfoData =({fields = [] , object = {} }) => {
    return _.pick(object, fields)
}
// ['a','b','c'] => {a:1,b:1,c:1}
const getSelectData = (select = []) => {
    return Object.fromEntries(select.map(item => [item, 1]));
}
const unGetSelectData = (select = []) => {
    return Object.fromEntries(select.map(item => [item, 0]));
}
const removeUndefinedObject = obj => {
    Object.keys(obj).forEach(k => {
        if (obj[k] === null) delete obj[k];
    })
    return obj;
}
const updateNestedObjectParser = obj => {
    const final = {};
    Object.keys(obj).forEach(k => {
        if (typeof obj[k] === 'object' && !Array.isArray(obj[k])){
            const response = updateNestedObjectParser(obj[k]);
            Object.keys(response).forEach(a => {
                final[`${k}.${a}`] = response[a];
            })
        } else {
            final[k] = obj[k];
        }
    })
    return final;
}
module.exports = {
    getInfoData,
    getSelectData,
    unGetSelectData,
    removeUndefinedObject,
    updateNestedObjectParser
}
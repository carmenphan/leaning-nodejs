'user strict'
const mongoose = require('mongoose');
const _SECONDS = 5000
const os = require('os')
const process = require("process");
const countConnect = () => {
    const numberConnection = mongoose.connections.length
    console.log(`count connection ${numberConnection}`);
}
// check over load

const checkOverload = () => {
    setInterval(()=> {
        const numConnect = mongoose.connections.length
        const numberCores = os.cpus().length
        const memoryUsage = process.memoryUsage().rss
        console.log( `Active Connections ${numConnect}`);
        console.log(`Memory usage :: ${memoryUsage / 1024 /1024} MB`);
        // MAX CONNECTION
        const maxConnections = numberCores * 5 ;
        if (numConnect > maxConnections) {
            console.log('connection overload detected');
        }
        } ,_SECONDS)
}
module.exports = {
    countConnect,
    checkOverload
};
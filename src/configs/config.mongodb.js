'use strict'

// const config = {
//     app : {
//         port : 3000
//     },
//     db : {
//         host : 'localhost',
//         port : 27017,
//         name : 'db'
//     }
// }
const dev = {
    app : {
        port :process.env.PORT
    },
    db : {
        host : process.env.DEV_DB_HOST || 'localhost',
        port :  process.env.DEV_DB_PORT || 27017,
        name : process.env.DEV_DB_NAME || 'shopDEV'
    }
}
const pro = {
    app : {
        port : process.env.PORT
    },
    db : {
        host : process.env.PRD_DB_HOST || 'localhost',
        port : process.env.PRD_DB_PORT || 27017,
        name : process.env.PRD_DB_NAME || 'shopPRO'
    }
}
const  config = {dev , pro}
const env = process.env.NODE_ENV || 'dev'
module.exports = config[env]
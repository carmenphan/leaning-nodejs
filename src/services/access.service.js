'use strict'

const shopModel = require("../models/shop.model");
const bcrypt =  require('bcrypt')
const crypto = require("crypto");
const KeyTokenService = require('./keyToken.service');
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils");
const RoleShop = {
    SHOP : 'shop',
    WRITER : 'WRITER',
    EDITOR : 'EDITOR',
    ADMIN : 'ADMIN'
}
class AccessService {
    static signUp = async ({name, email , password }) => {
        try{
            // step1 check edmail exist 


            const hodelShop = await shopModel.findOne({email}).lean();
            if (hodelShop){
                return {
                    code : 'xxxx',
                    message : 'shop already register'
                }
            }
            // step2 hashPass
            const passwordHash = await bcrypt.hash(password , 10);
            // step 3 create shop
            const newShop = await shopModel.create({
                name , email , password : passwordHash , roles : [RoleShop.SHOP] 
            })
            // step4 render refesh token
            if (newShop){
                // created privateKey , publicKey
                const {privateKey , publicKey} = crypto.generateKeyPairSync('rsa',{
                    modulusLength : 4096,
                    publicKeyEncoding : {
                        type : 'pkcs1',
                        format : 'pem'
                    },
                    privateKeyEncoding : {
                        type : 'pkcs1',
                        format : 'pem'
                    }
                })
                console.log({privateKey , publicKey});
                const publicKeyString = await KeyTokenService.createKeyToken({userId : newShop._id ,publicKey : publicKey })
                if (!publicKeyString){
                    return {
                        code : 'xxxx',
                        message : 'publicKeyString error'
                    }
                }
                console.log(`public key string :: ` , publicKeyString)
                const publicKeyObject = crypto.createPublicKey(publicKeyString)
                console.log(`public key object :: `,publicKeyObject )
                // create token pair
                const tokens = await createTokenPair({userId : newShop._id , email} , publicKeyObject , privateKey);
                console.log(tokens)
                return {
                    code : '201',
                    meteData  : {
                        shop : getInfoData({fields : ['_id' ,'name' , 'email'] , object : newShop}), 
                        tokens : tokens
                    }
                }
            }
            return {
                code : '200',
                meteData  :null
            }

        }catch (error) {
            return {
                code : 'xxx',
                message : error.message,
                status : 'error'
            }
        }
    }
}
module.exports = AccessService
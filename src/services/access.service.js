'use strict'

const shopModel = require("../models/shop.model");
const bcrypt =  require('bcrypt')
const crypto = require("crypto");
const KeyTokenService = require('./keyToken.service');
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils");
const { findByEmail } = require('../services/shop.service');
const { BadRequestError, AuthFailureError } = require('../core/error.response');
const RoleShop = {
    SHOP : 'shop',
    WRITER : 'WRITER',
    EDITOR : 'EDITOR',
    ADMIN : 'ADMIN'
}

class AccessService {


    /*
     * 1- check email in dbs
     * 2 - match password 
     * 3 - create Accesstoken , Refesh token 
     * 4 - gennerate tokens
     * 5 - get data return login 
     */
    login = async ({email , password , resfeshToken = null}) => {
        // 1 - check email in db 
        const foundShop = await findByEmail({email});
        if (!foundShop) throw new BadRequestError('Shop Not registered ');
        // 2 - match password
        const match = bcrypt.compare(password , foundShop.password );
        if ( !match ) throw new AuthFailureError('Authentication error');
        // 3 - generate token 
        const privateKey = crypto.randomBytes(64).toString('hex');
        const publicKey = crypto.randomBytes(64).toString('hex'); 
        
        // 4 - generate token
        const tokens = await createTokenPair({userId : newShop._id , email} , publicKey , privateKey);
        await KeyTokenService.createKeyToken({
            refreshToken : tokens.resfeshToken,
            privateKey , publicKey
        })
        return {
            shop : getInfoData({fields : ['_id' ,'name' , 'email'] , object : foundShop}), 
            tokens : tokens
        }
    }
    
    static signUp = async ({name, email , password }) => {
        try{
            // step1 check edmail exist 


            const hodelShop = await shopModel.findOne({email}).lean();
            if (hodelShop){
               throw new BadRequestError('Error : Shop already Register')
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
                // const {privateKey , publicKey} = crypto.generateKeyPairSync('rsa',{
                //     modulusLength : 4096,
                //     publicKeyEncoding : {
                //         type : 'pkcs1',
                //         format : 'pem'
                //     },
                //     privateKeyEncoding : {
                //         type : 'pkcs1',
                //         format : 'pem'
                //     }
                // })
                const privateKey = crypto.randomBytes(64).toString('hex');
                const publicKey = crypto.randomBytes(64).toString('hex');
                console.log({privateKey , publicKey});
                const keyStore = await KeyTokenService.createKeyToken({
                    userId : newShop._id ,
                    publicKey : publicKey , 
                    privateKey : privateKey
                 })
                if (!keyStore){
                    throw new BadRequestError('publicKeyString error')
                }
               // console.log(`public key string :: ` , publicKeyString)
               // const publicKeyObject = crypto.createPublicKey(publicKeyString)
               // console.log(`public key object :: `,publicKeyObject )
                // create token pair
                const tokens = await createTokenPair({userId : newShop._id , email} , publicKey , privateKey);
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
            throw new BadRequestError(error.message)
        }
    }
}
module.exports = AccessService
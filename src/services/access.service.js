'use strict'

const shopModel = require("../models/shop.model");
const bcrypt =  require('bcrypt')
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
                    modulusLength : 4096
                })
                console.log({privateKey , publicKey});
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
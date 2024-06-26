'use strict'
const keyTokenModel = require("../models/keytoken.model")
class KeyTokenService {
    static createKeyToken = async ({userId , publicKey , privateKey , refreshToken}) => {
        try {
            // level 0 
            //const publicKeyString = publicKey.toString();
            // const tokens = await keyTokenModel.create({
            //     user : userId , publicKey : publicKey , privateKey : privateKey
            // })
            // return tokens ? tokens.publicKey : null

            //level xxx
            const filter = {user : userId} , update = {
                publicKey,privateKey, refreshTokenUsed  : [] , refreshToken 
            }, options = {upsert : true , new :true};

            const tokens = await  keyTokenModel.findOneAndUpdate(filter , update , options);
            return tokens ? token.publicKey : null;
        }catch (error) {
            return error;
        }
    }
}
module.exports = KeyTokenService
'user strict'
const StatusCode =  {
    OK : 200,
    CREATED : 201,
    ACCEPTED : 202,
    NO_CONTENT : 204,
    BAD_REQUEST : 400,
    UNAUTHORIZED : 401,
    FORBIDDEN : 403,
    NOT_FOUND : 404,
    METHOD_NOT_ALLOWED : 405,
    CONFLICT : 409,
    INTERNAL_SERVER_ERROR : 500
}
const ReseasonStatus = {
    OK : 'OK',
    CREATED : 'CREATED',
    ACCEPTED : 'ACCEPTED',
    NO_CONTENT : 'NO_CONTENT',
    BAD_REQUEST : 'BAD_REQUEST',
    UNAUTHORIZED : 'UNAUTHORIZED',
    FORBIDDEN : 'FORBIDDEN',
    NOT_FOUND : 'NOT_FOUND',
    METHOD_NOT_ALLOWED : 'METHOD_NOT_ALLOWED',
    CONFLICT : 'CONFLICT',
    INTERNAL_SERVER_ERROR : 'INTERNAL_SERVER_ERROR'
}

class SuccessResponse1 {
    constructor ({message ,statusCode = 200 , metaData = {}}){
        this.metaData = metaData;
        this.message = !message ? ReseasonStatus[statusCode] : message;
        this.status = statusCode;
    }
    send(res , headers = {}){
        return res.status(this.status).json(this)
    }
}
class OK extends SuccessResponse1 {
    constructor({message , metaData}){
        super({message , statusCode : StatusCode.OK , metaData})
    }
}
class Created extends SuccessResponse1 {
    constructor({options = {} ,message , metaData}){
        super({message , statusCode : StatusCode.CREATED , metaData})
        this.options = options;
    }
}

module.exports = {
    OK,
    Created
}
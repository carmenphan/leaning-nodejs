'use strict'


const StatusCode = {
    OK : 200,
    CREATED : 201
}
const ReasonStatus = {
    CREATED : 'Created',
    OK : 'Success'
}


class SuccessResponse {
    constructor ({message , statusCode = StatusCode.OK, reasonStatusCode = ReasonStatus.OK , metadata = {}}){
        this.message = !message ? reasonStatusCode : message
        this.status = statusCode
        this.metadata = metadata
    }
    send(res , headers = {}){
        return res.status(this.status).json(this)
    }
}

class OK extends SuccessResponse {
    constructor ({message , metadata}){
        super({message , metadata})
    }
}

class CREATED extends SuccessResponse {
    constructor ({message ,statusCode = StatusCode.CREATED, reasonStatusCode = ReasonStatus.CREATED , metadata , options = {}}){
        super({message ,statusCode , reasonStatusCode  ,metadata})
        this.options = options
    }
}
module.exports = {
    SuccessResponse,
    OK,
    CREATED
}
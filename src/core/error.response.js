'use strict'

const StatusCode = {
    FORBIDDEN : 403,
    CONFLICT : 409,
    UNAUTHORIZED : 401,
    NO_CONTENT : 204,
    BAD_REQUEST : 400,
    NOT_FOUND : 404,
    METHOD_NOT_ALLOWED : 405,
    INTERNAL_SERVER_ERROR : 500
}
const ReasonStatus = {
    FORBIDDEN : 'Bad Request Error',
    CONFLICT : 'Conflict Error',
    NO_CONTENT : 'NO_CONTENT',
    BAD_REQUEST : 'BAD_REQUEST',
    UNAUTHORIZED : 'UNAUTHORIZED',
    NOT_FOUND : 'NOT_FOUND',
    METHOD_NOT_ALLOWED : 'METHOD_NOT_ALLOWED',
    INTERNAL_SERVER_ERROR : 'INTERNAL_SERVER_ERROR'

}
class ErrorResponse extends Error {
    constructor(message , status) {
        super(message)
        this.status = status 
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor (message = ReasonStatus.CONFLICT , statusCode = StatusCode.CONFLICT){
        super(message,statusCode)
    }
}

class BadRequestError extends ErrorResponse {
    constructor (message = ReasonStatus.FORBIDDEN , statusCode = StatusCode.FORBIDDEN){
        super(message,statusCode)
    }
}
class AuthFailureError extends ErrorResponse {
    constructor (message = ReasonStatus.FORBIDDEN , statusCode = StatusCode.FORBIDDEN){
        super(message,statusCode)
    }
}

module.exports = {
    ConflictRequestError,
    BadRequestError,
    AuthFailureError
}
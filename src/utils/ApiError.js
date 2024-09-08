// Making a class Apierror
// TO handle Api errors specific
// In (super) we are overwriting require erros

class ApiError extends Error{
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""        
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false;
        this.errors = errors

        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this, this.constuctor)
        }
    }
}

export {ApiError}
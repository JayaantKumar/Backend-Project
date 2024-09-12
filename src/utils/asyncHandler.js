// Same code as promises.

const asyncHandler = (requesthandler) => {
    return (req, res, next) => {
        Promise.resolve(requesthandler(req, res, next)).
        catch((err) => next(err))
    }
}






export {asyncHandler}




//This function is used as try catch method.

// Higher order function
/* const asyncHandler = () => {}
const asyncHandler = (fn) => () => {}
const asyncHandler = (fn) =>  async () => {} */
/* const asyncHandler = (fn) =>  async (req, res, next) => {
    try {
        await fn(req, res, next)
    } catch (error) {
        res.status(err.code || 500).json({
            success: false,
            message: err.message
        })
    }
} */
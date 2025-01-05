import { ApiResponse } from "./ApiResponse.js"


const asyncHandler = (reqestHandler) => {
    return  (req, res, next) => {
        Promise.resolve(reqestHandler(req, res, next))
        .catch((err) => { 
            console.log(err.message)
            return res.status(err.statusCode).json(new ApiResponse(err.statusCode,null,err.message))})          
        }
    }

    export {asyncHandler}
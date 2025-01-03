import { User } from "../models/user.model.js";
import { ApiError } from "../utiles/ApiErrors.js";
import { asyncHandler } from "../utiles/asyncHandler.js";
import jwt from "jsonwebtoken"

export const verifyJWT = asyncHandler(async(req, _, next) => {

try {
        const token = await req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if(!token){
            throw new ApiError(401, "unauthorized request!!")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if(!user){
            throw new ApiError(401, "invalid accesstoken!")
        }
    
        req.user = user
        next()
} catch (error) {
    throw new ApiError(401, error?.message || "unauthorized request!!", )
    
}
})

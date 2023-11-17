import { User } from "../models/userModel.js";
import errorHandler from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";



export const isAuthenticated = async (req, res, next)=>{
    const {token} = req.cookies;
    
    
    if(!token){
        return next(new errorHandler("Please login",401));
    }
    
    const decodedData = jwt.verify(token,process.env.JWT_SECRET);
    
    // console.log(token);
    req.user = await User.findById(decodedData.id);

    next();
}

export const authorizeRoles = (...role)=>{
    return (req,res,next) => {
        if(!role.includes(req.user.role)){
            return next(new errorHandler("Access Denied", 403));
        }

        next();
    }
}
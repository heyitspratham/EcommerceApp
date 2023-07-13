import errorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import {User} from "../models/userModel.js";


//Register a User
export const registerUser = catchAsyncError(async (req,res,next)=>{

    const {name, email, password} = req.body;

    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: "sample id",
            url: "sample url"
        }
    });

    res.status(201).json({
        success: true,
        user
    })
})
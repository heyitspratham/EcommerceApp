import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: [30, "name cannot exceede 30 characters"],
        required: [true, "Please enter your name"]
    },
    email: {
        type: String,
        validate: [validator.isEmail, "Please enter a valid Email"],
        required: [true, "Please enter your email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        select: false,
        minLength: [8, "the password should be atleast of 8 characters"]
    },
    avatar:{
        public_id: {
            type: String,
            required: true
        },

        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: "user"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);

})  

export const User = mongoose.model("User", userSchema)
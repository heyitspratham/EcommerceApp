import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: [30, "name cannot exceede 30 characters"],
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    validate: [validator.isEmail, "Please enter a valid Email"],
    required: [true, "Please enter your email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    select: false,
    minLength: [8, "the password should be atleast of 8 characters"],
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },

    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

//JWTToken
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//method to compare pass
userSchema.methods.comparePass = async function (pass) {
  return await bcrypt.compare(pass, this.password);
};

//generating password to reset token
userSchema.methods.getPasswordResetToken = function () {
  //Generating the token
  const randomToken = crypto.randomBytes(20).toString("hex");

  //hashing and adding to resetpasswordtoken in userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(randomToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return randomToken;
};

export const User = mongoose.model("User", userSchema);

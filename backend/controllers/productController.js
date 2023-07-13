import { Product } from "../models/productModel.js";
import mongoose from "mongoose";
import errorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import APIFeatures from "../utils/apiFeatures.js";

//create a product --> Admin
export const createProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

//GET ALL PRODUCT
export const getAllProducts = catchAsyncError(async (req, res, next) => {

  const resultPerPage = 5;
  const productCount = Product.countDocuments()

  const apiFeatures = new APIFeatures(Product, req.query).search().filter().pagination(resultPerPage);
  const product = await apiFeatures.query;

  //made a class to store product and keyword and make functions there only [So as to we can make multiple functions such as search(), filter()]

  // const product = await Product.find({"name": {$regex: req.query.keyword, $options: 'i'}})

  res.status(201).json({
    success: true,
    product,
  });
});

//update a product --> Admin
export const updateProduct = catchAsyncError(async (req, res, next) => {
  //check if id is valid or not  ---> Handeled in error.js
  // if (!mongoose.isValidObjectId(req.params.id)) {
  //   return next(new errorHandler("Invalid ID", 500))
  // }

  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new errorHandler("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true, //to return the updated entry/object as opposed to default (i.e old one)
    runValidators: true, //to run the validators while updating an entry
    useFindAndModify: false, //to use updateOne() over findOneAndUpdate() which is default and deprecated {not required in mongo 6.0}
  });

  res.status(210).json({
    success: true,
    product,
  });
});

//delete a product
export const deleteProduct = catchAsyncError(async (req, res, next) => {
  //check if id is valid or not ---> Handeled in error.js
  // if (!mongoose.isValidObjectId(req.params.id)) {
  //   return next(new errorHandler("Invalid ID", 500));
  // }

  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new errorHandler("Product not found", 404));
  }

  await product.deleteOne();

  res.status(201).json({
    success: true,
    message: "Product deleted successfully",
  });
});

//GET  A PRODUCT DETAILS
export const getProductDetails = catchAsyncError(async (req, res, next) => {
  //check if id is valid or not
  // if (!mongoose.isValidObjectId(req.params.id)) {
  //   return next(new errorHandler("Invalid ID", 500))
  // }

  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new errorHandler("Product not found", 404));
  }

  res.status(201).json({
    success: true,
    product,
  });
});

import { Product } from "../models/productModel.js";
import mongoose from "mongoose";
import errorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import APIFeatures from "../utils/apiFeatures.js";

//create a product --> Admin
export const createProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

//GET ALL PRODUCT
export const getAllProducts = catchAsyncError(async (req, res, next) => {

  // for checking error module
  // return next(new errorHandler("Streee",500));
  
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();

  const apiFeatures = new APIFeatures(Product, req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeatures.query;

  //made a class to store product and keyword and make functions there only [So as to we can make multiple functions such as search(), filter()]

  // const product = await Product.find({"name": {$regex: req.query.keyword, $options: 'i'}})

  res.status(201).json({
    success: true,
    products,
    productsCount,
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

// Create New Review or Update the review
export const createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);
  console.log(product);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});


// Get All Reviews of a product
export const getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new errorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review
export const deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new errorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
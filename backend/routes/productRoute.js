import express from "express";
import {
  createProduct,
  createProductReview,
  deleteProduct,
  deleteReview,
  getAllProducts,
  getProductDetails,
  getProductReviews,
  updateProduct,
} from "../controllers/productController.js";
import { authorizeRoles, isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

//create a product -->Admin
router.post(
  "/admin/product/new",
  isAuthenticated,
  authorizeRoles("admin"),
  createProduct
);

//get all products
router.get("/products", getAllProducts);

//update or delete a product
router
  .route("/admin/product/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteProduct)
  .get(getProductDetails);

  //review create
  router.put("/review", isAuthenticated, createProductReview);
  
  router
    .route("/reviews")
    .get(getProductReviews)
    .delete(isAuthenticated, deleteReview);


export default router;

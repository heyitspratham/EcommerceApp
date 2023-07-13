import express from 'express'
import { createProduct, deleteProduct, getAllProducts, getProductDetails, updateProduct } from '../controllers/productController.js';

const router = express.Router();


//create a product -->Admin
router.post('/product/new', createProduct)


//get all products
router.get("/products", getAllProducts)


//update or delete a product
router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getProductDetails)




export default router;
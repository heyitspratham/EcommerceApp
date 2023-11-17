import express from "express";

import { authorizeRoles, isAuthenticated } from "../middleware/auth.js";
import {
  deleteOrder,
  getAllOrders,
  getSingleOrder,
  myOrders,
  newOrder,
  updateOrder,
} from "../controllers/orderController.js";

const router = express.Router();

//create new order
router.post("/order/new", isAuthenticated, newOrder);

//get single order
router.get("/order/:id", isAuthenticated, getSingleOrder);
//get all orders
router.get("/orders/me", isAuthenticated, myOrders);

router.get(
  "/admin/orders",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllOrders
);

router
  .route("/admin/order/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteOrder);

export default router;

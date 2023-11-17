import express from "express";
import {
    deleteUser,
  forgotPassword,
  getAllUser,
  getSingleUser,
  getUserDetails,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updatePassword,
  updateProfile,
  updateUserRole,
} from "../controllers/userController.js";

import { authorizeRoles, isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

//Register a user
router.post("/register", registerUser);

//Login a user
router.post("/login", loginUser);

//forgot pass
router.post("/passsword/forgot", forgotPassword);

//reset pass
router.put("/passsword/reset/:token", resetPassword);

//Logout a user
router.get("/logout", logoutUser);

//profile
router.get("/me", isAuthenticated, getUserDetails);

router.put("/password/update", isAuthenticated, updatePassword);

router.put("/me/update", isAuthenticated, updateProfile);

//get all user admin
router.get(
  "/admin/users",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllUser
);
//get single user admin
router
  .route("/admin/user/:id")
  .get(isAuthenticated, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticated, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteUser);

export default router;

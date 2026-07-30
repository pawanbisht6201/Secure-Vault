import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  addPassword,
  getPasswords,
  updatePassword,
  deletePassword,
} from "../controllers/passwordController.js";

const router = express.Router();

// Add Password
router.post("/", authMiddleware, addPassword);

// Get Passwords
router.get("/", authMiddleware, getPasswords);

// Update Password
router.put("/:id", authMiddleware, updatePassword);

// Delete Password
router.delete("/:id", authMiddleware, deletePassword);

export default router;
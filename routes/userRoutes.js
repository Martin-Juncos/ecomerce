const express = require("express");
const {
  register,
  login,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUser,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", authMiddleware, getUsers);
router.get("/me", authMiddleware, getUser);
router.get("/:id", authMiddleware, getUserById);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

module.exports = router;

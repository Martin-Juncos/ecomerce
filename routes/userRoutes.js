const express = require("express");
const { check } = require("express-validator");
const {
  register,
  login,
  getUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const router = express.Router();

router.post(
  "/register",
  [
    check("username").not().isEmpty().withMessage("Username is required"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    check("email").isEmail().withMessage("Email is invalid"),
    check("role").isIn(["admin", "cliente"]).withMessage("Invalid role"),
  ],
  register
);

router.post(
  "/login",
  [
    check("username").not().isEmpty().withMessage("Username is required"),
    check("password").not().isEmpty().withMessage("Password is required"),
  ],
  login
);

router.get("/me", authMiddleware, getUser);
router.get("/", authMiddleware, roleMiddleware("admin"), getUsers); // Solo administradores pueden obtener todos los usuarios
router.get("/:id", authMiddleware, getUserById);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

module.exports = router;

const express = require("express");
const {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, createOrder); // Crear una nueva orden
router.get("/", authMiddleware, getUserOrders); // Obtener todas las órdenes del usuario autenticado
router.get("/:id", authMiddleware, getOrderById); // Obtener una orden por ID
router.put("/:id", authMiddleware, updateOrderStatus); // Actualizar el estado de una orden
router.delete("/:id", authMiddleware, deleteOrder); // Eliminar una orden

module.exports = router;

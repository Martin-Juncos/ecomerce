const express = require("express");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const errorMiddleware = require("./middleware/errorMiddleware"); // Importar middleware de manejo de errores

const app = express();
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.use(errorMiddleware); // Usar middleware de manejo de errores

module.exports = app;

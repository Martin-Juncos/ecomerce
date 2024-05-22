const Product = require("../models/product");

// Crear un nuevo producto
const createProduct = async (req, res) => {
  try {
    const { name, price, category } = req.body;
    const product = await Product.create({ name, price, category });
    res.status(201).json(product);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating product", error: err.message });
  }
};

// Obtener todos los productos
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll(); // Sequelize: Product.findAll()
    res.status(200).json(products);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: err.message });
  }
};

// Obtener un producto por ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id); // Sequelize: Product.findByPk()
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching product", error: err.message });
  }
};

// Actualizar un producto
const updateProduct = async (req, res) => {
  try {
    const { name, price, category } = req.body;
    const product = await Product.findByPk(req.params.id); // Sequelize: Product.findByPk()
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    product.name = name;
    product.price = price;
    product.category = category;
    await product.save();
    res.status(200).json(product);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating product", error: err.message });
  }
};

// Eliminar un producto
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id); // Sequelize: Product.findByPk()
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.destroy();
    res.status(204).json();
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: err.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};

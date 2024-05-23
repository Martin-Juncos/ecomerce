const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password, email, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
      email,
      role,
    });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
};

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: err.message });
  }
};

// Obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    if (!users.length) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: err.message });
  }
};

// Obtener un usuario por ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: err.message });
  }
};

// Actualizar un usuario
const updateUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Verificar que el usuario autenticado es el mismo que el usuario objetivo
    if (user.id !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this user" });
    }
    user.username = username;
    user.email = email;
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating user", error: err.message });
  }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Verificar que el usuario autenticado es el mismo que el usuario objetivo
    if (user.id !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this user" });
    }
    await user.destroy();
    res.status(204).json();
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: err.message });
  }
};

module.exports = {
  register,
  login,
  getUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};

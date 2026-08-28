const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
router.get("/", (req, res) => {
  User.getAll((err, results) => {
    if (err) {
      console.error("Error fetching users:", err.message);
      return res.status(500).json({
        message: "Failed to fetch users"
      });
    }

    res.json(results);
  });
});
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT id, name, email, role, created_at
    FROM users
    WHERE id = ?
  `;

  User.create(sql, [id], (err, results) => {
    if (err) {
      console.error("Error fetching user:", err.message);
      return res.status(500).json({
        message: "Failed to fetch user"
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json(results[0]);
  });
});
router.post("/", (req, res) => {
  const { name, email, password, role } = req.body;

  const sql = `
    INSERT INTO users (name, email, password, role)
    VALUES (?, ?, ?, ?)
  `;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const values = [
    name,
    email,
    hashedPassword,
    role || "patient"
  ];

  User.create(sql, values, (err, result) => {
    if (err) {
      console.error("Error creating user:", err.message);
      return res.status(500).json({
        message: "Failed to create user"
      });
    }

    res.status(201).json({
      message: "User created successfully",
      userId: result.insertId
    });
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = `
    SELECT id, name, email, password, role
    FROM users
    WHERE email = ?
  `;

  User.create(sql, [email], (err, results) => {
    if (err) {
      console.error("Login error:", err.message);
      return res.status(500).json({
        message: "Login failed"
      });
    }

    if (results.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const user = results[0];

    const isPasswordValid = bcrypt.compareSync(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  });
});

router.put("/:id", (req, res) => {
  const { name, email, role } = req.body;
  const { id } = req.params;

  const sql = `
    UPDATE users
    SET name = ?, email = ?, role = ?
    WHERE id = ?
  `;

  User.create(sql, [name, email, role, id], (err, result) => {
    if (err) {
      console.error("Error updating user:", err.message);
      return res.status(500).json({
        message: "Failed to update user"
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json({
      message: "User updated successfully"
    });
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM users WHERE id = ?";

  User.create(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting user:", err.message);
      return res.status(500).json({
        message: "Failed to delete user"
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json({
      message: "User deleted successfully"
    });
  });
});
module.exports = router;
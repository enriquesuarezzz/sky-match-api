import { Router } from "express";
import pool from "../db.mjs";
import { body, validationResult } from "express-validator";

const router = Router();

// register an airline
router.post(
  //validate data
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("email").isEmail().withMessage("Email is invalid"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("rental_role")
      .isIn(["Lessor", "Lessee", "Both"])
      .withMessage("Invalid rental role"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, country, email, password, rental_role } = req.body;

    try {
      // Check if the email already exists
      const [existingUsers] = await pool.query(
        "SELECT * FROM Airlines WHERE email = ?",
        [email]
      );
      if (existingUsers.length > 0) {
        return res
          .status(409)
          .json({ message: "Ya exiiste una cuenta con este email" });
      }

      // Insert the new airline into the ddbb
      await pool.query(
        "INSERT INTO Airlines (name, country, email, password, rental_role) VALUES (?, ?, ?, ?, ?)",
        [name, country, email, password, rental_role]
      );

      res.status(201).json({ message: "Usuario registrado correctamente" });
    } catch (error) {
      console.error("Error en la base de datos:", error.message || error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;

import { Router } from "express";
import pool from "../db.mjs";
import jwt from "jsonwebtoken";

const router = Router();

// log in with email and password
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  // get the airline with the given email
  try {
    const [rows] = await pool.query("SELECT * FROM Airlines WHERE email = ?", [
      email,
    ]);

    if (rows.length > 0) {
      const user = rows[0];
      // if the passwork provided matches the passsword in the database login successful
      if (user.password === password) {
        const token = jwt.sign({ airlineId: user.id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        return res.status(200).json({ message: "Login successful", token });
      }
    }
    // anything else return an error
    res.status(401).json({ message: "Invalid email or password" });
  } catch (error) {
    console.error("Database error:", error.message || error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;

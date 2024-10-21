import { Router } from "express";
import pool from "../db.mjs";

const router = Router();

// Get all rentals
router.get("/", async (req, res) => {
  try {
    const [rentals] = await pool.query("SELECT * FROM rentals");
    res.json(rentals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

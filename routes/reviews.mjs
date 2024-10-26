import { Router } from "express";
import pool from "../db.mjs";

const router = Router();

// Get all reviews
router.get("/", async (req, res) => {
  try {
    const [reviews] = await pool.query("SELECT * FROM Reviews");
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

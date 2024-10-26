import { Router } from "express";
import pool from "../db.mjs";

const router = Router();

// Get all airlines
router.get("/", async (req, res) => {
  try {
    const [airlines] = await pool.query("SELECT * FROM Airlines");
    res.json(airlines);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

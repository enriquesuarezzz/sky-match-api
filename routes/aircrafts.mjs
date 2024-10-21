import { Router } from "express";
import pool from "../db.mjs";

const router = Router();

// Get all aircrafts
router.get("/", async (req, res) => {
  try {
    const [aircrafts] = await pool.query("SELECT * FROM aircraft");
    res.json(aircrafts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

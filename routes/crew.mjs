import { Router } from "express";
import pool from "../db.mjs";

const router = Router();

// Get all crew
router.get("/", async (req, res) => {
  try {
    const [crew] = await pool.query("SELECT * FROM Crew");
    res.json(crew);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

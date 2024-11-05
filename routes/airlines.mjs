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

// Get airline by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [airline] = await pool.query(`SELECT * from Airlines WHERE id = ?`, [
      id,
    ]);
    res.json(airline);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update airline by id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, country, email, rental_role } = req.body;

  try {
    const [result] = await pool.query(
      `UPDATE Airlines SET name = ?, country = ?, email = ?, rental_role = ? WHERE id = ?`,
      [name, country, email, rental_role, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Airline not found" });
    }

    res.json({ message: "Airline updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

import { Router } from "express";
import pool from "../db.mjs";

const router = Router();

// get all aircrafts
router.get("/", async (req, res) => {
  try {
    const [aircrafts] = await pool.query("SELECT * FROM Aircraft");
    res.json(aircrafts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get aircraft by airline ID
router.get("/:airline_id", async (req, res) => {
  const { airline_id } = req.params;
  try {
    const [aircrafts] = await pool.query(
      "SELECT * FROM Aircraft WHERE airline_id = ?",
      [airline_id]
    );
    res.json(aircrafts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// delete aircraft by aircraft ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("DELETE FROM Aircraft WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "No se ha encontrado el avión" });
    }

    res.json({ message: "Avión eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

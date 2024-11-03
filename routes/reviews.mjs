import { Router } from "express";
import pool from "../db.mjs";

const router = Router();

// Get all reviews
router.get("/", async (req, res) => {
  try {
    const [reviews] = await pool.query(
      "SELECT r.id AS review_id, r.rating, r.review_text, a_reviewer.name AS reviewer_name, ac.type AS aircraft_name FROM Reviews r JOIN Airlines a_reviewer ON r.airline_id = a_reviewer.id JOIN Rentals ren ON r.rental_id = ren.id JOIN Aircraft ac ON ren.aircraft_id = ac.id;"
    );
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

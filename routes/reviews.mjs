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

// add a new review
router.post("/", async (req, res) => {
  const { airline_id, rental_id, rating, review_text } = req.body;

  // validate fields
  if (!airline_id || !rental_id || !rating) {
    return res
      .status(400)
      .json({ message: "Airline ID, Rental ID, and rating are required." });
  }

  try {
    // insert new review into the ddbb
    const [result] = await pool.query(
      "INSERT INTO Reviews (airline_id, rental_id, rating, review_text) VALUES (?, ?, ?, ?)",
      [airline_id, rental_id, rating, review_text || null]
    );

    res.status(201).json({
      message: "Reseña creada correctamente",
      review_id: result.insertId,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

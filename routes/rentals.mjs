import { Router } from "express";
import pool from "../db.mjs";

const router = Router();

// Get all rentals
router.get("/", async (req, res) => {
  try {
    const [rentals] = await pool.query("SELECT * FROM Rentals");
    res.json(rentals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Create a rental
router.post("/", async (req, res) => {
  const {
    aircraft_id,
    airline_requesting_id,
    rental_date,
    rental_duration_hours,
  } = req.body;

  try {
    //get the aircraft's price per hour
    const [aircraftRows] = await pool.query(
      "SELECT price_per_hour FROM Aircraft WHERE id = ?",
      [aircraft_id]
    );

    if (aircraftRows.length === 0) {
      return res.status(404).json({ message: "Aircraft not found" });
    }
    //calculate the rental cost depending on the aircraft selected
    const price_per_hour = aircraftRows[0].price_per_hour;
    const rental_cost = rental_duration_hours * price_per_hour;

    //insert rental in the ddbb
    const [result] = await pool.query(
      `INSERT INTO Rentals 
        (aircraft_id, airline_requesting_id, rental_date, rental_duration_hours, rental_cost)
      VALUES (?, ?, ?, ?, ?)`,
      [
        aircraft_id,
        airline_requesting_id,
        rental_date,
        rental_duration_hours,
        rental_cost,
      ]
    );

    res.status(201).json({
      message: "Rental created successfully",
      rental_id: result.insertId,
      rental_cost,
    });
  } catch (error) {
    console.error("Error creating rental:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;

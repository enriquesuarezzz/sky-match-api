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

// Get user rentals
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rentals] = await pool.query(
      `SELECT 
        Rentals.id AS rental_id,
        Rentals.aircraft_id,
        Rentals.rental_date,
        Rentals.rental_duration_hours,
        Rentals.rental_cost,
        Rentals.route,
        Aircraft.type AS aircraft_type,
        Airlines.name AS airline_name
      FROM Rentals
      JOIN Aircraft ON Rentals.aircraft_id = Aircraft.id
      JOIN Airlines ON Aircraft.airline_id = Airlines.id
      WHERE Rentals.airline_requesting_id =  ?`,
      [id]
    );
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
    route,
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
        (aircraft_id, airline_requesting_id, rental_date, rental_duration_hours, rental_cost, route)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        aircraft_id,
        airline_requesting_id,
        rental_date,
        rental_duration_hours,
        rental_cost,
        route,
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

// Delete a rental
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10); // Ensure id is a number

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid rental ID" });
  }

  try {
    const [result] = await pool.query("DELETE FROM Rentals WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Rental not found" });
    }

    res.status(200).json({ message: "Rental deleted successfully" });
  } catch (err) {
    console.error("Error deleting rental:", err); // Log the error for debugging
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;

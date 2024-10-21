import express from "express"; // express framework
import cors from "cors"; // Cross-Origin Resource Sharing
import "dotenv/config"; // Load environment variables from .env file

//import routes
import aircraftsRoutes from "./routes/aircrafts.mjs";
import airlinesRoutes from "./routes/airlines.mjs";
import crewRoutes from "./routes/crew.mjs";
import rentalsRoutes from "./routes/rentals.mjs";
import reviewsRoutes from "./routes/reviews.mjs";

const app = express();

app.use(express.json());
app.use(cors());
app.disable("x-powered-by");

// mount routes
app.use("/api/aircrafts", aircraftsRoutes);
app.use("/api/airlines", airlinesRoutes);
app.use("/api/crew", crewRoutes);
app.use("/api/rentals", rentalsRoutes);
app.use("/api/reviews", reviewsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

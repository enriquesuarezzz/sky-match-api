import express from "express";
import cors from "cors";
import "dotenv/config"; // Load environment variables from .env file

const app = express();

app.use(express.json());
app.use(cors());
app.disable("x-powered-by");

app.get("/", (req, res) => {
  res.send("Hello, Node.js!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

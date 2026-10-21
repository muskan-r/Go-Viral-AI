import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import analyzeRoutes from "./routes/analyzeRoutes.js";

console.log(process.env.OPENAI_API_KEY);

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/v1/analyze", analyzeRoutes);


// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Go Viral AI Backend Running 🚀",
  });
});


// PORT
const PORT = process.env.PORT || 5000;


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
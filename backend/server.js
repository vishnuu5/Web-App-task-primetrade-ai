import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/tasks.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "https://web-app-task-primetrade-ai.vercel.app",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "API is running" });
});

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { errorHandler, routeNotFound } from "./middleware/errorMiddleware.js";
import routes from "./routes/index.js";
import dbConnection from "./utils/connectDB.js";

dotenv.config();

dbConnection();

const port = process.env.PORT || 5000;

const app = express();

// ⭐ FIX CORS — REMOVE trailing slash in frontend URL
app.use(
  cors({
    origin: [
      "https://task-mangement-frontend-ov4t.vercel.app",
      "http://localhost:3000",
      "http://localhost:3001"
    ],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ⭐ ADD THIS DEFAULT ROUTE (Required for Vercel)
app.get("/", (req, res) => {
  res.json({ message: "Backend running successfully 🚀" });
});

// Routes
app.use("/api", routes);

// Error Handling
app.use(routeNotFound);
app.use(errorHandler);

// ⭐ IMPORTANT: For Vercel serverless — EXPORT app instead of listening
app.listen(port, () => console.log(`Server listening on ${port}`));

export default app;       // ⬅ REQUIRED FOR VERCEL

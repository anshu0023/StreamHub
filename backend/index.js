// Load environment variables FIRST
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import express from "express";
import databaseConnection from "./utils/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Connect to DB
databaseConnection();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// CORS setup (React frontend port ko allow kar raha hai)
const corsOptions = {
  origin: "http://localhost:3000", // React dev server ka URL, production me isko frontend URL se replace karna
  credentials: true,
};
app.use(cors(corsOptions));

// API routes
app.use("/api/v1/user", userRoute);

// Serve React frontend static files
app.use(express.static(path.join(__dirname, "netflix/build")));

// Catch-all route for React Router (client-side routing support)
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "netflix", "build", "index.html"));
});

// Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});

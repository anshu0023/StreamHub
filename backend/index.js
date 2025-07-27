// Load environment variables FIRST
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import express from "express";
import databaseConnection from "./utils/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import cors from "cors";

// Now it's safe to connect to DB
databaseConnection();

const app = express();

// Middlewares 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
};
app.use(cors(corsOptions));

// Routes
app.use("/api/v1/user", userRoute);

// Server
app.listen(process.env.PORT, () => {
    console.log(`Server listen at port ${process.env.PORT}`);
});

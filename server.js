import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import internshipRoutes from "./routes/internshipRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;

// ==============================
// MIDDLEWARE
// ==============================

app.use(cors());
app.use(express.json());

// ==============================
// BASIC TEST ROUTES
// ==============================

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "PM Internship Assistant Backend is running"
    });
});

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        status: "OK",
        database:
            mongoose.connection.readyState === 1
                ? "connected"
                : "disconnected"
    });
});

app.get("/api/students/test", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Student API is working"
    });
});

// ==============================
// API ROUTES
// ==============================

app.use("/api/internships", internshipRoutes);
app.use("/api/students", studentRoutes);

// ==============================
// 404
// ==============================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Cannot GET " + req.originalUrl
    });
});

// ==============================
// START SERVER
// ==============================

async function startServer() {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is missing");
        }

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        app.listen(PORT, "0.0.0.0", () => {
            console.log("=================================");
            console.log("PM INTERNSHIP BACKEND STARTED");
            console.log("PORT:", PORT);
            console.log("=================================");
        });

    } catch (error) {
        console.error("SERVER START ERROR:", error);
        process.exit(1);
    }
}

startServer();

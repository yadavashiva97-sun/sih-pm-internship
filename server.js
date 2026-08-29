import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import internshipRoutes from "./routes/internshipRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;

app.use(cors());
app.use(express.json());

// ===============================
// TEST ROUTES - BEFORE EVERYTHING
// ===============================

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "HEALTH ROUTE IS WORKING",
        database: mongoose.connection.readyState === 1
            ? "connected"
            : "disconnected"
    });
});

app.get("/api/students/test", (req, res) => {
    res.status(200).json({
        success: true,
        message: "STUDENT TEST ROUTE IS WORKING"
    });
});

// ===============================
// OTHER ROUTES
// ===============================

app.use("/api/internships", internshipRoutes);
app.use("/api/students", studentRoutes);

// ===============================
// HOME
// ===============================

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "PM Internship Assistant Backend is running"
    });
});

// ===============================
// 404
// ===============================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        url: req.originalUrl
    });
});

// ===============================
// START SERVER
// ===============================

async function startServer() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        app.listen(PORT, "0.0.0.0", () => {
            console.log("=================================");
            console.log("SERVER STARTED");
            console.log("PORT:", PORT);
            console.log("HEALTH: /api/health");
            console.log("STUDENT TEST: /api/students/test");
            console.log("=================================");
        });

    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
}

startServer();
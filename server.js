import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import internshipRoutes from "./routes/internshipRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 7000;

// =====================================================
// MIDDLEWARE
// =====================================================

app.use(cors());
app.use(express.json());

// =====================================================
// ROUTES
// =====================================================

app.use("/api/internships", internshipRoutes);
app.use("/api/students", studentRoutes);

// =====================================================
// HOME
// =====================================================

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "PM Internship Assistant Backend is running",
        status: "success"
    });
});

// =====================================================
// HEALTH CHECK
// =====================================================

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        status: "OK",
        database:
            mongoose.connection.readyState === 1
                ? "connected"
                : "disconnected"
    });
});

// =====================================================
// 404
// =====================================================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API route not found"
    });
});

// =====================================================
// MONGODB + SERVER
// =====================================================

async function startServer() {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is missing");
        }

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
}

startServer();